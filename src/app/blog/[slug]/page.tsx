import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import Post from "./post";
import { Suspense } from "react";
import Header from "~/app/_components/header";

type Params = Promise<{ slug: string }>;

export const generateMetadata = async ({
    params,
}: {
    params: Params;
}) => {
    const post = await api.post.getBySlug({ slug: (await params).slug });

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

export default async function BlogPostPage({
    params,
}: {
    params: Params;
}) {
    const { slug } = await params;

    return (
        <Suspense fallback={<LoadingPost />}>
            <BlogPostContent slug={slug} />
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

        <div className="flex flex-col min-h-screen h-full bg-red-200 text-white font-mono fixed top-0 left-0 right-0 overflow-hidden">

            <Header />

            <div className="animate-pulse">
                <div className="flex flex-1 justify-center min-h-0 overflow-auto p-11">
                    <div className="flex-1 max-w-4xl mx-auto">
                        <div className="mb-10 text-center">
                            <div className="h-10 bg-black bg-opacity-30 dark:bg-black dark:bg-opacity-70 rounded w-3/4 mx-auto mb-8"></div>
                            <div className="h-4 bg-black bg-opacity-30 dark:bg-black dark:bg-opacity-70 rounded w-1/4 mx-auto mb-10"></div>
                            <div className="h-6 bg-black bg-opacity-30 dark:bg-black dark:bg-opacity-70 rounded w-2/3 mx-auto mt-4"></div>
                            <div className="h-6 bg-black bg-opacity-30 dark:bg-black dark:bg-opacity-70 rounded w-4/5 mx-auto mt-4"></div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-4 bg-black bg-opacity-30 dark:bg-black dark:bg-opacity-70 rounded"></div>
                            <div className="h-4 bg-black bg-opacity-30 dark:bg-black dark:bg-opacity-70 rounded"></div>
                            <div className="h-4 bg-black bg-opacity-30 dark:bg-black dark:bg-opacity-70 rounded w-5/6"></div>
                            <div className="h-4 bg-black bg-opacity-30 dark:bg-black dark:bg-opacity-70 rounded"></div>
                            <div className="h-4 bg-black bg-opacity-30 dark:bg-black dark:bg-opacity-70 rounded w-4/5"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
