import { type Post } from "@prisma/client";
import Header from "~/app/_components/header";

export default function Post({ post }: { post: Post }) {
    return (
        <div className="flex flex-col min-h-screen h-full bg-red-200 dark:bg-gray-900 dark:bg-opacity-90 text-white font-mono fixed top-0 left-0 right-0 overflow-hidden">
            <Header />
            <div className="flex flex-1 justify-center min-h-0 overflow-auto p-11">
                <div className="flex-1 max-w-4xl mx-auto">
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                        <time className="text-sm text-gray-400 dark:text-gray-300">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </time>
                    </div>
                    <div className="prose prose-invert dark:prose-invert max-w-none">
                        <div className="mb-8 text-center">
                            {post.excerpt && (
                                <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                                    {post.excerpt}
                                </p>
                            )}
                        </div>

                        <div className="mt-8 prose-headings:font-semibold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-lg">
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}