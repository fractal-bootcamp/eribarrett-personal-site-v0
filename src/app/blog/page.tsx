import Link from "next/link";
import { api, HydrateClient } from "~/trpc/server";
import Header from "../_components/header";


//function for creating slug

//function for adding posts to the db

//function for fetching posts from the db

//function for fetching a single post from the db (search by keyword)

//function for updating a post

//function for deleting a post





export default async function BlogPage() {

    const posts = await api.post.getAll();


    return (
        <HydrateClient>
            <div className="flex flex-col min-h-screen h-full bg-red-200 text-white font-mono fixed top-0 left-0 right-0 overflow-hidden">
                <Header />


                {/* Main Content */}
                <div className="flex flex-1 justify-center min-h-0">
                    <div className="flex-1 border-r border-gray-800 relative justify-center">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post) => (
                                <article
                                    key={post.id}
                                    className="rounded-lg border border-gray-200 p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800"
                                >
                                    <time className="text-sm text-gray-500 dark:text-gray-400">
                                        {post.createdAt.toLocaleDateString()}
                                    </time>
                                    <h2 className="mt-2 text-2xl font-semibold">
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="hover:text-blue-600 dark:hover:text-blue-400"
                                        >
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <p className="mt-3 text-gray-600 dark:text-gray-300">
                                        {post.excerpt}
                                    </p>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="mt-4 inline-block font-medium text-blue-600 hover:underline dark:text-blue-400"
                                    >
                                        Read more →
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </HydrateClient >
    );
}
