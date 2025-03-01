"use client"

import { Moon, Sun } from "lucide-react"
import { PixelLetter } from "../components/ui/pixel-font"
import Image from "next/image"
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import Header from "./_components/header";
import { Marquee } from "~/components/magicui/marquee";
import localFont from 'next/font/local'
import { useEffect, useState } from "react"

const enceladianFont = localFont({
  src: "../../public/fonts/EnceladianGlyphs.ttf",
  display: "swap",
  variable: "--font-enceladian",
});

// Function to generate deterministic "random" values
function seededRandom(seed) {
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Only render the random elements after client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={enceladianFont.variable}>
        <div className="flex flex-col min-h-screen h-full bg-red-200 text-white font-mono fixed top-0 left-0 right-0 overflow-hidden">
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
            <div className="w-[400px] border-l border-gray-800 overflow-hidden relative flex flex-col fixed right-0 top-0 bottom-0 z-10 min-w-[200px] max-w-[300px]">
              <div className="justify-center bg-black bg-opacity-40 top-0 right-0 border-b-2 border-yellow-200 w-full px-4 py-2 text-gray-600">
                <span>+</span>
              </div>
              <div className="flex-1 overflow-y-auto relative text-[10px] leading-[10px] text-gray-500 pl-2 pt-1 font-mono bg-cover bg-center bg-no-repeat">
                {/* Loading state */}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-8 left-0 right-0 p-4 text-sm">
            <div className="flex flex-col">
              <div className="text-pink-400 mb-2">
                <span>&gt; about</span>
              </div>
              <div className="flex gap-4">
                <div className="flex-col">
                  <a href="https://erosika.digital" className="text-gray-500 text-xs underline">
                    https://erosika.digital
                  </a>
                </div>
                <div className="text-gray-700 px-10 py-1 bg-yellow-200 bg-opacity-60 transition-shadow rounded-full ml-4">eri is the developer & technician behind multimedia-artist erosika (@3rosika)</div>
              </div>
              <div className="pt-4 text-3xl pl-5">🌐<div className="text-gray-500 text-sm ml-11 pb-4 pl-2 italic"> world building for this eternity on over... </div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Generate deterministic random values
  const random = seededRandom(42); // Use a fixed seed

  // Pre-generate all random values
  const glyphsData = Array.from({ length: 40 }).map(() => ({
    left: Math.floor(random() * 95) + 2,
    top: Math.floor(random() * 250) + 20,
    size: Math.floor(random() * 6) + 4,
    char: String.fromCharCode(65 + Math.floor(random() * 26)),
    duration: (random() * 4 + 1).toFixed(1),
    color: (() => {
      const colors = [
        'text-white', 'text-gray-500', 'text-gray-400',
        'text-pink-400', 'text-pink-300', 'text-purple-300',
        'text-lime-300', 'text-red-300', 'text-orange-300',
        'text-violet-300', 'text-rose-300', 'text-fuchsia-300',
        'text-teal-300', 'text-indigo-300', 'text-amber-300'
      ];
      if (random() > 0.7) colors.push('text-yellow-200');
      if (random() > 0.8) colors.push('text-cyan-300');
      return colors[Math.floor(random() * colors.length)];
    })(),
    hoverColor: (() => {
      const hoverColors = [
        'hover:text-pink-300', 'hover:text-purple-300',
        'hover:text-lime-300', 'hover:text-red-300',
        'hover:text-orange-300', 'hover:text-violet-300',
        'hover:text-rose-300', 'hover:text-fuchsia-300',
        'hover:text-teal-300', 'hover:text-indigo-300',
        'hover:text-amber-300', 'hover:text-pink-400'
      ];
      if (random() > 0.7) hoverColors.push('hover:text-yellow-300');
      if (random() > 0.8) hoverColors.push('hover:text-cyan-300');
      return hoverColors[Math.floor(random() * hoverColors.length)];
    })()
  }));

  const mediumGlyphsData = Array.from({ length: 30 }).map(() => ({
    left: Math.floor(random() * 95) + 2,
    top: Math.floor(random() * 250) + 20,
    size: Math.floor(random() * 3) + 4,
    char: String.fromCharCode(97 + Math.floor(random() * 26)),
    duration: (random() * 3 + 2).toFixed(1),
    color: (() => {
      const colors = ['text-gray-400', 'text-gray-500', 'text-white', 'text-pink-400', 'text-purple-300', 'text-violet-300'];
      if (random() > 0.8) colors.push('text-yellow-200');
      return colors[Math.floor(random() * colors.length)];
    })()
  }));

  const tinyGlyphsData = Array.from({ length: 100 }).map(() => ({
    left: Math.floor(random() * 98) + 1,
    top: Math.floor(random() * 280) + 10,
    size: (random() * 1.5 + 0.5).toFixed(1),
    char: String.fromCharCode(65 + Math.floor(random() * 26)),
    duration: (random() * 1.5 + 0.5).toFixed(1),
    delay: (random() * 2).toFixed(1),
    opacity: (random() * 0.7 + 0.1).toFixed(2)
  }));

  // Pre-generate sidebar characters
  const sidebarChars = ".:+*#@%=-_?!$&";
  const sidebarData = Array(1000).fill(0).map(() =>
    Array(400).fill(0).map(() =>
      sidebarChars[Math.floor(random() * sidebarChars.length)]
    ).join("")
  );

  return (
    <div className={enceladianFont.variable}>
      <div className="flex flex-col min-h-screen h-full bg-red-200 text-white font-mono fixed top-0 left-0 right-0 overflow-hidden">
        <Header />
        {/* Main Content */}
        <div className="flex justify-center min-h-0">
          <div className="flex-1 border-r border-gray-800 relative justify-center">
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
                <div className="relative w-full h-full">
                  {/* Randomly distributed glyphs */}
                  {glyphsData.map((glyph, index) => (
                    <div
                      key={`glyph-${index}`}
                      className={`absolute ${glyph.color} ${glyph.hoverColor} text-${glyph.size}xl animate-[pulse_${glyph.duration}s_ease-in-out_infinite] transition-colors duration-500`}
                      style={{
                        left: `${glyph.left}%`,
                        top: `${glyph.top}px`,
                        fontFamily: "var(--font-enceladian)"
                      }}
                    >
                      {glyph.char}
                    </div>
                  ))}

                  {/* Medium sized glyphs */}
                  {mediumGlyphsData.map((glyph, index) => (
                    <div
                      key={`medium-${index}`}
                      className={`absolute ${glyph.color}`}
                      style={{
                        left: `${glyph.left}%`,
                        top: `${glyph.top}px`,
                        fontSize: `${glyph.size}rem`,
                        fontFamily: "var(--font-enceladian)",
                        animation: `pulse ${glyph.duration}s ease-in-out infinite`
                      }}
                    >
                      {glyph.char}
                    </div>
                  ))}

                  {/* Tiny star-like glyphs with flickering */}
                  {tinyGlyphsData.map((glyph, index) => (
                    <div
                      key={`tiny-${index}`}
                      className="absolute text-white"
                      style={{
                        left: `${glyph.left}%`,
                        top: `${glyph.top}px`,
                        fontSize: `${glyph.size}rem`,
                        fontFamily: "var(--font-enceladian)",
                        opacity: glyph.opacity,
                        animation: `twinkle ${glyph.duration}s ease-in-out ${glyph.delay}s infinite alternate`
                      }}
                    >
                      {glyph.char}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Bottom border with + signs */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800 flex justify-between px-4 py-1 text-gray-600">
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-8 left-0 right-0 p-4 text-sm">
            <div className="flex flex-col">
              <div className="text-pink-400 mb-2">
                <span>&gt; about</span>
              </div>
              <div className="flex gap-4">
                <div className="flex-col">
                  <a href="https://erosika.digital" className="text-gray-500 text-xs underline">
                    https://erosika.digital
                  </a>
                </div>
                <div className="text-gray-700 px-10 py-1 bg-yellow-200 bg-opacity-60 transition-shadow rounded-full ml-4">eri is the developer & technician behind multimedia-artist erosika (@3rosika)</div>
              </div>
              <div className="pt-4 text-3xl pl-5">🌐<div className="text-gray-500 text-sm ml-11 pb-4 pl-2 italic"> world building for this eternity on over... </div></div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-[400px] border-l border-gray-800 overflow-hidden relative flex flex-col fixed right-0 top-0 bottom-0 z-10 min-w-[200px] max-w-[300px]">
            <div className="justify-center bg-black bg-opacity-40 top-0 right-0 border-b-2 border-yellow-200 w-full px-4 py-2 text-gray-600">
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
        </div>
      </div>

      <style global jsx>{`
        @keyframes flicker {
          0%, 30% { opacity: 0.2; }
          40%, 60% { opacity: 0.7; }
          70%, 100% { opacity: 0.4; }
        }
        
        @keyframes twinkle {
          0%, 80% { opacity: 0.1; transform: scale(0.8); }
          81%, 100% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}
