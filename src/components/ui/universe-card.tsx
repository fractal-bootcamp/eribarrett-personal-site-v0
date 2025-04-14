import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Space_Mono } from 'next/font/google';

// Import Space Mono font - a modern monospace font with a vintage terminal feel
const spaceMono = Space_Mono({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const UniverseCard = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isMinimized, setIsMinimized] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [currentPage, setCurrentPage] = useState(0);

    // Track if we've just clicked a button to prevent position jumps
    const justClickedButton = useRef(false);

    const pages = [
        {
            commands: [
                { command: 'echo "eri.dev"', output: 'eri.dev' },
                { command: 'cat about.txt', output: 'developer behind erosika' }
            ]
        },
        {
            commands: [
                { command: 'ls projects/', output: 'web / installations / multimedia' },
                { command: 'cat tech.txt', output: 'ts, react, next.js, node' }
            ]
        },
        {
            commands: [
                { command: 'whoami', output: 'visitor@eri.dev:~$' }
            ]
        }
    ];

    const cardRef = useRef<HTMLDivElement>(null);

    // Set initial position to vertical center when component mounts
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const screenWidth = window.innerWidth;
            const cardWidth = 400; // Width of the card in pixels

            // Position the card in the center horizontally, and vertically centered
            setPosition({
                x: (screenWidth / 2) - (cardWidth / 2),
                y: window.innerHeight / 3, // Position at 1/3 of the screen height
            });
        }
    }, []);

    const handleButtonClick = (e: React.MouseEvent) => {
        // Prevent event from propagating to parent
        e.stopPropagation();

        // Set flag to prevent position jumps on subsequent mouse events
        justClickedButton.current = true;

        // Reset flag after a short delay
        setTimeout(() => {
            justClickedButton.current = false;
        }, 100);
    };

    const handleClose = (e: React.MouseEvent) => {
        handleButtonClick(e);
        setIsVisible(false);
    };

    const handleMinimize = (e: React.MouseEvent) => {
        handleButtonClick(e);
        setIsMinimized(!isMinimized);
    };

    // Drag handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        // Don't start dragging if we just clicked a button
        if (justClickedButton.current) return;

        // Don't start dragging if clicking on a button
        if (e.target instanceof HTMLButtonElement) return;

        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
            setIsDragging(true);
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Add and remove event listeners for drag
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const handlePrevPage = (e: React.MouseEvent) => {
        handleButtonClick(e);
        setCurrentPage(prev => (prev > 0 ? prev - 1 : pages.length - 1));
    };

    const handleNextPage = (e: React.MouseEvent) => {
        handleButtonClick(e);
        setCurrentPage(prev => (prev < pages.length - 1 ? prev + 1 : 0));
    };

    if (!isVisible) {
        return null;
    }

    return (
        <StyledWrapper
            $isMinimized={isMinimized}
            className={spaceMono.className}
            style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                zIndex: 100,
                cursor: isDragging ? 'grabbing' : 'grab'
            }}
            ref={cardRef}
        >
            <div
                className="card"
                onMouseDown={handleMouseDown}
            >
                <div className="card__controls">
                    <button
                        className="minimize"
                        onClick={handleMinimize}
                    >
                        <sub>-</sub>
                    </button>
                    <button
                        className="close"
                        onClick={handleClose}
                    >×</button>
                </div>
                <div className={`card__content ${isMinimized ? 'minimized' : ''}`}>
                    <div className="card__content-heading">
                        <h2>term</h2>
                        <span className="card__content-path">~/user</span>
                    </div>
                    {!isMinimized && (
                        <>
                            <div className="card__content-body">
                                {pages[currentPage]?.commands.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <p>
                                            <span className="prompt">$</span> {item.command}
                                        </p>
                                        <p className="output">
                                            {item.output}
                                        </p>
                                    </React.Fragment>
                                ))}
                            </div>
                            <div className="card__content-footer">
                                <button
                                    onClick={handlePrevPage}
                                    className="footer-button"
                                >←</button>
                                <button
                                    onClick={handleNextPage}
                                    className="footer-button"
                                >→</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </StyledWrapper>
    );
}

interface StyledWrapperProps {
    $isMinimized: boolean;
}

const StyledWrapper = styled.div<StyledWrapperProps>`
  .card {
   width: 400px;
   height: ${props => props.$isMinimized ? '40px' : '200px'};
   padding: 1.5%;
   background: rgba(90, 75, 65, 0.85); 
   border: 1px solid #9ca3af;
   border-bottom: 1px solid #f5e6a8;
   border-right: 1px solid #f5e6a8;
   transition-duration: .3s;
   transition-property: border, box-shadow, height;
   position: relative;
   overflow: hidden;
   letter-spacing: -0.02em;
   font-weight: 400;
   box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
   user-select: none;
  }

  .card__controls {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    gap: 6px;
    z-index: 10;
  }

  .card__controls button {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid #d1d5db;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #d1d5db;
    background: transparent;
    transition: all 0.2s;
    cursor: pointer;
  }

  .card__controls button:hover {
    background: #d1d5db;
    color: #4b5563;
  }

  .card:hover {
   box-shadow: rgba(0, 0, 0, 0.15) 2px 2px, rgba(0, 0, 0, 0.1) 4px 4px;
  }

  .card__content {
   font-size: x-small;
   text-align: left;
   transition: all 0.3s;
   color: #f8fafc;
  }

  .card__content.minimized {
    padding-top: 0;
  }

  .card__content-heading {
   color: #f5e6a8;
   margin-bottom: 0.75rem;
  }
  
  .card__content-heading h2 {
    font-weight: 400;
    font-size: 0.8rem;
    margin-bottom: 0.15rem;
  }
  
  .card__content-path {
    color: #c0447a;
    font-size: 0.6rem;
    opacity: 0.8;
  }

  .card__content-body {
    line-height: 1.3;
  }

  .card__content-body p {
   color: #e2e8f0;
   padding-bottom: 0.4rem;
   font-size: 0.75rem;
  }
  
  .prompt {
    color: #c0447a;
    margin-right: 0.4rem;
  }
  
  .output {
    color: #cbd5e1;
    padding-left: 0.8rem;
    font-style: italic;
  }

  .card__content-footer {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    gap: 0.8rem;
  }

  .card__content-footer button.footer-button {
    background-color: rgba(85, 75, 70, 0.6);
    color: #e2e8f0;
    font-weight: 400;
    border-radius: .2rem;
    border: 1px solid #9ca3af;
    padding: .3rem 1.5rem;
    transition-duration: .2s;
    transition-property: background-color, color, border, box-shadow;
    cursor: pointer;
    font-size: 0.8rem;
    position: relative;
    z-index: 20; /* Higher z-index to ensure clicks are captured */
  }

  .footer-button:hover {
    color: #ffffff;
    background-color: rgb(254, 202, 202);
    border: 1px solid #f472b6;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0.25em;
  }`;

export default UniverseCard;
