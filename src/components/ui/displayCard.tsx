"use client";

import { cn } from "~/lib/utils";
import { ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Maximize2 } from "lucide-react";

export interface DisplayCardProps {
    // Content
    title?: string;
    description?: string;
    date?: string;
    icon?: ReactNode;
    image?: string;
    imageAlt?: string;

    // Link
    href?: string;
    target?: "_blank" | "_self";

    // Styling
    className?: string;
    contentClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    dateClassName?: string;
    iconClassName?: string;
    imageClassName?: string;

    // Layout
    layout?: "horizontal" | "vertical" | "overlay";
    aspectRatio?: "auto" | "square" | "video" | "portrait" | "wide";

    // Effects
    hoverEffect?: "scale" | "lift" | "glow" | "border" | "none";
    animation?: "fade" | "slide" | "bounce" | "none";

    // Badge
    badge?: string;
    badgeColor?: "default" | "primary" | "secondary" | "accent" | "custom";
    badgeClassName?: string;

    // Window Controls
    showWindowControls?: boolean;
    onClose?: () => void;

    // Misc
    onClick?: () => void;
    children?: ReactNode;
}

export default function DisplayCard({
    // Content
    title,
    description,
    date,
    icon,
    image,
    imageAlt = "Card image",

    // Link
    href,
    target = "_self",

    // Styling
    className,
    contentClassName,
    titleClassName,
    descriptionClassName,
    dateClassName,
    iconClassName,
    imageClassName,

    // Layout
    layout = "vertical",
    aspectRatio = "auto",

    // Effects
    hoverEffect = "scale",
    animation = "none",

    // Badge
    badge,
    badgeColor = "primary",
    badgeClassName,

    // Window Controls
    showWindowControls = false,
    onClose,

    // Misc
    onClick,
    children,
}: DisplayCardProps) {
    // State for minimized window
    const [isMinimized, setIsMinimized] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // Handle close button click
    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            setIsVisible(false);
        }
    };

    // Handle minimize button click
    const handleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    // If card is closed, don't render anything
    if (!isVisible) {
        return null;
    }

    // Determine aspect ratio class
    const aspectRatioClass = {
        auto: "",
        square: "aspect-square",
        video: "aspect-video",
        portrait: "aspect-[3/4]",
        wide: "aspect-[16/9]",
    }[aspectRatio];

    // Determine hover effect class
    const hoverEffectClass = {
        scale: "transition-transform duration-300 hover:scale-[1.02]",
        lift: "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        glow: "transition-all duration-300 hover:shadow-[0_0_15px_rgba(192,68,122,0.5)]",
        border: "transition-all duration-300 hover:border-[#c0447a]",
        none: "",
    }[hoverEffect];

    // Determine animation class
    const animationClass = {
        fade: "animate-in fade-in duration-500",
        slide: "animate-in slide-in-from-bottom-4 duration-500",
        bounce: "animate-in zoom-in-50 duration-300",
        none: "",
    }[animation];

    // Determine badge color class
    const badgeColorClass = {
        default: "bg-muted text-muted-foreground",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        accent: "bg-[#c0447a] text-white",
        custom: "",
    }[badgeColor];

    // Determine layout class
    const layoutClass = {
        horizontal: "flex flex-row items-center gap-4",
        vertical: "flex flex-col",
        overlay: "relative",
    }[layout];

    // Create the card content
    const cardContent = (
        <div
            className={cn(
                "rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden",
                layoutClass,
                aspectRatioClass,
                hoverEffectClass,
                animationClass,
                isMinimized && "h-10 overflow-hidden",
                className
            )}
            onClick={onClick}
        >
            {/* Window Controls */}
            {showWindowControls && (
                <div className="flex items-center gap-1.5 absolute top-2 left-2 z-20">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClose();
                        }}
                        className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group"
                        aria-label="Close"
                    >
                        <X className="w-2 h-2 text-white opacity-0 group-hover:opacity-100" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleMinimize();
                        }}
                        className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center group"
                        aria-label="Minimize"
                    >
                        <Minus className="w-2 h-2 text-white opacity-0 group-hover:opacity-100" />
                    </button>
                    <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center group">
                        <Maximize2 className="w-2 h-2 text-white opacity-0 group-hover:opacity-100" />
                    </div>
                </div>
            )}

            {/* Image */}
            {!isMinimized && image && (
                <div
                    className={cn(
                        layout === "horizontal" ? "w-1/3" :
                            layout === "overlay" ? "absolute inset-0 z-0" :
                                "w-full",
                        imageClassName
                    )}
                >
                    <Image
                        src={image}
                        alt={imageAlt}
                        width={500}
                        height={300}
                        className={cn(
                            "object-cover",
                            layout === "horizontal" ? "h-full w-full" :
                                layout === "overlay" ? "absolute inset-0 z-0" :
                                    "w-full",
                            layout === "overlay" && "opacity-80"
                        )}
                    />
                </div>
            )}

            {/* Content */}
            <div
                className={cn(
                    "flex flex-col gap-2",
                    layout === "horizontal" ? "flex-1 p-4" :
                        layout === "overlay" ? "relative z-10 p-4 h-full justify-end bg-gradient-to-t from-black/60 to-transparent" :
                            "p-4",
                    isMinimized && "p-2",
                    contentClassName
                )}
            >
                {/* Title bar - always visible even when minimized */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {icon && (
                            <div className={cn("flex items-center", iconClassName)}>
                                {icon}
                            </div>
                        )}

                        {title && (
                            <h3
                                className={cn(
                                    "font-medium truncate",
                                    layout === "overlay" && "text-white",
                                    titleClassName
                                )}
                            >
                                {title}
                            </h3>
                        )}
                    </div>

                    {badge && !isMinimized && (
                        <span
                            className={cn(
                                "px-2 py-1 text-xs font-medium rounded-full",
                                badgeColorClass,
                                badgeClassName
                            )}
                        >
                            {badge}
                        </span>
                    )}
                </div>

                {/* Content only visible when not minimized */}
                {!isMinimized && (
                    <>
                        {/* Description */}
                        {description && (
                            <p
                                className={cn(
                                    "text-sm text-muted-foreground",
                                    layout === "overlay" && "text-white/80",
                                    descriptionClassName
                                )}
                            >
                                {description}
                            </p>
                        )}

                        {/* Date */}
                        {date && (
                            <p
                                className={cn(
                                    "text-xs text-muted-foreground mt-auto",
                                    layout === "overlay" && "text-white/70",
                                    dateClassName
                                )}
                            >
                                {date}
                            </p>
                        )}

                        {/* Children */}
                        {children}
                    </>
                )}
            </div>
        </div>
    );

    // Wrap with link if href is provided and not minimized
    if (href && !isMinimized) {
        return (
            <Link href={href} target={target} className="block">
                {cardContent}
            </Link>
        );
    }

    return cardContent;
}

// Example usage:
// <DisplayCard 
//   title="My Project"
//   description="A description of my awesome project"
//   date="March 2025"
//   image="/images/project.jpg"
//   layout="overlay"
//   aspectRatio="wide"
//   hoverEffect="glow"
//   badge="New"
//   badgeColor="accent"
//   href="/projects/my-project"
//   showWindowControls={true}
//   onClose={() => console.log("Card closed")}
// /> 