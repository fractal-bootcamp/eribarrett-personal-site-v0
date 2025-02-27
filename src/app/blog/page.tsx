import Link from "next/link";
import { api, HydrateClient } from "~/trpc/server";

export const metadata = {
    title: "Blog | Eri Personal",
    description: "musings...",
};


//function for creating slug

//function for adding posts to the db

//function for fetching posts from the db

//function for fetching a single post from the db (search by keyword)



export default async function BlogPage() {
    // You can fetch blog posts from your API here
    // For now, we'll use dummy data
    const posts = [
        {
            id: 1,
            title: "Getting Started with Next.js",
            excerpt: "Learn how to build modern web applications with Next.js",
            date: "2023-05-15",
            slug: "getting-started-with-nextjs",
        },
        {
            id: 2,
            title: "Why I Love TypeScript",
            excerpt: "The benefits of using TypeScript in your projects",
            date: "2023-06-22",
            slug: "why-i-love-typescript",
        },
        {
            id: 3,
            title: "Building UI Components with Shadcn",
            excerpt: "A guide to creating reusable UI components with Shadcn",
            date: "2023-07-10",
            slug: "building-ui-components-with-shadcn",
        },
    ];

    return (
        <HydrateClient>
            <main className="container mx-auto px-4 py-12">
                <h1 className="mb-8 text-4xl font-bold">Blog</h1>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="rounded-lg border border-gray-200 p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800"
                        >
                            <time className="text-sm text-gray-500 dark:text-gray-400">
                                {post.date}
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
            </main>
        </HydrateClient>
    );
}
