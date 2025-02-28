import Link from "next/link";
import Image from "next/image";
import { HydrateClient } from "~/trpc/server";

export const metadata = {
    title: "Projects | Eri Personal",
    description: "Showcase of my projects and work",
};

export default function ProjectsPage() {
    // You can fetch projects from your API here
    // For now, we'll use dummy data
    const projects = [
        {
            id: 1,
            title: "Personal Website",
            description: "A personal website built with Next.js, TypeScript, and Tailwind CSS.",
            image: "/images/project1.jpg", // Add your image or use a placeholder
            link: "https://github.com/yourusername/personal-website",
        },
        {
            id: 2,
            title: "E-commerce Platform",
            description: "A full-stack e-commerce platform with user authentication and payment processing.",
            image: "/images/project2.jpg", // Add your image or use a placeholder
            link: "https://github.com/yourusername/ecommerce-platform",
        },
        {
            id: 3,
            title: "Task Management App",
            description: "A productivity app for managing tasks and projects with real-time updates.",
            image: "/images/project3.jpg", // Add your image or use a placeholder
            link: "https://github.com/yourusername/task-management",
        },
    ];

    return (
        <HydrateClient>
            <main className="container mx-auto px-4 py-12">
                <h1 className="mb-8 text-4xl font-bold">Projects</h1>
                <p className="mb-10 text-lg text-gray-600 dark:text-gray-300">
                    Here are some of the projects I've worked on. Feel free to check them out!
                </p>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-all hover:shadow-md dark:border-gray-800"
                        >
                            <div className="relative h-48 w-full">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className="p-6">
                                <h2 className="mb-2 text-2xl font-semibold">{project.title}</h2>
                                <p className="mb-4 text-gray-600 dark:text-gray-300">
                                    {project.description}
                                </p>
                                <Link
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-blue-600 hover:underline dark:text-blue-400"
                                >
                                    View Project
                                    <svg
                                        className="ml-1 h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </HydrateClient>
    );
}

