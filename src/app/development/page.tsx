import Header from "../_components/header";

type Project = {
    id: number;
    title: string;
    awards: string[];
    description: string;
    image: string;
    stack: string[];
    link: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: "SoundMoji",
        awards: ["First Prize @Fractal Tech NYC's Generative UI/UX Hackathon, February 2025"],
        description: "web application that allows users to create custom sounds with input from an emoji keyboard processed and generated by AI",
        image: "images/dev/soundmoji.png",
        stack: ["TypeScript", "Next.js", "Tailwind CSS", "TRPC", "DrizzleORM", "Shadcn UI", "OpenAI", "Fal.ai"],
        link: "https://genux-hackathon.vercel.app/"
    },
    {
        id: 2,
        title: "twitter community-archive chatbot",
        awards: [],
        description: "recreates a twitter user from the community-archive and allows users to hold a conversation with them. the user only responds in tweets",
        image: "images/dev/chatbot.png",
        stack: ["TypeScript", "Next.js", "Vercel AI SDK", "community-archive", "Prisma"],
        link: "https://github.com/fractal-tech-nyc/eribarrett-twitter-archive-chatbot"
    },
    {
        id: 3,
        title: "Game of Set",
        awards: [],
        description: "a Family Game of Visual Perception, with online playability",
        image: "images/dev/gameofset.png",
        stack: ["TypeScript", "React Router", "Tailwind CSS", "Express", "Socket.io"],
        link: "https://github.com/fractal-tech-nyc/eribarrett-game-of-set",
    },
    {
        id: 4,
        title: "dream-journal.py",
        awards: [],
        description: "a python script that uses a Markov Chain to generate a dream journal from a .txt file of a dream",
        image: "images/dev/dreamjournal.png",
        stack: ["Python", "Google API", "Twilio API"],
        link: "https://github.com/erosika/dream_journal"
    }
]
export default function DevPage() {
    return (
        <div className="flex flex-col min-h-screen h-full bg-red-200 text-white font-mono fixed top-0 left-0 right-0 overflow-hidden">
            <Header />
            <div className="flex flex-1 justify-center min-h-0 overflow-auto">
                <div className="flex-1 flex-col border-r border-gray-800 relative justify-center">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6 w-full">
                        {projects.map((project) => (
                            <div key={project.id} className="flex flex-col rounded-lg p-4 bg-black bg-opacity-5 relative border border-white border-opacity-75 shadow-lg">
                                <div className="relative">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-48 object-cover rounded-lg opacity-85 shadow-sm backdrop-blur-sm"
                                    />
                                </div>
                                {/* <div className="flex flex-col relative bg-black bg-opacity-10 rounded-sm p-5 mt-5 h-full shadow-inner"> */}
                                <h2 className="mt-2 text-2xl font-semibold text-left">{project.title}</h2>
                                {project.awards.length > 0 && (
                                    <div className="mt-2 text-sm flex-center text-yellow-300 bg-black bg-opacity-15 rounded-lg px-4 italic">
                                        {project.awards.map((award, index) => (
                                            <div key={index}>{award}</div>
                                        ))}
                                    </div>
                                )}
                                <p className="mt-3 text-gray-800">{project.description}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {project.stack.map((tech, index) => (
                                        <span key={index} className="text-xs bg-gray-800 px-2 py-1 rounded-full shadow-md">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-auto pt-4">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block font-medium text-blue-400 hover:underline bg-black bg-opacity-40 rounded-lg px-2 py-1 shadow-md"
                                    >
                                        View Project →
                                    </a>
                                </div>
                                {project.awards.some((award) => award.includes("Prize")) && (
                                    <div className="absolute bottom-4 right-4">
                                        <div className="bg-yellow-400 text-3xl outline-dotted outline-gray-800 outline-2 rounded-full w-14 h-14 flex items-center justify-center hover:bg-yellow-400 transition-colors shadow-lg">
                                            🏆
                                        </div>
                                    </div>
                                )}
                                {/* </div> */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}



