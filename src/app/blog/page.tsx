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
    description: string | null | undefined;
    href: string;
}

export default async function BlogPage() {
    const posts = await api.post.getAll();

    // Convert posts to timeline items
    const timelineItems = posts.map((post) => ({
        date: post.createdAt.toLocaleDateString(),
        title: post.title,
        description: post.excerpt || undefined,
        href: `/blog/${post.slug}`,
    }));

    return (
        <HydrateClient>
            <div className="flex flex-col min-h-screen h-full bg-red-200 dark:bg-gray-900 dark:bg-opacity-90 text-white font-mono fixed top-0 left-0 right-0 overflow-hidden">
                <Header />

                {/* Main Content */}
                <div className="flex flex-1 justify-center min-h-0 overflow-y-auto py-8">
                    <div className="w-full max-w-6xl px-4">
                        <h1 className="text-3xl font-bold mb-8 text-center">Blog Posts</h1>

                        <Timeline
                            items={timelineItems}
                            initialCount={5}
                            showMoreText="Show More Posts"
                            showLessText="Show Fewer Posts"
                            titleClassName="text-white hover:text-blue-300 dark:text-white dark:hover:text-blue-200"
                            descriptionClassName="text-gray-300 dark:text-gray-200"
                            dateClassName="text-gray-400 dark:text-gray-300"
                            lineClassName="border-gray-700 dark:border-gray-500"
                            dotClassName="bg-blue-600/80 group-hover:bg-blue-500 dark:bg-blue-500/80 dark:group-hover:bg-blue-400"
                            buttonVariant="outline"
                            className="pb-16"
                        />
                    </div>
                </div>
            </div>
        </HydrateClient>
    );
}
