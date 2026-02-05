import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Lock, ChevronRight } from 'lucide-react';

// Image Imports
import eventImg from "../assets/event.jpeg";
import firstDateImg from "../assets/first date.jpeg";
import saariImg from "../assets/saari pic.jpeg";
import latestImg from "../assets/latest.jpeg";

const PASSWORD = "foreverus";

/* ---------------- Gate Component ---------------- */
/* ---------------- Timer Gate Component ---------------- */
const CountdownGate = ({ onUnlock }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const targetDate = new Date("2026-02-08T19:10:00");

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference <= 0) {
                onUnlock();
                return;
            }

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            });
        };

        const timer = setInterval(calculateTime, 1000);
        calculateTime();
        return () => clearInterval(timer);
    }, [onUnlock]);

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#020202',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Immersive Animated Background */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        top: '-20%',
                        left: '-20%',
                        width: '140%',
                        height: '140%',
                        background: 'radial-gradient(circle at center, #ff4d6d22 0%, transparent 50%), radial-gradient(circle at 70% 30%, #7209b722 0%, transparent 40%)',
                        filter: 'blur(80px)'
                    }}
                />
            </div>

            {/* Floating Particles */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 0.8, 0],
                            scale: [0, 1, 0]
                        }}
                        transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: Math.random() * 5 }}
                        style={{
                            position: 'absolute',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: '2px',
                            height: '2px',
                            background: '#fff',
                            borderRadius: '50%'
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ zIndex: 10, textAlign: 'center' }}
            >
                <h1 style={{
                    fontSize: 'clamp(2rem, 8vw, 3rem)',
                    fontWeight: '200',
                    color: '#fff',
                    letterSpacing: '12px',
                    textTransform: 'uppercase',
                    marginBottom: '1rem'
                }}>
                    Our Journey
                </h1>
                <p style={{
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '4px',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    marginBottom: '4rem'
                }}>
                    Unlocking in...
                </p>

                <div className="timer-container">
                    {[
                        { label: 'Days', value: timeLeft.days },
                        { label: 'Hours', value: timeLeft.hours },
                        { label: 'Mins', value: timeLeft.minutes },
                        { label: 'Secs', value: timeLeft.seconds }
                    ].map((t, idx) => (
                        <div key={idx} className="timer-box">
                            <motion.div
                                key={t.value}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="timer-value"
                            >
                                {String(t.value).padStart(2, '0')}
                            </motion.div>
                            <span className="timer-label">{t.label}</span>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '4rem', opacity: 0.2 }}>
                    <p style={{ color: '#fff', fontSize: '0.7rem', letterSpacing: '2px' }}>WAITING FOR OUR MOMENT</p>
                </div>
            </motion.div>

            <style>{`
                .timer-container {
                    display: flex;
                    gap: 1.5rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                .timer-box {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    padding: 1.5rem;
                    border-radius: 24px;
                    min-width: 100px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .timer-value {
                    font-size: 2.5rem;
                    font-weight: 300;
                    color: #fff;
                    margin-bottom: 0.5rem;
                }
                .timer-label {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: rgba(255, 255, 255, 0.4);
                }
                @media (max-width: 600px) {
                    .timer-container { gap: 1rem; }
                    .timer-box { min-width: 80px; padding: 1rem; }
                    .timer-value { font-size: 1.8rem; }
                }
            `}</style>
        </div>
    );
};

