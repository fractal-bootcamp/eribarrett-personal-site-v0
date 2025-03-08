"use client"

import { ScrollArea } from "~/components/ui/scroll-area";
import Header from "../_components/header";
import DragDrop from "../_components/dragDrop";
import localFont from 'next/font/local'
import { useEffect, useState } from "react"
import Image from "next/image";

const enceladianFont = localFont({
    src: "../../../public/fonts/EnceladianGlyphs.ttf",
    display: "swap",
    variable: "--font-enceladian",
});

export default function MusicPage() {
    const [mounted, setMounted] = useState(false);

    // Only render after client-side mount
    useEffect(() => {
        setMounted(true);
    }, []);

    // Music-related draggable items
    const musicItems = [
        {
            id: 1,
            top: 50,
            left: "15%",
            width: 280,
            rotate: 0,
            height: 100,
            content: { text: "Upcoming Releases" }
        },
        {
            id: 2,
            top: 180,
            left: "40%",
            width: 320,
            rotate: 0,
            height: 120,
            content: { text: "Listen to the latest tracks" }
        },
        {
            id: 3,
            top: 320,
            left: "20%",
            width: 260,
            rotate: 0,
            height: 90,
            content: { text: "Music Archives" }
        },
        {
            id: 4,
            bottom: 150,
            right: "20%",
            width: 300,
            rotate: 0,
            height: 110,
            content: { text: "Collaborations & Features" }
        },
        {
            id: 5,
            bottom: 50,
            left: "30%",
            width: 250,
            rotate: 0,
            height: 80,
            content: { text: "Sound Design Portfolio" }
        }
    ];

    if (!mounted) {
        return (
            <div className={enceladianFont.variable}>
                <div className="flex flex-col min-h-screen h-full bg-red-200 dark:bg-gray-900 dark:bg-opacity-90 text-white font-mono fixed top-0 left-0 right-0 overflow-hidden">
                    <Header />
                    <div className="flex justify-center items-center h-full">
                        <div className="text-white text-xl">Loading...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={enceladianFont.variable}>
            <div className="flex flex-col min-h-screen h-full bg-red-200 dark:bg-gray-900 dark:bg-opacity-90 text-white font-mono fixed top-0 left-0 right-0 overflow-hidden">
                <Header />
                <div className="bg-black bg-opacity-40 dark:bg-black dark:bg-opacity-80">
                    <div className="flex justify-center min-h-0">
                        <div className="flex-1 border-r border-gray-700 dark:border-gray-600 relative justify-center">
                            <div style={{ position: "relative", zIndex: 0, overflowY: "auto", height: "100%" }} className="flex flex-col">
                                <ScrollArea className="h-full">
                                    <div className="relative h-screen w-full">



                                        {/* Full-width background video */}
                                        <div className="absolute inset-0 w-full h-full z-0">
                                            <video
                                                className="w-full object-cover"
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                            >
                                                <source src="/images/music/relena.mp4" type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>









                                        {/* Draggable music items */}
                                        {/* <DragDrop items={musicItems} className="pt-10" /> */}

                                        {/* Decorative elements */}
                                        {/* <div className="absolute bottom-10 left-10 text-3xl text-gray-600 opacity-50" style={{ fontFamily: "var(--font-enceladian)" }}>
                                            ♫ ♪ ♬
                                        </div> */}
                                    </div>
                                </ScrollArea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
