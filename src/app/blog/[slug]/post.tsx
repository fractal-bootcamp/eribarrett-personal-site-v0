import { type Post } from "@prisma/client";
import { format } from "date-fns";
import { api } from "~/trpc/server";
import { HydrateClient } from "~/trpc/server";
import Link from "next/link";
import { Moon } from "lucide-react";


export default async function Post({ post }: { post: Post }) {

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
                    <div className="flex-1 border-r border-gray-800 border-t relative justify-center">



                        <div className="container mx-auto px-4 py-12 max-w-4xl">
                            <article className="prose prose-lg dark:prose-invert mx-auto">
                                <div className="mb-8 text-center">
                                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
                                        {post.title}
                                    </h1>

                                    <time dateTime={post.createdAt.toISOString()} className="text-sm text-gray-500 dark:text-gray-400">
                                        {format(post.createdAt, "MMMM d, yyyy")}
                                    </time>

                                    {post.excerpt && (
                                        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                                            {post.excerpt}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-8 prose-headings:font-semibold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-lg">
                                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                                </div>
                            </article>
                        </div>




                    </div>
                </div>
            </div>
        </HydrateClient>
    );
}