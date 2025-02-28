import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import { format } from "date-fns";
import Post from "./post";
import { Suspense } from "react";

export const generateMetadata = async ({
    params,
}: {
    params: { slug: string };
}) => {
    const post = await api.post.getBySlug({ slug: params.slug });

    if (!post) {
        return {
            title: "Post Not Found",
            description: "The requested blog post could not be found",
        };
    }

    return {
        title: `${post.title} | Blog`,
        description: post.excerpt || `Read ${post.title} on our blog`,
    };
};

export default function BlogPostPage({
    params,
}: {
    params: { slug: string };
}) {
    return (
        <Suspense fallback={<LoadingPost />}>
            <BlogPostContent slug={params.slug} />
        </Suspense>
    );
}

async function BlogPostContent({ slug }: { slug: string }) {
    const post = await api.post.getBySlug({ slug });

    if (!post) {
        notFound();
    }

    return <Post post={post} />;
}

function LoadingPost() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="animate-pulse">
                <div className="mb-8 text-center">
                    <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mx-auto"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mx-auto mt-4"></div>
                </div>
                <div className="space-y-4 mt-8">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/5"></div>
                </div>
            </div>
        </div>
    );
}
