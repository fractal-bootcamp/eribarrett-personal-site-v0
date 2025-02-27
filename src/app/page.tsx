

import Link from "next/link"
import { Moon } from "lucide-react"
import { PixelLetter } from "../components/ui/pixel-font"

export const metadata = {
  title: "Home | Eri Personal",
  description: "Welcome to my personal website",
};

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-red-200 text-white font-mono">
      {/* Header */}
      <header className="flex items-center border-b border-gray-800">
        <div className="w-[70px] h-[70px] bg-[#c8e6d7] flex items-center justify-center border-r border-gray-800">
          <div className="w-8 h-8 rounded-full border-2 border-black"></div>
        </div>
        <div className="flex-1 flex justify-center text-xl tracking-wider py-5">e r i . d e v</div>
        <div className="flex items-center gap-4 px-6 border-l border-gray-800 h-[70px]">
          <Link
            href="#"
            className="border border-dashed border-gray-500 px-4 py-1 text-sm hover:bg-gray-900 transition-colors"
          >
            DEVELOPMENT
          </Link>
          <Link
            href="#"
            className="border border-dashed border-gray-500 px-4 py-1 text-sm hover:bg-gray-900 transition-colors"
          >
            MUSIC
          </Link>
          <Link
            href="#"
            className="border border-dashed border-gray-500 px-4 py-1 text-sm hover:bg-gray-900 transition-colors"
          >
            VISUALIZE
          </Link>
          <Link
            href="#"
            className="border border-dashed border-gray-500 px-4 py-1 text-sm hover:bg-gray-900 transition-colors"
          >
            BLOG
          </Link>
        </div>
        <div className="w-[70px] h-[70px] flex items-center justify-center border-l border-gray-800">
          <button className="p-2 rounded-full hover:bg-gray-800">
            <Moon className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 border-r border-gray-800 relative overflow-hidden">
          {/* Top border with + signs */}
          <div className="absolute top-0 left-0 right-0 border-4 border-gray-800 flex justify-between px-4 py-1 text-gray-600">
            <span>+</span>
            <span>+</span>
            <span>+</span>
            <span>+</span>
          </div>

          {/* Pixel Art Letters */}
          <div className="h-full pt-8 pb-8 px-4 relative">
            {/* A - left */}
            <div className="absolute left-[180px] top-[340px] text-white">
              <PixelLetter letter="A" className="text-2xl font-bold" />
            </div>
            <div className="absolute left-[130px] top-[360px] text-gray-500">2</div>
            <div className="absolute left-[260px] top-[350px] text-lime-300">4</div>

            {/* A - top */}
            <div className="absolute left-[180px] top-[180px] text-white">
              <PixelLetter letter="A" className="text-2xl font-bold" />
            </div>
            <div className="absolute left-[130px] top-[240px] text-yellow-200">+</div>
            <div className="absolute left-[260px] top-[200px] text-gray-500">5</div>
            <div className="absolute left-[260px] top-[155px] text-gray-500">6</div>
            <div className="absolute left-[350px] top-[165px] text-yellow-200">7</div>
            <div className="absolute left-[240px] top-[220px] text-gray-500">?</div>
            <div className="absolute left-[215px] top-[270px] text-cyan-500">0</div>

            {/* M */}
            <div className="absolute left-[420px] top-[180px] text-white">
              <PixelLetter letter="M" className="text-2xl font-bold" />
            </div>
            <div className="absolute left-[515px] top-[230px] text-gray-500">2</div>
            <div className="absolute left-[390px] top-[345px] text-gray-500">-</div>
            <div className="absolute left-[450px] top-[365px] text-gray-500">+</div>

            {/* R */}
            <div className="absolute left-[575px] top-[250px] text-white">
              <PixelLetter letter="R" className="text-2xl font-bold" />
            </div>
            <div className="absolute left-[620px] top-[180px] text-gray-500">-</div>
            <div className="absolute left-[660px] top-[285px] text-gray-500">3</div>
            <div className="absolute left-[575px] top-[340px] text-pink-400">M</div>
            <div className="absolute left-[655px] top-[345px] text-gray-500">7</div>

            {/* I */}
            <div className="absolute left-[740px] top-[250px] text-white">
              <PixelLetter letter="I" className="text-2xl font-bold" />
            </div>
            <div className="absolute left-[740px] top-[350px] text-gray-500">N</div>
            <div className="absolute left-[855px] top-[250px] text-lime-300">?</div>
            <div className="absolute left-[940px] top-[250px] text-gray-500">4</div>
            <div className="absolute left-[985px] top-[280px] text-gray-500">1</div>

            {/* Numbers and symbols */}
            <div className="absolute left-[130px] top-[290px] text-gray-500">3</div>
            <div className="absolute left-[300px] top-[290px] text-gray-500">3</div>
          </div>

          {/* Bottom border with + signs */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800 flex justify-between px-4 py-1 text-gray-600">

          </div>

          {/* Footer */}
          <div className="absolute bottom-8 left-0 right-0 p-4 text-sm">
            <div className="flex flex-col">
              <div className="text-pink-400 mb-2">
                <span>&gt; about</span>
              </div>
              <div className="flex gap-2">
                <a href="https://erosika.digital" className="text-gray-500 text-xs">
                  https://erosika.digital
                </a>
                <span className="text-blue-400">eri is a developer, she is technician behind multimedia-artist erosika (@3rosika)</span>
              </div>
              <div className="text-gray-500 ml-8">On a mission to be world building for this eternity on over</div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[400px] border-l border-gray-800 overflow-hidden relative">
          <div className="absolute top-0 right-0 border-b-2 border-lime-300 w-full px-4 py-1 text-gray-600">
            <span>+</span>
          </div>
          <div className="h-full pt-10 overflow-hidden relative text-[10px] leading-[10px] text-gray-500 p-2 font-mono">
            {Array(70)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="whitespace-nowrap">
                  {Array(40)
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