/* ---------------- Video Component ---------------- */
const MemoryVideo = ({ src, id, activeVideo, setActiveVideo }) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setActiveVideo(id);
                } else if (activeVideo === id) {
                    setActiveVideo(null);
                }
            },
            { threshold: 0.6 }
        );

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [id, activeVideo, setActiveVideo]);

    useEffect(() => {
        if (!videoRef.current) return;
        if (activeVideo === id) {
            videoRef.current.play().catch(err => console.log("Video play interrupted", err));
        } else {
            videoRef.current.pause();
        }
    }, [activeVideo, id]);

    return (
        <div ref={containerRef} className="video-container" style={{ position: "relative", width: "100%" }}>
            <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                style={{
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: activeVideo === id
                        ? "0 30px 80px rgba(214, 51, 132, 0.3)"
                        : "0 20px 50px rgba(0,0,0,0.15)",
                    border: activeVideo === id ? "8px solid white" : "8px solid rgba(255,255,255,0.6)",
                    position: "relative",
                    transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
            >
                <video
                    ref={videoRef}
                    src={src}
                    muted
                    loop
                    playsInline
                    style={{
                        width: "100%",
                        display: "block",
                        filter: activeVideo === id ? "grayscale(0%)" : "grayscale(30%)",
                        transition: "filter 0.5s ease"
                    }}
                />
                {!activeVideo && activeVideo !== id && (
                    <div style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0,0,0,0.1)",
                        pointerEvents: "none"
                    }} />
                )}
            </motion.div>
        </div>
    );
};

/* ---------------- Image Card Component ---------------- */
const MemoryCard = ({ src, year }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
        style={{
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
            border: "12px solid white",
            background: "white",
            position: "relative",
            paddingBottom: "2rem"
        }}
    >
        <img
            src={src}
            alt={year}
            style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "12px"
            }}
        />
        <div style={{
            position: "absolute",
            bottom: "10px",
            right: "20px",
            fontFamily: "var(--font-heading)",
            fontSize: "1.5rem",
            color: "rgba(0,0,0,0.1)",
            transform: "rotate(-5deg)"
        }}>
            {year}
        </div>
    </motion.div>
);

/* ---------------- Text Block ---------------- */
const TextBlock = ({ year, title, lines }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        style={{ padding: "1rem" }}
    >
        <span style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.2rem",
            color: "var(--rose-red)",
            fontWeight: "bold",
            letterSpacing: "4px",
            display: "block",
            marginBottom: "0.5rem"
        }}>
            {year}
        </span>
        <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "3rem",
            color: "var(--deep-rose)",
            marginBottom: "1.5rem",
            lineHeight: 1.2
        }}>
            {title}
        </h2>

        {lines.map((line, i) => (
            <p
                key={i}
                style={{
                    fontSize: "1.1rem",
                    lineHeight: "1.8",
                    marginBottom: "1rem",
                    color: "var(--text-main)",
                    opacity: 0.8
                }}
            >
                {line}
            </p>
        ))}
    </motion.div>
);

/* ---------------- Row Layout ---------------- */
const Row = ({ reverse, text, image, video, id, activeVideo, setActiveVideo }) => (
    <div
        style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "5rem",
            alignItems: "center",
            margin: "12rem auto",
            maxWidth: "1100px",
            padding: "0 2rem",
            position: "relative"
        }}
    >
        {reverse ? (
            <>
                {video ? (
                    <MemoryVideo src={video} id={id} activeVideo={activeVideo} setActiveVideo={setActiveVideo} />
                ) : (
                    <MemoryCard src={image} year={text.year} />
                )}
                <TextBlock {...text} />
            </>
        ) : (
            <>
                <div className="order-mobile-2">
                    <TextBlock {...text} />
                </div>
                <div className="order-mobile-1">
                    {video ? (
                        <MemoryVideo src={video} id={id} activeVideo={activeVideo} setActiveVideo={setActiveVideo} />
                    ) : (
                        <MemoryCard src={image} year={text.year} />
                    )}
                </div>
            </>
        )}
    </div>
);

