"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "~/context/ThemeContext";
import { TooltipProvider } from "~/components/ui/tooltip";

export default function Header() {
    const [isNarrow, setIsNarrow] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleResize = () => {
            setIsNarrow(window.innerWidth < 800);
        };

        // Initial check
        handleResize();

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Clean up
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <TooltipProvider>
            <header className={`${isNarrow ? 'fixed top-0 left-0 right-0 z-50' : 'flex'} items-center border-b border-gray-800 bg-red-200 transition-all duration-300 dark:bg-gray-900 dark:bg-opacity-90`}>
                <div className={`w-[70px] h-[70px] bg-[url('/images/princess.png')] flex items-center justify-center bg-cover bg-center border-r border-gray-800 hover:bg-opacity-70 transition-shadow ${isNarrow ? 'hidden' : ''}`}>
                </div>
                <Link href="/" className="flex-1 flex justify-center text-xl tracking-wider py-5 border-x-yellow-200 border-x-8 border-b-2 border-b-gray-800 bg-black bg-opacity-40 hover:bg-opacity-70 transition-shadow">
                    e r i . d e v
                </Link>
                <div className="flex flex-wrap justify-center bg-red-200 items-center gap-2 sm:gap-4 px-3 sm:px-6 border-l border-b border-gray-800 h-auto min-h-[70px]">
                    <Link
                        href="/development"
                        className="border-dashed border-2 rounded-full bg-black bg-opacity-25 border-gray-600 px-3 sm:px-5 py-1 sm:py-2 text-xs sm:text-sm hover:bg-black hover:bg-opacity-60 transition-colors"
                    >
                        DEVELOPMENT
                    </Link>
                    <Link
                        href="/cv"
                        className="border-dashed border-2 rounded-full bg-black bg-opacity-25 border-gray-600 px-3 sm:px-5 py-1 sm:py-2 text-xs sm:text-sm hover:bg-black hover:bg-opacity-60 transition-colors"
                    >
                        CV
                    </Link>
                    <Link
                        href="/blog"
                        className="border-dashed border-2 rounded-full bg-black bg-opacity-25 border-gray-600 px-3 sm:px-5 py-1 sm:py-2 text-xs sm:text-sm hover:bg-black hover:bg-opacity-60 transition-colors"
                    >
                        BLOG
                    </Link>
                    {/* <Link
                            href="/music"
                            className="border-dashed border-2 rounded-full bg-black bg-opacity-25 border-gray-600 px-3 sm:px-5 py-1 sm:py-2 text-xs sm:text-sm hover:bg-black hover:bg-opacity-60 transition-colors"
                        >
                            MUSIC
                        </Link> */}
                    {/* <Link
                            href="/visualize"
                            className="border-dashed border-2 rounded-full bg-black bg-opacity-25 border-gray-600 px-3 sm:px-5 py-1 sm:py-2 text-xs sm:text-sm hover:bg-black hover:bg-opacity-60 transition-colors"
                        >
                            VISUALIZE
                        </Link> */}

                </div>
                <div className={`w-[70px] h-[70px] border-l border-gray-800 hover:bg-black hover:bg-opacity-70 transition-shadow ${isNarrow ? 'hidden sm:block' : ''}`}>
                    <div className="w-full h-full bg-black bg-opacity-40 flex items-center justify-center border-l-4 border-l-yellow-200 border-b-black border-b-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-black hover:bg-opacity-20 transition-colors"
                            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
                        >
                            {theme === "light" ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </header>
        </TooltipProvider>
    );
}