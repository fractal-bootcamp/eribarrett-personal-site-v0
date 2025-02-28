

import Link from "next/link"
import { Moon, Sun } from "lucide-react"
import { PixelLetter } from "../components/ui/pixel-font"
import Image from "next/image"
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";


export const metadata = {
  title: "Home | Eri Personal",
  description: "Welcome to my personal website",
};

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-red-200 text-white font-mono">
      {/* Header */}
      <header className="flex items-center border-b border-gray-800">
        <div className="w-[70px] h-[70px] bg-[url('/images/princess.png')] flex items-center justify-center bg-full border-r border-gray-800">
          <div className="w-8 h-8 rounded-full border-2 border-black"></div>
        </div>
        <Link href="/" className="flex-1 flex justify-center text-xl tracking-wider py-5  border-x-yellow-200 border-x-8 border-b-2 border-b-gray-800 bg-black bg-opacity-40 hover:bg-opacity-70 transition-shadow" >
          e r i . d e v</Link>
        <div className="flex items-center gap-4 px-6 border-l border-b border-gray-800 h-[70px]">
          <Link
            href="#"
            className="border border-dashed rounded-full border-gray-500 px-5 py-2 text-sm hover:bg-gray-900 transition-colors"
          >
            DEVELOPMENT
          </Link>
          <Link
            href="#"
            className="border border-dashed rounded-full border-gray-500 px-5 py-2 text-sm hover:bg-gray-900 transition-colors"
          >
            MUSIC
          </Link>
          <Link
            href="#"
            className="border border-dashed rounded-full border-gray-500 px-5 py-2 text-sm hover:bg-gray-900 transition-colors"
          >
            VISUALIZE
          </Link>
          <Link
            href="/blog"
            className="border border-dashed rounded-full border-gray-500 px-5 py-2 text-sm hover:bg-gray-900 transition-colors"
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

      {/* Main Content */}
      <div className="flex flex-1 justify-center min-h-0">
        <div className="flex-1 border-r border-gray-800 relative justify-center">
          {/* Top border with + signs */}
          {/* <div className="relative top-0 left-0 right-0 border-t-2 border-b-4 border-l-2 border-gray-800 flex justify-between items-center px-4 py-1 text-gray-600">
            <span>+</span>
            <span>+</span>
            <span>+</span>
            <span>+</span>
          </div> */}

          <div className="flex-col flex">
            <ScrollArea className="w-full h-[2000px] overflow-y-auto">
              <div className="w-full h-full relative overflow-x-auto">
                <ScrollArea className="w-full">
                  <div className="flex space-x-0">
                    {Array.from({ length: 100 }).map((_, index) => (
                      <Image
                        key={index}
                        src="/images/spy.png"
                        className="h-50"
                        alt="Spy image"
                        width={400}
                        height={10}
                        style={{ opacity: 0.5 }}
                      />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>

              {/* Pixel Art Letters */}

              <div className="h-full pt-8 pb-8 px-4 relative min-w-[1200px] h-full relative">
                {/* A - left */}
                <div className="absolute left-[180px] top-[160px] text-white">
                  <PixelLetter letter="A" />
                </div>
                <div className="absolute left-[130px] top-[180px] text-gray-500">2</div>
                <div className="absolute left-[260px] top-[170px] text-lime-300">4</div>

                {/* A - top */}
                <div className="absolute left-[180px] top-[20px] text-white">
                  <PixelLetter letter="A" />
                </div>
                <div className="absolute left-[130px] top-[80px] text-yellow-200">+</div>
                <div className="absolute left-[260px] top-[40px] text-gray-500">5</div>
                <div className="absolute left-[260px] top-[20px] text-gray-500">6</div>
                <div className="absolute left-[350px] top-[20px] text-yellow-200">7</div>
                <div className="absolute left-[240px] top-[60px] text-gray-500">?</div>
                <div className="absolute left-[215px] top-[110px] text-cyan-300">0</div>

                {/* M */}
                <div className="absolute left-[420px] top-[20px] text-white">
                  <PixelLetter letter="M" />
                </div>
                <div className="absolute left-[515px] top-[70px] text-gray-500">2</div>
                <div className="absolute left-[390px] top-[165px] text-gray-500">-</div>
                <div className="absolute left-[450px] top-[185px] text-gray-500">+</div>

                {/* R */}
                <div className="absolute left-[575px] top-[90px] text-white">
                  <PixelLetter letter="R" />
                </div>
                <div className="absolute left-[620px] top-[20px] text-gray-500">-</div>
                <div className="absolute left-[660px] top-[125px] text-gray-500">3</div>
                <div className="absolute left-[575px] top-[160px] text-pink-400">M</div>
                <div className="absolute left-[655px] top-[165px] text-gray-500">7</div>

                {/* I */}
                <div className="absolute left-[740px] top-[90px] text-white">
                  <PixelLetter letter="I" />
                </div>
                <div className="absolute left-[740px] top-[170px] text-gray-500">N</div>
                <div className="absolute left-[855px] top-[90px] text-lime-300">?</div>
                <div className="absolute left-[940px] top-[90px] text-gray-500">4</div>
                <div className="absolute left-[985px] top-[120px] text-gray-500">1</div>

                {/* Numbers and symbols */}
                <div className="absolute left-[130px] top-[130px] text-gray-500">3</div>
                <div className="absolute left-[300px] top-[130px] text-gray-500">3</div>
              </div>
              <ScrollBar orientation="vertical" />
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
        <div className="w-[400px] border-l border-gray-800 overflow-hidden relative">
          <div className="justify-center bg-black bg-opacity-40 top-0 right-0 border-b-2 border-yellow-200 w-full px-4 py-2 text-gray-600">
            <span>+</span>
          </div>
          <div className="h-full overflow-y-auto relative text-[10px] leading-[10px] text-gray-500 pl-2 pt-1 font-mono bg-cover bg-center bg-no-repeat">
            {Array(1000)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="whitespace-nowrap">
                  {Array(400)
                    .fill(0)
                    .map((_, j) => {
                      const chars = ".:+*#@%=-_?!$&"
                      return chars[Math.floor(Math.random() * chars.length)]
                    })
                    .join("")}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
