"use client";

import { useState } from "react";
import DisplayCard from "~/components/ui/displayCard";
import { Sparkles, Code, Music, Palette, Zap, Star, Terminal } from "lucide-react";

interface CardState {
    id: number;
    visible: boolean;
}

export default function DisplayCardExamples() {
    const [cards, setCards] = useState<CardState[]>([
        { id: 1, visible: true },
        { id: 2, visible: true },
        { id: 3, visible: true },
        { id: 4, visible: true },
        { id: 5, visible: true },
        { id: 6, visible: true },
    ]);

    const handleClose = (id: number) => {
        setCards(cards.map(card =>
            card.id === id ? { ...card, visible: false } : card
        ));
    };

    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl font-bold mb-8">DisplayCard Examples</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <h2 className="text-xl font-semibold col-span-full mb-4">Window Controls</h2>

                {/* Card with window controls */}
                {cards[0]?.visible && (
                    <DisplayCard
                        title="Terminal"
                        description="This card has macOS-style window controls. Try the minimize and close buttons!"
                        date="March 2025"
                        icon={<Terminal className="size-4 text-green-400" />}
                        badge="Interactive"
                        badgeColor="accent"
                        showWindowControls={true}
                        onClose={() => handleClose(1)}
                        className="border-gray-300"
                    />
                )}

                {/* Card with window controls and image */}
                {cards[1]?.visible && (
                    <DisplayCard
                        title="Code Editor"
                        description="Window controls work with images too. The minimize button collapses the card."
                        date="March 2025"
                        icon={<Code className="size-4 text-blue-400" />}
                        badge="Try Me"
                        badgeColor="primary"
                        image="/images/princess.png"
                        showWindowControls={true}
                        onClose={() => handleClose(2)}
                        className="border-gray-300"
                    />
                )}

                {/* Card with window controls and overlay layout */}
                {cards[2]?.visible && (
                    <DisplayCard
                        title="Music Player"
                        description="Window controls with overlay layout."
                        date="March 2025"
                        icon={<Music className="size-4 text-white" />}
                        badge="Overlay"
                        badgeColor="secondary"
                        image="/images/spy.png"
                        layout="overlay"
                        aspectRatio="square"
                        showWindowControls={true}
                        onClose={() => handleClose(3)}
                    />
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <h2 className="text-xl font-semibold col-span-full mb-4">Layout Variations</h2>

                {/* Vertical Layout (Default) */}
                {cards[3]?.visible && (
                    <DisplayCard
                        title="Vertical Layout"
                        description="This is the default layout with content stacked vertically."
                        date="March 2025"
                        icon={<Palette className="size-4 text-purple-400" />}
                        badge="Default"
                        image="/images/princess.png"
                        showWindowControls={true}
                        onClose={() => handleClose(4)}
                    />
                )}

                {/* Horizontal Layout */}
                {cards[4]?.visible && (
                    <DisplayCard
                        title="Horizontal Layout"
                        description="Content and image side by side, great for list views."
                        date="March 2025"
                        icon={<Sparkles className="size-4 text-purple-400" />}
                        badge="Horizontal"
                        badgeColor="secondary"
                        image="/images/spy.png"
                        layout="horizontal"
                        showWindowControls={true}
                        onClose={() => handleClose(5)}
                    />
                )}

                {/* Custom Styling */}
                {cards[5]?.visible && (
                    <DisplayCard
                        title="Custom Styling"
                        description="You can customize every aspect of the card."
                        date="March 2025"
                        icon={<Star className="size-5" />}
                        className="border-2 border-[#c0447a] bg-gradient-to-br from-pink-50 to-white"
                        titleClassName="text-[#c0447a] text-lg"
                        descriptionClassName="text-gray-700"
                        iconClassName="bg-[#c0447a]/10 p-2 rounded-full"
                        badge="Custom"
                        badgeColor="accent"
                        badgeClassName="font-bold"
                        showWindowControls={true}
                        onClose={() => handleClose(6)}
                    />
                )}
            </div>

            {/* Reset button */}
            {cards.some(card => !card.visible) && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => setCards(cards.map(card => ({ ...card, visible: true })))}
                        className="px-4 py-2 bg-[#c0447a] text-white rounded-md hover:bg-[#c0447a]/90 transition-colors"
                    >
                        Reset Cards
                    </button>
                </div>
            )}
        </div>
    );
} 