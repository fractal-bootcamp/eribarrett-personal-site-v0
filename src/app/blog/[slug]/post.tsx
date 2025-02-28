import { type Post } from "@prisma/client";
import { format } from "date-fns";


export default function Post({ post }: { post: Post }) {
    return (
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
    )
}