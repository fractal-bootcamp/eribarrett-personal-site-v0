import Link from "next/link";
import { Moon } from "lucide-react";
import { api, HydrateClient } from "~/trpc/server";


//function for creating slug

//function for adding posts to the db

//function for fetching posts from the db

//function for fetching a single post from the db (search by keyword)






export default async function BlogPage() {

    const posts = await api.post.getAll();


    return (
        <HydrateClient>

            <div className="flex flex-col h-screen bg-red-200 text-white font-mono">
                {/* Header */}
                <header className="flex items-center border-b border-gray-800">
                    <div className="w-[70px] h-[70px] bg-[url('/images/princess.png')] flex items-center justify-center bg-cover bg-center border-r border-gray-800 hover:bg-opacity-70 transition-shadow">

                    </div>
                    <Link href="/" className="flex-1 flex justify-center text-xl tracking-wider py-5  border-x-yellow-200 border-x-8 border-b-2 border-b-gray-800 bg-black bg-opacity-40 hover:bg-opacity-70 transition-shadow" >
                        e r i . d e v</Link>
                    <div className="flex items-center gap-4 px-6 border-l border-b border-gray-800 h-[70px]">
                        <Link
                            href="#"
                            className="border border-dashed rounded-full border-gray-500 px-5 py-2 text-sm hover:bg-gray-900 transition-colors"
                        >
                            DEVELOPMENT
                        </Link>
                        <Link
                            href="#"
                            className="border border-dashed rounded-full border-gray-500 px-5 py-2 text-sm hover:bg-gray-900 transition-colors"
                        >
                            MUSIC
                        </Link>
                        <Link
                            href="#"
                            className="border border-dashed rounded-full border-gray-500 px-5 py-2 text-sm hover:bg-gray-900 transition-colors"
                        >
                            VISUALIZE
                        </Link>
                        <Link
                            href="/blog"
                            className="border border-dashed rounded-full border-gray-500 px-5 py-2 text-sm hover:bg-gray-900 transition-colors"
                        >
                            BLOG
                        </Link>
                    </div>
                    <div className="w-[70px] h-[70px] flex items-center justify-center border-l border-gray-800  hover:bg-black hover:bg-opacity-70 transition-shadow">
                        <div className="w-full h-full bg-black bg-opacity-40 flex items-center justify-center border-l-4 border-l-yellow-200 border-b-black border-b-2">
                            <Moon className="w-5 h-5" />
                        </div>

                    </div>
                </header>

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
        </HydrateClient>
    );
}