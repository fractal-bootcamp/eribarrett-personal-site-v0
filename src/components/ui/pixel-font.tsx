export function PixelLetter({ letter }: { letter: string }) {
    // Pixel art representation of letters
    const pixelMap: Record<string, string[]> = {
        A: ["  █  ", " █ █ ", "█████", "█   █", "█   █"],
        D: ["████ ", "█   █", "█   █", "█   █", "████ "],
        M: ["█   █", "██ ██", "█ █ █", "█   █", "█   █"],
        I: ["█████", "  █  ", "  █  ", "  █  ", "█████"],
        N: ["█   █", "██  █", "█ █ █", "█  ██", "█   █"],
        R: ["████ ", "█   █", "████ ", "█ █  ", "█  ██"],
    }

    const pixels = pixelMap[letter] || []

    return (
        <div className="inline-block">
            {pixels.map((row, i) => (
                <div key={i} className="flex">
                    {row.split("").map((pixel, j) => (
                        <div key={j} className={`w-1 h-1 ${pixel === "█" ? "bg-white" : "bg-transparent"}`} />
                    ))}
                </div>
            ))}
        </div>
    )
}