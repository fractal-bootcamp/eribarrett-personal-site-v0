"use client";

import { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import Header from "~/app/_components/header";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminBlogPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    // Simple password protection
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === process.env.NEXT_PUBLIC_BLOG_ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            // Store in session storage so it persists during the session
            sessionStorage.setItem("blogAdminAuthenticated", "true");
        } else {
            setError("Invalid password");
        }
    };

    // Check if already authenticated
    useEffect(() => {
        if (sessionStorage.getItem("blogAdminAuthenticated") === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    // If not authenticated, show login form
    if (!isAuthenticated) {
        return (
            <div className="flex flex-col min-h-screen h-full bg-red-200 dark:bg-gray-900 dark:bg-opacity-90 text-white font-mono fixed top-0 left-0 right-0 overflow-hidden">
                <Header />
                <div className="flex flex-1 justify-center items-center">
                    <div className="w-full max-w-md p-8 bg-black bg-opacity-30 rounded-lg">
                        <h1 className="text-2xl font-bold mb-6 text-center">Blog Admin</h1>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label htmlFor="password" className="block mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 bg-gray-800 rounded text-white"
                                    required
                                />
                            </div>
                            {error && <p className="text-red-400">{error}</p>}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return <AdminBlogContent onLogout={() => setIsAuthenticated(false)} />;
}

function AdminBlogContent({ onLogout }: { onLogout: () => void }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [slug, setSlug] = useState("");
    const [published, setPublished] = useState(true);
    const router = useRouter();

    // Create post mutation
    const createPost = api.post.create.useMutation({
        onSuccess: () => {
            resetForm();
            router.refresh();
            posts.refetch();
        },
    });

    // Update post mutation
    const updatePost = api.post.update.useMutation({
        onSuccess: () => {
            resetForm();
            router.refresh();
            posts.refetch();
        },
    });

    // Delete post mutation
    const deletePost = api.post.delete.useMutation({
        onSuccess: () => {
            router.refresh();
            posts.refetch();
        },
    });

    // Toggle publish status mutation
    const togglePublish = async (id: string, currentStatus: boolean) => {
        try {
            void updatePost.mutate({
                id,
                published: !currentStatus,
            });

            // Refresh the page after toggling
            void router.refresh();
            void posts.refetch();
        } catch (error) {
            console.error("Error toggling publish status:", error);
        }
    };

    // Get all posts query
    const posts = api.post.getAll.useQuery();

    // Reset form
    const resetForm = () => {
        setTitle("");
        setContent("");
        setExcerpt("");
        setSlug("");
        setPublished(true);
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createPost.mutate({
            title,
            content,
            slug,
            excerpt,
            published,
        });
    };

    // Generate slug from title
    const generateSlug = () => {
        const slugified = title
            .toLowerCase()
            .replace(/[^\w\s]/gi, "")
            .replace(/\s+/g, "-");
        setSlug(slugified);
    };

    // Handle delete post
    const handleDeletePost = async (id: string) => {
        if (confirm("Are you sure you want to delete this post?")) {
            try {
                void deletePost.mutate({ id });

                // Refresh the page after deletion
                void router.refresh();
                void posts.refetch();
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen h-full bg-red-200 dark:bg-gray-900 dark:bg-opacity-90 text-white font-mono fixed top-0 left-0 right-0 overflow-hidden">
            <Header />
            <div className="flex flex-1 justify-center min-h-0 overflow-auto p-6">
                <div className="w-full max-w-4xl">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold">Blog Admin</h1>
                        <button
                            onClick={() => {
                                sessionStorage.removeItem("blogAdminAuthenticated");
                                onLogout();
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
                        >
                            Logout
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="mb-12 bg-black bg-opacity-30 p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Create New Post</h2>

                        <div className="mb-4">
                            <label className="block mb-2">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onBlur={generateSlug}
                                className="w-full p-2 bg-gray-800 rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Slug</label>
                            <div className="flex">
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    className="flex-1 p-2 bg-gray-800 rounded-l"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={generateSlug}
                                    className="bg-gray-700 hover:bg-gray-600 px-3 rounded-r"
                                >
                                    Generate
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Excerpt (optional)</label>
                            <textarea
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                className="w-full p-2 bg-gray-800 rounded h-20"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Content (HTML)</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full p-2 bg-gray-800 rounded h-40 font-mono text-sm"
                                required
                            />
                        </div>

                        <div className="mb-4 flex items-center">
                            <input
                                type="checkbox"
                                id="published"
                                checked={published}
                                onChange={(e) => setPublished(e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="published">Publish immediately</label>
                        </div>

                        <button
                            type="submit"
                            disabled={createPost.isPending}
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
                        >
                            {createPost.isPending ? "Creating..." : "Create Post"}
                        </button>
                    </form>

                    <div>
                        <h2 className="text-xl font-bold mb-4">Manage Posts</h2>
                        {posts.isLoading ? (
                            <p>Loading posts...</p>
                        ) : posts.data?.length ? (
                            <div className="space-y-4">
                                {posts.data.map((post) => (
                                    <div key={post.id} className="bg-black bg-opacity-30 p-4 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-bold">{post.title}</h3>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => togglePublish(post.id, post.published)}
                                                    className={`px-2 py-1 rounded text-xs ${post.published
                                                        ? "bg-green-600 hover:bg-green-700"
                                                        : "bg-gray-600 hover:bg-gray-700"
                                                        }`}
                                                >
                                                    {post.published ? "Published" : "Draft"}
                                                </button>
                                                <button
                                                    onClick={() => handleDeletePost(post.id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No posts yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}