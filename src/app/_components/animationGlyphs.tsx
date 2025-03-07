import localFont from "next/font/local";
import { ReactNode, useEffect, useState } from "react";

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
type GlyphData = {
    left: number;
    top: number;
    size: number;
    char: string;
    duration: string;
    color: string;
    hoverColor: string;
};

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
    const [seed, setSeed] = useState<number>(28);

    useEffect(() => {
        // Generate a new random seed on each client-side render
        setSeed(Math.floor(Math.random() * 10000));
    }, []);

    // Generate random values with the current seed
    const random = seededRandom(seed);

    // Pre-generate all random values
    const glyphsData: GlyphData[] = Array.from({ length: 40 }).map(() => ({
        left: Math.floor(random() * 95) + 2,
        top: Math.floor(random() * 500) + 100, // Expanded vertical range to distribute throughout the page
        size: Math.floor(random() * 6) + 4,
        char: String.fromCharCode(65 + Math.floor(random() * 26)),
        duration: (random() * 4 + 1).toFixed(1),
        color: (() => {
            const colors = [
                'text-white dark:text-white',
                'text-black text-opacity-40 dark:text-white dark:text-opacity-40',
                'text-black text-opacity-60 dark:text-white dark:text-opacity-60',
                'text-black text-opacity-30 dark:text-white dark:text-opacity-30',
                'text-black text-opacity-70 dark:text-white dark:text-opacity-70',
            ];
            // Add colored text with reduced frequency
            if (random() > 0.85) colors.push('text-pink-300 dark:text-pink-400');
            if (random() > 0.9) colors.push('text-lime-300 dark:text-lime-400');
            if (random() > 0.88) colors.push('text-cyan-300 dark:text-cyan-400');
            // Reduced chance of yellow
            if (random() > 0.92) colors.push('text-yellow-200 dark:text-yellow-300');
            return colors[Math.floor(random() * colors.length)];
        })() || "text-white dark:text-white",
        hoverColor: (() => {
            const hoverColors = [
                'hover:text-black hover:text-opacity-80 dark:hover:text-white dark:hover:text-opacity-80',
                'hover:text-black hover:text-opacity-70 dark:hover:text-white dark:hover:text-opacity-70',
                'hover:text-black hover:text-opacity-60 dark:hover:text-white dark:hover:text-opacity-60',
            ];
            // Add colored hover effects with reduced frequency
            if (random() > 0.85) hoverColors.push('hover:text-pink-300 dark:hover:text-pink-400');
            if (random() > 0.9) hoverColors.push('hover:text-cyan-300 dark:hover:text-cyan-400');
            if (random() > 0.92) hoverColors.push('hover:text-yellow-300 dark:hover:text-yellow-400');
            return hoverColors[Math.floor(random() * hoverColors.length)];
        })() || "hover:text-white dark:hover:text-white"
    }));
    const mediumGlyphsData: MediumGlyphData[] = Array.from({ length: 30 }).map(() => ({
        left: Math.floor(random() * 95) + 2,
        top: Math.floor(random() * 600) - 10,
        size: Math.floor(random() * 3) + 4,
        char: String.fromCharCode(97 + Math.floor(random() * 26)),
        duration: (random() * 3 + 2).toFixed(1),
        color: (() => {
            const colors = ['text-white dark:text-white', 'text-black text-opacity-80 dark:text-white dark:text-opacity-80'];
            // Reduced chance of yellow
            if (random() > 0.95) colors.push('text-yellow-200 dark:text-yellow-300');
            return colors[Math.floor(random() * colors.length)] || 'text-white dark:text-white';
        })()
    }));

    const tinyGlyphsData: TinyGlyphData[] = Array.from({ length: 100 }).map(() => ({
        left: Math.floor(random() * 98) + 1,
        top: Math.floor(random() * 600) + 10,
        size: (random() * 1.5 + 0.5).toFixed(1),
        char: String.fromCharCode(65 + Math.floor(random() * 26)),
        duration: (random() * 1.5 + 0.5).toFixed(1),
        delay: (random() * 2).toFixed(1),
        opacity: (random() * 0.7 + 0.1).toFixed(2)
    }));

    return (
        <div className={enceladianFont.variable}>
            <div className="flex flex-1 w-full overflow-hidden min-h-screen">
                {/* Enceladian Glyphs */}
                <div className="relative w-full h-full min-h-screen">
                    {/* Randomly distributed glyphs */}
                    {glyphsData.map((glyph, index) => (
                        <div
                            key={`glyph-${index}`}
                            className={`absolute ${glyph.color} ${glyph.hoverColor} text-${glyph.size}lg animate-[pulse_${glyph.duration}s_ease-in-out_infinite] transition-colors duration-500`}
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

                    {/* Tiny star-like glyphs with flickering - now distributed across a larger vertical space */}
                    {tinyGlyphsData.map((glyph, index) => (
                        <div
                            key={`tiny-${index}`}
                            className="absolute text-white dark:text-white"
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