"use client"

import Image from "next/image"
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import Header from "./_components/header";
import { Marquee } from "~/components/magicui/marquee";
import localFont from 'next/font/local'
import { useEffect, useState } from "react"
import Glyphs from "./_components/animationGlyphs";
// import { TweetCard } from "~/components/ui/tweet-card";


export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Pre-generate static sidebar characters (no animation)
  const sidebarChars = ".:+*#@%=-_?!$&";
  const sidebarData = Array(1000).fill(0).map(() =>
    Array(400).fill(0).map(() =>
      sidebarChars[Math.floor(Math.random() * sidebarChars.length)]
    ).join("")
  );

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen h-full bg-red-200 dark:bg-gray-900 dark:bg-opacity-90 text-white font-mono fixed top-0 left-0 right-0 overflow-hidden">
        <Header />
        <div className="flex justify-center min-h-0">
          <div className="flex-1 border-r border-gray-800 relative justify-center">
            <div style={{ position: "relative", zIndex: 0, overflowY: "auto", height: "100%" }} className="flex flex-col">
              <ScrollArea className="h-full">
                <div className="flex justify-center items-center h-full">

                  {/* Loading state */}
                  <div className="text-white text-xl">Loading...</div>


                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Right Sidebar */}
          {!isMobile && (
            <div className="w-[400px] border-l border-gray-800 overflow-hidden flex flex-col fixed right-0 top-0 bottom-0 z-10 min-w-[200px] max-w-[300px]">
              <div className="justify-center bg-black bg-opacity-40 dark:bg-black dark:bg-opacity-80 top-0 right-0 border-b-2 border-yellow-200 w-full px-4 py-2 text-gray-600">
                <span>+</span>
              </div>
              <div className="flex-1 overflow-y-auto relative text-[10px] leading-[10px] text-gray-500 pl-2 pt-1 font-mono bg-cover bg-center bg-no-repeat">
                {/* Loading state */}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Tweet Card */}
        <div className="absolute bottom-8 left-0 right-0 p-4 text-sm">
          <div className="flex flex-col gap-4">
            <div className="text-pink-400 mb-2">
              <span>&gt; about</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-col">
                <a href="https://erosika.digital" className="text-gray-500 text-xs underline">
                  https://erosika.digital
                </a>
              </div>
              <div className="text-gray-700 px-4 sm:px-10 py-1 bg-yellow-200 bg-opacity-60 transition-shadow rounded-full sm:ml-4">
                eri is the developer & technician behind multimedia-artist erosika (@3rosika)
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen h-full bg-red-200 dark:bg-gray-900 dark:bg-opacity-90 text-white font-mono fixed top-0 left-0 right-0 overflow-hidden">
      <Header />
      {/* Main Content */}
      <div className="flex justify-center min-h-0">
        <div className={`flex-1 ${!isMobile ? 'border-r border-gray-800' : ''} relative justify-center`}>
          <div
            style={{ position: "relative", zIndex: 0, overflowY: "auto", height: "100%" }}
            className="flex flex-col"
          >
            <ScrollArea className="h-full">
              <Marquee className="[--duration:1000s]">
                <div className="flex space-x-0">
                  {Array.from({ length: 100 }).map((_, index) => (
                    <Image
                      key={index}
                      src="/images/spy.png"
                      className="h-50"
                      alt="Spy image"
                      width={400}
                      height={800}
                      style={{ opacity: 0.5 }}
                    />
                  ))}
                </div>
              </Marquee>

              {/* Enceladian Glyphs */}
              <Glyphs />

            </ScrollArea>
          </div>

          {/* Bottom border with + signs */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800 flex justify-between px-4 py-1 text-gray-600">
          </div>
        </div>

        {/* Footer with Tweet Card */}
        <div className="absolute bottom-8 left-0 right-0 p-4 text-sm">
          <div className="flex flex-col gap-4">
            <div className="text-pink-400 mb-2">
              <span>&gt; about</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-col">

              </div>
              <div className="text-gray-700 px-4 sm:px-10 py-1 bg-yellow-200 bg-opacity-60 transition-shadow rounded-full sm:ml-4">
                eri is the developer & technician behind multimedia-artist erosika (<a href="https://linktr.ee/erosika" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 underline">@3rosika</a>). welcome to her dev site.
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - hide on mobile */}
        {!isMobile && (
          <div className="w-[400px] border-l border-gray-800 overflow-hidden relative flex flex-col fixed right-0 top-0 bottom-0 z-10 min-w-[200px] max-w-[300px]">
            <div className="justify-center bg-black bg-opacity-40 dark:bg-black dark:bg-opacity-80 top-0 right-0 border-b-2 border-yellow-200 w-full px-4 py-2 text-gray-600">
              <span>+</span>
            </div>
            <div className="flex-1 overflow-y-auto relative text-[10px] leading-[10px] text-gray-500 pl-2 pt-1 font-mono bg-cover bg-center bg-no-repeat">
              {sidebarData.map((line, i) => (
                <div key={i} className="whitespace-nowrap">
                  {line}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