/* ---------------- Main Page ---------------- */
export default function SpendingTime() {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [activeVideo, setActiveVideo] = useState(null);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    if (!isUnlocked) {
        return <CountdownGate onUnlock={() => setIsUnlocked(true)} />;
    }

    return (
        <div
            style={{
                backgroundColor: "var(--soft-beige)",
                minHeight: "100vh",
                position: "relative",
                overflowX: "hidden"
            }}
        >
            {/* Progress Bar */}
            <motion.div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "6px",
                    background: "var(--rose-red)",
                    transformOrigin: "0%",
                    zIndex: 1000,
                    scaleX
                }}
            />

            {/* Subtle Background Elements */}
            <motion.div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "radial-gradient(circle at 50% 50%, rgba(255, 218, 224, 0.3) 0%, transparent 70%)",
                    y: backgroundY,
                    zIndex: 0,
                    pointerEvents: "none"
                }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
                {/* INTRO */}
                <section style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                        style={{ textAlign: "center", padding: "2rem" }}
                    >
                        <span className="romantic-text" style={{ fontSize: "1.5rem", color: "var(--rose-red)" }}>Our Journey</span>
                        <h1 style={{
                            fontSize: "clamp(3rem, 10vw, 5rem)",
                            fontFamily: "var(--font-heading)",
                            color: "var(--deep-rose)",
                            marginTop: "1rem",
                            marginBottom: "1.5rem"
                        }}>
                            Moments that defined us.
                        </h1>
                        <p style={{
                            fontSize: "1.4rem",
                            maxWidth: "600px",
                            margin: "0 auto",
                            lineHeight: "1.6",
                            color: "var(--text-main)",
                            opacity: 0.7
                        }}>
                            Bas saath mein waqt guzara, aur dekho wahi waqt aaj hamari poori duniya ban gaya.
                        </p>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            style={{ marginTop: "4rem", opacity: 0.4 }}
                        >
                            <svg width="30" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                            </svg>
                            <p style={{ fontSize: "0.9rem", marginTop: "1rem" }}>Scroll to relive</p>
                        </motion.div>
                    </motion.div>
                </section>

                {/* TIMELINE */}
                <div style={{ position: "relative" }}>
                    {/* Vertical Line */}
                    <div style={{
                        position: "absolute",
                        left: "50%",
                        top: 0,
                        bottom: 0,
                        width: "1px",
                        background: "linear-gradient(to bottom, transparent, rgba(214, 51, 132, 0.2), transparent)",
                        transform: "translateX(-50%)",
                        zIndex: -1
                    }} />

                    <Row
                        text={{
                            year: "2023",
                            title: "Foundations of Us",
                            lines: [
                                "It started with small excuses to see each other.",
                                "A coffee that turned into a dinner, a walk that lasted till midnight.",
                                "We were just two people talking, unaware of what was beginning."
                            ]
                        }}
                        image={eventImg}
                    />

                    <Row
                        reverse
                        text={{
                            year: "2024",
                            title: "The Quiet Comfort",
                            lines: [
                                "The excitement of meeting turned into the comfort of staying.",
                                "We didn't need grand plans anymore.",
                                "Being together in silence became more beautiful than any conversation."
                            ]
                        }}
                        image={firstDateImg}
                    />

                    <Row
                        text={{
                            year: "2025",
                            title: "Choosing Each Other",
                            lines: [
                                "Life happened, and we chose to face it together.",
                                "Laughter in the kitchen, shared dreams at 2 AM.",
                                "Time wasn't just passing; we were building something real."
                            ]
                        }}
                        image={saariImg}
                    />

                    <Row
                        reverse
                        id="2026"
                        activeVideo={activeVideo}
                        setActiveVideo={setActiveVideo}
                        text={{
                            year: "2026",
                            title: "Infinity & Beyond",
                            lines: [
                                "Now, every second feels like home.",
                                "It's the peace of knowing you're there.",
                                "Here's to a lifetime of more moments, more time, more us."
                            ]
                        }}
                        image={latestImg} // Still passes image just in case
                        video="/videos/journey.mp4"
                    />
                </div>

            </div>

            <style>{`
                @media (max-width: 768px) {
                    .order-mobile-1 { order: 1; }
                    .order-mobile-2 { order: 2; }
                }
            `}</style>
        </div>
    );
}
