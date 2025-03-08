import Link from "next/link";
import { api, HydrateClient } from "~/trpc/server";
import Header from "../_components/header";
import { Timeline } from "~/components/ui/timeline";


//function for creating slug

//function for adding posts to the db

//function for fetching posts from the db

//function for fetching a single post from the db (search by keyword)

//function for updating a post

//function for deleting a post



type TimelineItem = {
    date: string;
    title: string;
    description?: string;
    href: string;
}

export default async function BlogPage() {
    try {
        console.log("Fetching posts...");
        console.log("Using DATABASE_URL:", process.env.DATABASE_URL?.substring(0, 20) + "..."); // Log partial URL for debugging

        const posts = await api.post.getAll();
        console.log(`Found ${posts.length} posts`);

        // Filter to only show published posts in the public view
        const publishedPosts = posts.filter(post => post.published);

        if (publishedPosts.length === 0) {
            return (
                <div className="flex flex-col min-h-screen h-full bg-red-200 dark:bg-gray-900 dark:bg-opacity-90 text-white font-mono fixed top-0 left-0 right-0 overflow-hidden">
                    <Header />
                    <div className="flex flex-1 justify-center items-center">
                        <div className="p-8 bg-black bg-opacity-30 rounded-lg max-w-md text-center">
                            <h1 className="text-2xl font-bold mb-4">No Posts Found</h1>
                            <p>There are no published blog posts available yet.</p>
                        </div>
                    </div>
                </div>
            );
        }

        // Convert posts to timeline items with null handling
        const timelineItems: TimelineItem[] = publishedPosts.map(post => ({
            date: new Date(post.createdAt).toLocaleDateString(),
            title: post.title,
            description: post.excerpt || undefined,
            href: `/blog/${post.slug}`
        }));

        // Render only published posts using Timeline component
        return (
            <div className="flex flex-col min-h-screen h-full bg-red-200 dark:bg-gray-900 dark:bg-opacity-90 text-white font-mono fixed top-0 left-0 right-0 overflow-hidden">
                <Header />
                <div className="flex flex-1 justify-center min-h-0 overflow-y-auto py-8">
                    <div className="w-full max-w-6xl px-4">
                        <h1 className="text-3xl font-bold text-black text-opacity-70 dark:text-white mt-8 mb-12 text-center">eri's dev blog</h1>

                        <Timeline items={timelineItems} />
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching posts:", error);

        // Return an error UI
        return (
            <div className="flex flex-col min-h-screen h-full bg-red-200 dark:bg-gray-900 dark:bg-opacity-90 text-white font-mono fixed top-0 left-0 right-0 overflow-hidden">
                <Header />
                <div className="flex flex-1 justify-center items-center">
                    <div className="p-8 bg-black bg-opacity-30 rounded-lg max-w-md text-center">
                        <h1 className="text-2xl font-bold mb-4">Database Connection Error</h1>
                        <p>There was an error connecting to the database.</p>
                        <p className="mt-4 text-sm text-gray-400">
                            {String(error).substring(0, 200)}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
