import { useState, useRef, useEffect, ReactNode } from "react";
import Image from "next/image";

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
    const [draggableItems, setDraggableItems] = useState<DraggableItem[]>(items);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeItem, setActiveItem] = useState<number | null>(null);
    const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
    const [initialElementPos, setInitialElementPos] = useState({ top: 0, left: 0 });

    const handleMouseDown = (e: React.MouseEvent, item: DraggableItem) => {
        setActiveItem(item.id);
        setInitialPos({ x: e.clientX, y: e.clientY });

        // Find the current item
        const currentItem = draggableItems.find(i => i.id === item.id);

        // Get the element's current position
        const element = e.currentTarget;
        const rect = element.getBoundingClientRect();
        const containerRect = containerRef.current?.getBoundingClientRect() || { top: 0, left: 0 };

        // Calculate position relative to container
        const top = rect.top - containerRect.top;
        const left = rect.left - containerRect.left;

        setInitialElementPos({ top, left });
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!activeItem) return;

        const dx = e.clientX - initialPos.x;
        const dy = e.clientY - initialPos.y;

        setDraggableItems(items =>
            items.map(item => {
                if (item.id === activeItem) {
                    // Calculate new position
                    const newTop = initialElementPos.top + dy;
                    const newLeft = initialElementPos.left + dx;

                    return {
                        ...item,
                        top: newTop,
                        left: `${newLeft}px`,
                        bottom: undefined,
                        right: undefined
                    } as DraggableItem;
                }
                return item;
            })
        );
    };

    const handleMouseUp = () => {
        setActiveItem(null);
    };

    useEffect(() => {
        if (activeItem) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [activeItem, initialPos, initialElementPos]);

    return (
        <div className={`relative w-full h-full overflow-hidden ${className}`}>
            <div
                ref={containerRef}
                className="absolute inset-0 flex flex-col items-center"
            >
                {draggableItems.map(item => (
                    <div
                        key={item.id}
                        className={`absolute border-2 border-gray-800 rounded-lg p-4 bg-black bg-opacity-25 cursor-move ${activeItem === item.id ? 'z-10' : 'z-0'}`}
                        style={{
                            top: typeof item.top === 'number' ? `${item.top}px` : item.top,
                            left: item.left,
                            right: item.right,
                            bottom: typeof item.bottom === 'number' ? `${item.bottom}px` : item.bottom,
                            width: `${item.width}px`,
                            transform: `rotate(${item.rotate}deg)`
                        }}
                        onMouseDown={(e) => handleMouseDown(e, item)}
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DragDrop;