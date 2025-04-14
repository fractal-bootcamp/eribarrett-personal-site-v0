"use client";

import React, { useState } from 'react';

interface ProjectImageProps {
    src: string;
    alt: string;
    className?: string;
}

export default function ProjectImage({ src, alt, className }: ProjectImageProps) {
    const [isEnlarged, setIsEnlarged] = useState(false);

    const toggleEnlarge = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsEnlarged(!isEnlarged);
    };

    const closeOnBackdropClick = (e: React.MouseEvent) => {
        // Only close if clicking the backdrop, not the image itself
        if (e.target === e.currentTarget) {
            setIsEnlarged(false);
        }
    };

    return (
        <>
            <img
                src={src}
                alt={alt}
                className={`cursor-zoom-in ${className || ''}`}
                onClick={toggleEnlarge}
            />

            {isEnlarged && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={closeOnBackdropClick}
                >
                    <div className="relative max-w-4xl max-h-[90vh] overflow-auto">
                        <button
                            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full flex items-center justify-center"
                            onClick={toggleEnlarge}
                        >
                            ×
                        </button>
                        <img
                            src={src}
                            alt={alt}
                            className="max-w-full max-h-[90vh] object-contain"
                        />
                    </div>
                </div>
            )}
        </>
    );
} 