import { Moon, Sun } from "lucide-react"
import { PixelLetter } from "../components/ui/pixel-font"
import Image from "next/image"
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import Header from "./_components/header";
import { Marquee } from "~/components/magicui/marquee";
import localFont from 'next/font/local'


const enceladianFont = localFont({
  src: "../../public/fonts/EnceladianGlyphs.ttf",
  display: "swap",
  variable: "--font-enceladian",
});


export default function Home() {
  return (
    <div className={enceladianFont.variable}>
      <div className="flex flex-col min-h-screen h-full bg-red-200 text-white font-mono fixed top-0 left-0 right-0 overflow-hidden">
        <Header />
        {/* Main Content */}
        <div className="flex justify-center min-h-0">
          <div className="flex-1 border-r border-gray-800 relative justify-center">
            {/* Top border with + signs */}
            {/* <div className="relative top-0 left-0 right-0 border-t-2 border-b-4 border-l-2 border-gray-800 flex justify-between items-center px-4 py-1 text-gray-600">
            <span>+</span>
            <span>+</span>
            <span>+</span>
            <span>+</span>
          </div> */}

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
                <div className="flex justify-center items-center h-full pt-8 pb-8 px-4 relative" style={{ maxWidth: "calc(100vw - 400px)" }}>
                  <div className="relative w-full h-full">
                    {/* A - left */}
                    <div className="absolute left-[180px] top-[160px] text-white text-9xl animate-pulse hover:text-yellow-200 transition-colors duration-500" style={{ fontFamily: "var(--font-enceladian)" }}>
                      X
                    </div>
                    <div className="absolute left-[130px] top-[180px] text-gray-500 text-9xl animate-[pulse_3s_ease-in-out_infinite] hover:text-cyan-300 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>Q</div>
                    <div className="absolute left-[260px] top-[170px] text-lime-300 text-9xl animate-[pulse_4s_ease-in-out_infinite] hover:text-pink-400 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>p</div>

                    {/* A - top */}
                    <div className="absolute left-[180px] top-[20px] text-white text-9xl animate-[pulse_2.5s_ease-in-out_infinite] hover:text-blue-300 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>
                      W
                    </div>
                    <div className="absolute left-[130px] top-[80px] text-yellow-200 text-9xl animate-[pulse_1s_ease-in-out_infinite] hover:text-purple-300 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>L</div>
                    <div className="absolute left-[260px] top-[40px] text-gray-500 text-9xl animate-[pulse_3.7s_ease-in-out_infinite] hover:text-green-300 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>Y</div>
                    <div className="absolute left-[260px] top-[20px] text-gray-500 text-9xl animate-[pulse_4.2s_ease-in-out_infinite] hover:text-red-300 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>h</div>
                    <div className="absolute left-[350px] top-[20px] text-yellow-200 text-9xl animate-[pulse_3.3s_ease-in-out_infinite] hover:text-blue-400 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>G</div>
                    <div className="absolute left-[240px] top-[60px] text-gray-500 text-9xl animate-[pulse_2s_ease-in-out_infinite] hover:text-orange-300 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>U</div>
                    <div className="absolute left-[215px] top-[110px] text-cyan-300 text-9xl animate-[pulse_4.5s_ease-in-out_infinite] hover:text-yellow-300 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>J</div>

                    {/* M */}
                    <div className="absolute left-[420px] top-[20px] text-white text-9xl animate-[pulse_3.1s_ease-in-out_infinite] hover:text-pink-300 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>
                      D
                    </div>
                    <div className="absolute left-[515px] top-[70px] text-gray-500 text-9xl animate-[pulse_2.7s_ease-in-out_infinite] hover:text-lime-300 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>S</div>
                    <div className="absolute left-[390px] top-[165px] text-gray-500 text-9xl animate-[pulse_3.9s_ease-in-out_infinite] hover:text-teal-300 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>V</div>
                    <div className="absolute left-[450px] top-[185px] text-gray-500 text-9xl animate-[pulse_4.7s_ease-in-out_infinite] hover:text-indigo-300 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>O</div>

                    {/* R */}
                    <div className="absolute left-[575px] top-[90px] text-white text-9xl animate-[pulse_3.4s_ease-in-out_infinite] hover:text-amber-300 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>
                      E
                    </div>
                    <div className="absolute left-[620px] top-[20px] text-gray-500 text-9xl animate-[pulse_2.9s_ease-in-out_infinite] hover:text-violet-300 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>F</div>
                    <div className="absolute left-[660px] top-[125px] text-gray-500 text-9xl animate-[pulse_3.6s_ease-in-out_infinite] hover:text-rose-300 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>z</div>
                    <div className="absolute left-[575px] top-[160px] text-pink-400 text-9xl animate-[pulse_4.3s_ease-in-out_infinite] hover:text-emerald-300 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>B</div>
                    <div className="absolute left-[655px] top-[165px] text-gray-500 text-9xl animate-[pulse_3.2s_ease-in-out_infinite] hover:text-sky-300 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>C</div>

                    {/* I */}
                    <div className="absolute left-[740px] top-[90px] text-white text-9xl animate-[pulse_2.6s_ease-in-out_infinite] hover:text-fuchsia-300 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>
                      K
                    </div>
                    <div className="absolute left-[740px] top-[170px] text-gray-500 text-9xl animate-[pulse_4.1s_ease-in-out_infinite] hover:text-amber-300 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>R</div>
                    <div className="absolute left-[855px] top-[90px] text-lime-300 text-9xl animate-[pulse_3.8s_ease-in-out_infinite] hover:text-blue-300 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>T</div>
                    <div className="absolute left-[940px] top-[90px] text-gray-500 text-9xl animate-[pulse_4.4s_ease-in-out_infinite] hover:text-pink-300 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>m</div>
                    <div className="absolute left-[985px] top-[120px] text-gray-500 text-9xl animate-[pulse_3.5s_ease-in-out_infinite] hover:text-green-300 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>N</div>

                    {/* Numbers and symbols */}
                    <div className="absolute left-[130px] top-[130px] text-gray-500 text-9xl animate-[pulse_4.6s_ease-in-out_infinite] hover:text-purple-300 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>A</div>
                    <div className="absolute left-[300px] top-[130px] text-gray-500 text-9xl animate-[pulse_2.4s_ease-in-out_infinite] hover:text-yellow-300 transition-colors" style={{ fontFamily: "var(--font-enceladian)" }}>i</div>
                  </div>
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
    </div >
  )
}
