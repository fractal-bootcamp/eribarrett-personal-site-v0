"use client"
import { useState, useEffect, useRef } from "react"
import { Download, Printer, Mail, Phone, MapPin, AtSign, GraduationCap, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import styles from "./cv-page.module.css"
// Import html2pdf dynamically since it's a client-side library


export default function Home() {
    const router = useRouter()
    const [isLoaded, setIsLoaded] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const [scrollPosition, setScrollPosition] = useState(0)

    // Cursor state
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
    const [cursorVisible, setCursorVisible] = useState(true)
    const [vimMode, setVimMode] = useState("normal") // normal, insert, visual
    const [cursorActive, setCursorActive] = useState(false)

    // Reference to track current element
    const cursorElementRef = useRef<HTMLElement | null>(null)

    const pdfRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setIsLoaded(true)

        const handleScroll = () => {
            if (containerRef.current) {
                setScrollPosition(window.scrollY)
            }
        }

        window.addEventListener("scroll", handleScroll)

        // Initialize cursor at education section
        const educationElement = document.querySelector(`.${styles.educationText}`) as HTMLElement
        if (educationElement) {
            const rect = educationElement.getBoundingClientRect()
            setCursorPosition({
                x: rect.right,
                y: rect.top + rect.height / 2,
            })
            cursorElementRef.current = educationElement
        }

        // Blink cursor
        const blinkInterval = setInterval(() => {
            setCursorVisible((prev) => !prev)
        }, 530)

        // Handle keyboard events for VIM keybindings
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!cursorActive) return

            // VIM keybindings
            switch (e.key) {
                case "i":
                    if (vimMode === "normal") setVimMode("insert")
                    break
                case "Escape":
                    setVimMode("normal")
                    break
                case "h": // left
                    if (vimMode === "normal") {
                        setCursorPosition((prev) => ({ ...prev, x: prev.x - 10 }))
                    }
                    break
                case "j": // down
                    if (vimMode === "normal") {
                        setCursorPosition((prev) => ({ ...prev, y: prev.y + 20 }))
                    }
                    break
                case "k": // up
                    if (vimMode === "normal") {
                        setCursorPosition((prev) => ({ ...prev, y: prev.y - 20 }))
                    }
                    break
                case "l": // right
                    if (vimMode === "normal") {
                        setCursorPosition((prev) => ({ ...prev, x: prev.x + 10 }))
                    }
                    break
                case "w": // word forward
                    if (vimMode === "normal") {
                        setCursorPosition((prev) => ({ ...prev, x: prev.x + 50 }))
                    }
                    break
                case "b": // word back
                    if (vimMode === "normal") {
                        setCursorPosition((prev) => ({ ...prev, x: prev.x - 50 }))
                    }
                    break
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("keydown", handleKeyDown)
            clearInterval(blinkInterval)
        }
    }, [cursorActive, vimMode])

    const handlePrint = () => {
        window.print()
    }

    const handleDownloadPDF = async () => {
        // Dynamically import html2pdf only on the client side when needed
        const html2pdf = (await import('html2pdf.js')).default;

        if (pdfRef.current) {
            // Create a clone of the CV content to modify for PDF export
            const element = pdfRef.current.cloneNode(true) as HTMLElement;

            // Remove elements that shouldn't be in the PDF
            const vimCursor = element.querySelector(`.${styles.vimCursor}`);
            if (vimCursor) vimCursor.remove();

            const vimModeInfo = element.querySelector(`.${styles.vimModeInfo}`);
            if (vimModeInfo) vimModeInfo.remove();

            const actionButtons = element.querySelector(`.${styles.actionButtons}`);
            if (actionButtons) actionButtons.remove();

            // Get all styles from the document
            const styleSheets = Array.from(document.styleSheets);
            let cssText = '';

            // Extract CSS rules that apply to our component
            styleSheets.forEach(sheet => {
                try {
                    const rules = Array.from(sheet.cssRules || []);
                    rules.forEach(rule => {
                        // Only include rules that might apply to our CV content
                        // This includes module styles which have unique hashes
                        if (rule.cssText.includes('cv-page_') ||
                            rule.cssText.includes('cvContainer') ||
                            rule.cssText.includes('cvContent')) {
                            cssText += rule.cssText + '\n';
                        }
                    });
                } catch (e) {
                    // Some cross-origin stylesheets may throw security errors
                    console.log('Could not access stylesheet rules');
                }
            });

            // Create a style element with all our CSS
            const style = document.createElement('style');
            style.textContent = cssText;
            element.prepend(style);

            // Configure PDF options
            const options = {
                margin: [10, 10, 10, 10] as [number, number, number, number],
                filename: 'eri-barrett-cv.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    letterRendering: true
                },
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'portrait' as 'portrait' | 'landscape'
                }
            };

            // Generate PDF
            html2pdf().from(element).set(options).save();
        }
    }

    const activateCursor = () => {
        setCursorActive(true)
    }

    // Calculate parallax effect
    const getParallaxStyle = (speed: number) => {
        return {
            transform: `translateY(${scrollPosition * speed}px)`,
        }
    }

    const handleBack = () => {
        router.push('/')
    }

    return (
        <div ref={containerRef} className={styles.cvContainer}>
            {/* Back button */}
            <button onClick={handleBack} className={styles.backButton}>
                <ArrowLeft size={16} className={styles.backButtonIcon} />
                <span>Back</span>
            </button>

            {/* Floating geometric elements with parallax */}
            <div
                className={styles.floatingCircle}
                style={{
                    opacity: isLoaded ? 0.2 : 0,
                    ...getParallaxStyle(-0.02),
                }}
            ></div>
            <div
                className={styles.floatingSquare}
                style={{
                    opacity: isLoaded ? 0.15 : 0,
                    ...getParallaxStyle(0.03),
                }}
            ></div>

            <div ref={pdfRef} className={styles.cvContent}>
                {/* Print and Download buttons */}
                <div className={styles.actionButtons}>
                    <button onClick={handlePrint} className={styles.actionButton} aria-label="Print CV">
                        <Printer size={20} className={styles.actionButtonIcon} />
                    </button>
                    <button onClick={handleDownloadPDF} className={styles.actionButton} aria-label="Download CV">
                        <Download size={20} className={styles.actionButtonIcon} />
                    </button>
                </div>

                <header className={styles.header}>
                    <div className={styles.nameContainer}>
                        <h1 className={styles.name}>eri barrett</h1>
                        <p className={styles.title}>Full Stack Developer & Digital Artist</p>
                    </div>

                    <div className={styles.contactInfo}>
                        <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`} className={styles.contactItem}>
                            <Mail size={14} className={styles.contactIcon} />
                            <span>{process.env.NEXT_PUBLIC_EMAIL}</span>
                        </Link>
                        <Link href={`tel:${process.env.NEXT_PUBLIC_PHONE}`} className={styles.contactItem}>
                            <Phone size={14} className={styles.contactIcon} />
                            <span>{process.env.NEXT_PUBLIC_PHONE}</span>
                        </Link>
                        <div className={styles.contactItem}>
                            <MapPin size={14} className={styles.contactIcon} />
                            <span>Brooklyn, NY</span>
                        </div>
                        <Link href="https://twitter.com/3rosika" className={styles.contactItem}>
                            <AtSign size={14} className={styles.contactIcon} />
                            <span>3rosika</span>
                        </Link>
                    </div>

                    {/* Education with typewriter font and background */}
                    <div className={styles.educationContainer}>
                        <div className={styles.educationBox} onClick={activateCursor}>
                            <GraduationCap size={14} className={styles.educationIcon} />
                            <span className={styles.educationLabel}>$ Education:</span>
                            <span className={styles.educationText}>Columbia University</span>
                            <span className={styles.educationSeparator}>|</span>
                            <span className={styles.educationText}>BA in Anthropology & Visual Arts</span>

                            {/* VIM cursor */}
                            {cursorActive && (
                                <div
                                    className={`${styles.vimCursor} ${cursorVisible ? "visible" : "invisible"}`}
                                    style={{
                                        left: `${cursorPosition.x}px`,
                                        top: `${cursorPosition.y}px`,
                                        width: vimMode === "normal" ? "8px" : "2px",
                                        backgroundColor: vimMode === "insert" ? "#c0447a" : "#000",
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    {/* VIM mode indicator */}
                    {cursorActive && (
                        <div className={styles.vimModeInfo}>
                            <span className={styles.vimModeText}>
                                -- {vimMode.toUpperCase()} MODE -- (Click education to activate, use h,j,k,l,w,b,i,ESC)
                            </span>
                        </div>
                    )}
                </header>

                <section className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>Summary</h2>
                    <p className={styles.sectionText}>
                        Full stack developer creating engaging web experiences using React, Next.js, and AI integrations. Combining
                        frontend expertise with robust backend development to deliver intuitive, scalable digital solutions.
                    </p>
                </section>

                <section className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>Experience</h2>

                    <div className={styles.experienceItem}>
                        <div className={styles.experienceHeader}>
                            <div className={styles.experienceTitle}>
                                <h3 className={styles.experienceName}>Software Developer</h3>
                                <span className={styles.experienceSeparator}>|</span>
                                <span className={styles.experienceCompany}>Fractal Tech, NYC</span>
                            </div>
                            <div className={styles.experiencePeriod}>2025 - Present</div>
                        </div>
                        <ul className={styles.experienceList}>
                            <li>Architected and deployed 15+ web applications with Next.js, React, and TypeScript</li>
                            <li>Integrated OpenAI and Anthropic APIs with Vercel's AI SDK for intelligent features</li>
                            <li>Implemented backend solutions using Node.js, Express, Prisma, Supabase, and DrizzleORM</li>
                            <li>Built type-safe APIs with tRPC and optimized RESTful endpoints using Elysia</li>
                            <li>Crafted responsive interfaces with Tailwind CSS, shadcn/ui, and Framer Motion</li>
                            <li>Developed secure authentication flows with Clerk and Firebase</li>
                            <li>Maintained code quality through extensive testing and version control</li>
                        </ul>
                    </div>

                    <div className={styles.experienceItem}>
                        <div className={styles.experienceHeader}>
                            <div className={styles.experienceTitle}>
                                <h3 className={styles.experienceName}>Systems Specialist</h3>
                                <span className={styles.experienceSeparator}>|</span>
                                <span className={styles.experienceCompany}>Dream House, NYC</span>
                            </div>
                            <div className={styles.experiencePeriod}>2018 - 2024</div>
                        </div>
                        <ul className={styles.experienceList}>
                            <li>Engineered audio/visual systems for La Monte Young & Marian Zazeela's sound installations</li>
                            <li>Created technical documentation and conducted specialized staff training</li>
                            <li>Developed and implemented equipment maintenance protocols</li>
                            <li>Designed troubleshooting frameworks for complex audio/visual systems</li>
                        </ul>
                    </div>

                    <div className={styles.experienceItem}>
                        <div className={styles.experienceHeader}>
                            <div className={styles.experienceTitle}>
                                <h3 className={styles.experienceName}>Web Administrator</h3>
                                <span className={styles.experienceSeparator}>|</span>
                                <span className={styles.experienceCompany}>MELA (melafoundation.org), NYC</span>
                            </div>
                            <div className={styles.experiencePeriod}>2018 - 2024</div>
                        </div>
                        <ul className={styles.experienceList}>
                            <li>Maintained website codebase with direct FTP deployment</li>
                            <li>Configured PayPal integration for ticketing system and e-commerce functionality</li>
                            <li>Led digital preservation projects for archival materials acquired by Getty Institute</li>
                            <li>Recovered and migrated historical data from 1990s legacy databases</li>
                            <li>Implemented automated database backup systems</li>
                        </ul>
                    </div>

                    <div className={styles.experienceItem}>
                        <div className={styles.experienceHeader}>
                            <div className={styles.experienceTitle}>
                                <h3 className={styles.experienceName}>Content Management Specialist</h3>
                                <span className={styles.experienceSeparator}>|</span>
                                <span className={styles.experienceCompany}>High Vibe, NYC</span>
                            </div>
                            <div className={styles.experiencePeriod}>2021 - 2022</div>
                        </div>
                        <ul className={styles.experienceList}>
                            <li>Restructured WordPress site architecture with custom e-commerce components</li>
                            <li>Developed responsive email templates with advanced tracking capabilities</li>
                            <li>Automated content publishing and distribution workflows</li>
                            <li>Created comprehensive technical documentation for internal processes</li>
                        </ul>
                    </div>

                    <div className={styles.experienceItem}>
                        <div className={styles.experienceHeader}>
                            <div className={styles.experienceTitle}>
                                <h3 className={styles.experienceName}>Archivist</h3>
                                <span className={styles.experienceSeparator}>|</span>
                                <span className={styles.experienceCompany}>Yanni Posnakoff Trust, NYC</span>
                            </div>
                            <div className={styles.experiencePeriod}>2019 - 2021</div>
                        </div>
                        <ul className={styles.experienceList}>
                            <li>Built custom database system for artwork cataloging and retrieval</li>
                            <li>Developed Python scripts to automate repetitive archival tasks</li>
                            <li>Implemented data integrity validation and backup protocols</li>
                            <li>Designed standardized metadata schema for consistent cataloging</li>
                        </ul>
                    </div>

                    <div className={styles.experienceItem}>
                        <div className={styles.experienceHeader}>
                            <div className={styles.experienceTitle}>
                                <h3 className={styles.experienceName}>Music Library Technician</h3>
                                <span className={styles.experienceSeparator}>|</span>
                                <span className={styles.experienceCompany}>Columbia University Libraries</span>
                            </div>
                            <div className={styles.experiencePeriod}>2014 - 2018</div>
                        </div>
                        <ul className={styles.experienceList}>
                            <li>Supported digital preservation of rare music recordings and manuscripts</li>
                            <li>Assisted with audio digitization of specialized collection materials</li>
                            <li>Applied metadata standards for music cataloging and retrieval</li>
                            <li>Provided technical assistance to researchers and faculty</li>
                            <li>Gained database management skills while completing undergraduate studies</li>
                        </ul>
                    </div>
                </section>

                <section className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>Technical Stack</h2>

                    <div className={styles.techStackGrid}>
                        <div className={styles.techStackItem}>
                            <p className={styles.techStackHeader}>$ Core Languages & Frameworks:</p>
                            <p className={styles.techStackContent}>JavaScript, TypeScript, React, Next.js, Node.js, Python</p>
                        </div>

                        <div className={styles.techStackItem}>
                            <p className={styles.techStackHeader}>$ AI & Tools:</p>
                            <p className={styles.techStackContent}>
                                OpenAI API, Anthropic API, Vercel AI SDK, prompt engineering
                            </p>
                        </div>

                        <div className={styles.techStackItem}>
                            <p className={styles.techStackHeader}>$ Databases & Backends:</p>
                            <p className={styles.techStackContent}>Prisma, DrizzleORM, Supabase, PostgreSQL, Firebase, tRPC</p>
                        </div>

                        <div className={styles.techStackItem}>
                            <p className={styles.techStackHeader}>$ DevOps & Deployment:</p>
                            <p className={styles.techStackContent}>Vercel, Netlify, Railway, AWS S3, Git, CI/CD</p>
                        </div>

                        <div className={styles.techStackItem}>
                            <p className={styles.techStackHeader}>$ UI Libraries:</p>
                            <p className={styles.techStackContent}>Tailwind CSS, shadcn/ui, Vercel v0, Framer Motion</p>
                        </div>

                        <div className={styles.techStackItem}>
                            <p className={styles.techStackHeader}>$ API Development:</p>
                            <p className={styles.techStackContent}>Elysia, Express, tRPC</p>
                        </div>

                        <div className={styles.techStackItem}>
                            <p className={styles.techStackHeader}>$ Creative Tech:</p>
                            <p className={styles.techStackContent}>Max/MSP, Artmatic CGI, ProTools, Ableton, Adobe Creative Suite</p>
                        </div>

                        <div className={styles.techStackItem}>
                            <p className={styles.techStackHeader}>$ Other:</p>
                            <p className={styles.techStackContent}>WordPress, Excel, technical documentation, Puppeteer</p>
                        </div>
                    </div>
                </section>

                <footer className={styles.footer}>
                    <p className={styles.footerText}>

                        <span className={styles.footerDate}>Last updated: {new Date().toLocaleDateString()} | eri.dev</span>
                    </p>
                </footer>

                {/* Marian Zazeela inspired light element */}
                <div
                    className={styles.lightElement}
                    style={{
                        opacity: isLoaded ? 0.8 : 0,

                    }}
                ></div>
            </div>
        </div>
    )
}

