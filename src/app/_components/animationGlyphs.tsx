import localFont from "next/font/local";
import { ReactNode } from "react";

const enceladianFont = localFont({
    src: "../../../public/fonts/EnceladianGlyphs.ttf",
    display: "swap",
    variable: "--font-enceladian",
});

// Function to generate deterministic "random" values
function seededRandom(seed: number) {
    return function () {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };
}

// Define types for our glyph data
interface GlyphData {
    left: number;
    top: number;
    size: number;
    char: string;
    duration: string;
    color: string;
    hoverColor: string;
}

interface MediumGlyphData {
    left: number;
    top: number;
    size: number;
    char: string;
    duration: string;
    color: string;
}

interface TinyGlyphData {
    left: number;
    top: number;
    size: string;
    char: string;
    duration: string;
    delay: string;
    opacity: string;
}

export default function Glyphs(): ReactNode {
    // Generate deterministic random values
    const random = seededRandom(42); // Use a fixed seed

    // Pre-generate all random values
    const glyphsData: GlyphData[] = Array.from({ length: 40 }).map(() => ({
        left: Math.floor(random() * 95) + 2,
        top: Math.floor(random() * 250) + 20,
        size: Math.floor(random() * 6) + 4,
        char: String.fromCharCode(65 + Math.floor(random() * 26)),
        duration: (random() * 4 + 1).toFixed(1),
        color: (() => {
            const colors = [
                'text-white', 'text-black text-opacity-50', 'text-gray-400',
                'text-pink-400', 'text-pink-300', 'text-purple-300',
                'text-lime-300', 'text-red-300', 'text-orange-300',
                'text-violet-300', 'text-rose-300', 'text-black',
                'text-cyan-300', 'text-indigo-300', 'text-amber-300'
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

    const mediumGlyphsData: MediumGlyphData[] = Array.from({ length: 30 }).map(() => ({
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

    const tinyGlyphsData: TinyGlyphData[] = Array.from({ length: 100 }).map(() => ({
        left: Math.floor(random() * 98) + 1,
        top: Math.floor(random() * 280) + 10,
        size: (random() * 1.5 + 0.5).toFixed(1),
        char: String.fromCharCode(65 + Math.floor(random() * 26)),
        duration: (random() * 1.5 + 0.5).toFixed(1),
        delay: (random() * 2).toFixed(1),
        opacity: (random() * 0.7 + 0.1).toFixed(2)
    }));

    return (
        <div className={enceladianFont.variable}>
            <div className="flex flex-col">
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


    );
}