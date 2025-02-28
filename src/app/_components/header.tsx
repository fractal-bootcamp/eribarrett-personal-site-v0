import { Moon } from "lucide-react";
import Link from "next/link";

export default function Header() {
    return (

        <header className="flex items-center border-b border-gray-800">
            <div className="w-[70px] h-[70px] bg-[url('/images/princess.png')] flex items-center justify-center bg-cover bg-center border-r border-gray-800 hover:bg-opacity-70 transition-shadow">

            </div>
            <Link href="/" className="flex-1 flex justify-center text-xl tracking-wider py-5  border-x-yellow-200 border-x-8 border-b-2 border-b-gray-800 bg-black bg-opacity-40 hover:bg-opacity-70 transition-shadow" >
                e r i . d e v</Link>
            <div className="flex items-center gap-4 px-6 border-l border-b border-gray-800 h-[70px]">
                <Link
                    href="/development"
                    className="border-dashed border-2 rounded-full bg-black bg-opacity-25 border-gray-600 px-5 py-2 text-sm hover:bg-black hover:bg-opacity-60 transition-colors"
                >
                    DEVELOPMENT
                </Link>
                <Link
                    href="/music"
                    className="border-dashed border-2 rounded-full  bg-black bg-opacity-25 border-gray-600 px-5 py-2 text-sm hover:bg-black hover:bg-opacity-60 transition-colors"
                >
                    MUSIC
                </Link>
                <Link
                    href="/visualize"
                    className="border-dashed border-2 rounded-full  bg-black bg-opacity-25 border-gray-600 px-5 py-2 text-sm hover:bg-black hover:bg-opacity-60 transition-colors"
                >
                    VISUALIZE
                </Link>
                <Link
                    href="/blog"
                    className="border-dashed border-2 rounded-full bg-black bg-opacity-25 border-gray-600 px-5 py-2 text-sm hover:bg-black hover:bg-opacity-60 transition-colors"
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
    );
}