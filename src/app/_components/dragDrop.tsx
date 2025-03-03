"use client"

import { useState, useRef, ReactNode } from "react";
import Image from "next/image";
import * as motion from "motion/react-client";

interface DraggableItem {
    id: number;
    top?: number | string;
    left?: string | number;
    right?: string;
    bottom?: number | string;
    width: number;
    rotate: number;
    height: number;
    content?: {
        image?: string;
        text?: string;
    };
}

interface DragDropProps {
    items?: DraggableItem[];
    children?: ReactNode;
    className?: string;
}

const DragDrop = ({
    items = [
        {
            id: 1,
            top: 10,
            left: "10%",
            width: 250,
            rotate: -3,
            height: 32,
            content: { text: "Drag me around!" }
        },
        {
            id: 2,
            top: 40,
            left: "35%",
            width: 200,
            rotate: 2,
            height: 24,
            content: { text: "Custom content here" }
        },
        {
            id: 3,
            top: 20,
            left: "auto",
            right: "15%",
            width: 220,
            rotate: 5,
            height: 28
        },
        {
            id: 4,
            bottom: 10,
            left: "20%",
            width: 180,
            rotate: -4,
            height: 20
        },
        {
            id: 5,
            bottom: 30,
            left: "auto",
            right: "25%",
            width: 230,
            rotate: -2,
            height: 24
        }
    ],
    children,
    className = ""
}: DragDropProps) => {
    const [draggableItems] = useState<DraggableItem[]>(items);
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div className={`relative w-full h-full overflow-hidden ${className}`}>
            <motion.div
                ref={containerRef}
                className="absolute inset-0 flex flex-col items-center"
            >
                {draggableItems.map(item => (
                    <motion.div
                        key={item.id}
                        className={`absolute border-2 border-gray-800 rounded-lg p-4 bg-black bg-opacity-25 cursor-move`}
                        style={{
                            top: typeof item.top === 'number' ? `${item.top}px` : item.top,
                            left: item.left,
                            right: item.right,
                            bottom: typeof item.bottom === 'number' ? `${item.bottom}px` : item.bottom,
                            width: `${item.width}px`,
                            transform: `rotate(${item.rotate}deg)`
                        }}
                        drag
                        dragConstraints={containerRef}
                        dragElastic={0.2}
                    >
                        {item.content?.image && (
                            <div className="mb-2">
                                <Image
                                    src={item.content.image}
                                    alt="Draggable content"
                                    width={item.width - 32}
                                    height={item.height}
                                    className="rounded-lg"
                                />
                            </div>
                        )}

                        {item.content?.text ? (
                            <div className="text-white">{item.content.text}</div>
                        ) : (
                            <>
                                <div className={`h-${item.height} bg-gray-800 rounded-lg mb-2`}></div>
                                <div className="h-4 w-3/4 bg-gray-700 rounded mb-2"></div>
                                <div className="h-3 w-1/2 bg-gray-700 rounded"></div>
                            </>
                        )}

                        {children}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default DragDrop;