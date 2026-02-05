import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, ShieldCheck, ChevronRight } from 'lucide-react';

// Import images from assets
import firstDateImg from '../assets/first date.jpeg';
import funnyImg from '../assets/funny.png';
import musicNightImg from '../assets/music night.jpeg';
import handDilImg from '../assets/hand dil.jpeg';
import navaratiImg from '../assets/navarati.jpeg';
import saariImg from '../assets/saari pic.jpeg';
import outsideImg from '../assets/outside.jpeg';
import thirtyFirstImg from '../assets/31st.jpeg';
import chocolateImg from '../assets/first gift.jpeg';

const PIN_CODE = "2327";

/* ---------------- PIN Code Gate Component ---------------- */
const PinCodeGate = ({ onUnlocked }) => {
    const [pin, setPin] = useState("");
    const [error, setError] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const handleKeyPress = (num) => {
        if (pin.length < 4) {
            const newPin = pin + num;
            setPin(newPin);
            if (newPin.length === 4) {
                if (newPin === PIN_CODE) {
                    onUnlocked();
                } else {
                    setError(true);
                    setTimeout(() => {
                        setPin("");
                        setError(false);
                    }, 500);
                }
            }
        }
    };

    const handleDelete = () => {
        setPin(pin.slice(0, -1));
    };



    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000',
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            overflow: 'hidden',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
        }}>
            {/* iOS Style Background Blur */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 20, repeat: Infinity }}
                    style={{
                        position: 'absolute',
                        inset: '-10%',
                        background: 'radial-gradient(circle at 30% 20%, #4a1d24 0%, #000 60%), radial-gradient(circle at 70% 80%, #2d1b4a 0%, #000 60%)',
                        filter: 'blur(100px)'
                    }}
                />
            </div>

            <div style={{ zIndex: 10, width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h2 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '400', marginBottom: '2rem', letterSpacing: '0.5px' }}>
                        Enter Passcode
                    </h2>

                    <motion.div
                        animate={error ? { x: [-15, 15, -15, 15, 0] } : {}}
                        transition={{ duration: 0.4 }}
                        style={{ display: 'flex', gap: '22px', justifyContent: 'center' }}
                    >
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    width: '13px',
                                    height: '13px',
                                    borderRadius: '50%',
                                    border: '1.5px solid #fff',
                                    background: pin.length > i ? '#fff' : 'transparent',
                                    boxShadow: pin.length > i ? '0 0 10px rgba(255,255,255,0.5)' : 'none',
                                    transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                }}
                            />
                        ))}
                    </motion.div>
                </motion.div>

                <div className="ios-numpad">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <motion.button
                            key={num}
                            whileTap={{ backgroundColor: 'rgba(255,255,255,0.4)', transition: { duration: 0.1 } }}
                            onClick={() => handleKeyPress(num.toString())}
                            className="ios-btn"
                        >
                            <span className="num">{num}</span>

                        </motion.button>
                    ))}
                    <div className="ios-btn-placeholder" /> {/* Empty spot for grid */}
                    <motion.button
                        whileTap={{ backgroundColor: 'rgba(255,255,255,0.4)', transition: { duration: 0.1 } }}
                        onClick={() => handleKeyPress("0")}
                        className="ios-btn"
                    >
                        <span className="num">0</span>
                    </motion.button>
                    <button
                        onClick={handleDelete}
                        className="ios-text-btn"
                        style={{ opacity: pin.length > 0 ? 1 : 0 }}
                    >
                        Delete
                    </button>
                </div>

                <div style={{ marginTop: '5rem' }}>
                    <button onClick={() => setShowHint(!showHint)} className="ios-hint-toggle">
                        {showHint ? "Hide Hint" : "Emergency"}
                    </button>
                    <AnimatePresence>
                        {showHint && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginTop: '1rem', textAlign: 'center' }}
                            >
                                Hint: Date of birth moti.
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <style>{`
                .ios-numpad {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem 1.8rem;
                    justify-items: center;
                }
                .ios-btn {
                    width: 75px;
                    height: 75px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.12);
                    border: none;
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: background 0.2s;
                    -webkit-tap-highlight-color: transparent;
                }
                .ios-btn .num {
                    font-size: 2.2rem;
                    font-weight: 300;
                    line-height: 1;
                }

                .ios-text-btn {
                    background: none;
                    border: none;
                    color: #fff;
                    font-size: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: opacity 0.2s;
                }
                .ios-btn-placeholder { width: 75px; height: 75px; }
                .ios-hint-toggle {
                    background: none;
                    border: none;
                    color: #fff;
                    font-size: 1.1rem;
                    font-weight: 500;
                    cursor: pointer;
                }
                @media (max-width: 400px) {
                    .ios-btn { width: 70px; height: 70px; }
                    .ios-btn .num { font-size: 2rem; }
                }
            `}</style>
        </div>
    );
};

const allImages = [
    firstDateImg, funnyImg, musicNightImg, handDilImg,
    navaratiImg, saariImg, outsideImg, thirtyFirstImg, chocolateImg
];

const memories = [
    {
        mood: '#fde2e4',
        image: firstDateImg,
        lines: [
            "It was a simple day…",
            "Nothing special was planned.",
            "But somehow, being with you felt enough.",
            "That’s when I realized—this is home."
        ],
        end: "Not every memory is loud. Some just stay forever 🤍"
    },
    {
        mood: '#e0fbfc',
        image: funnyImg,
        lines: [
            "We laughed way too much that day.",
            "Even the smallest things felt funny.",
            "I don’t remember the jokes anymore…",
            "But I remember the way you smiled."
        ],
        end: "Happiness sounds like your laugh 😌"
    },
    {
        mood: '#ede7f6',
        image: musicNightImg,
        lines: [
            "It was late.",
            "The world was quiet.",
            "Our conversation wasn’t.",
            "That night changed something between us."
        ],
        end: "Some talks bring hearts closer 💬❤️"
    },
    {
        mood: '#fff1c1',
        image: handDilImg,
        lines: [
            "We didn’t say much.",
            "No photos. No proof.",
            "Just presence.",
            "And somehow, that was everything."
        ],
        end: "Silence can be a memory too ✨"
    }
];

export default function OneMinuteMemory() {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [active, setActive] = useState(null);
    const [step, setStep] = useState(0);
    const [running, setRunning] = useState(false);

    const start = () => {
        const pick = memories[Math.floor(Math.random() * memories.length)];
        setActive(pick);
        setStep(0);
        setRunning(true);
    };

    useEffect(() => {
        if (!running) return;

        if (step < 4) {
            const timer = setTimeout(() => setStep(s => s + 1), 6000);
            return () => clearTimeout(timer);
        }
    }, [step, running]);

    if (!isUnlocked) {
        return <PinCodeGate onUnlocked={() => setIsUnlocked(true)} />;
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                background: active?.mood || 'var(--soft-beige)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 2s ease',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div style={{ textAlign: 'center', maxWidth: '800px', width: '100%', zIndex: 10 }}>
                {!running ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', color: 'var(--deep-rose)' }}>One-Minute Memory ⏱️</h1>
                        <p className="romantic-text" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
                            Let time pick a special moment for us
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.1, boxShadow: 'var(--shadow-medium)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={start}
                            style={{
                                padding: '1.2rem 3rem',
                                borderRadius: '50px',
                                background: 'linear-gradient(45deg, var(--rose-red), var(--deep-rose))',
                                color: 'white',
                                border: 'none',
                                fontSize: '1.2rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Start the Magic
                        </motion.button>
                    </motion.div>
                ) : (
                    <div style={{ position: 'relative' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${active.mood}-${step}`}
                                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                                transition={{ duration: 1.5 }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '2rem'
                                }}
                            >
                                {allImages[step % allImages.length] && (
                                    <motion.div
                                        key={step}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 1 }}
                                        style={{
                                            width: '100%',
                                            maxWidth: '550px',
                                            height: '400px',
                                            borderRadius: '15px',
                                            overflow: 'hidden',
                                            boxShadow: 'var(--shadow-medium)',
                                            border: '10px solid white',
                                            transform: `rotate(${step % 2 === 0 ? '-3deg' : '3deg'})`,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#f0f0f0'
                                        }}
                                    >
                                        <img
                                            src={allImages[step % allImages.length]}
                                            alt="Memory"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                imageRendering: 'auto'
                                            }}
                                        />
                                    </motion.div>
                                )}

                                <div style={{ minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <h2 className="romantic-text" style={{
                                        fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                                        color: '#333',
                                        maxWidth: '600px',
                                        lineHeight: '1.4'
                                    }}>
                                        {step < active.lines.length
                                            ? active.lines[step]
                                            : active.end}
                                    </h2>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}

                {step >= (active?.lines.length || 0) && running && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => { setRunning(false); setStep(0); }}
                        style={{
                            marginTop: '3rem',
                            background: 'white',
                            border: '2px solid var(--rose-red)',
                            color: 'var(--rose-red)',
                            padding: '0.8rem 2rem',
                            borderRadius: '30px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        Relive Another Moment
                    </motion.button>
                )}
            </div>

            {/* Floating particles for atmosphere */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                <AnimatePresence>
                    {running && [1, 2, 3, 4, 5].map(i => (
                        <motion.div
                            key={i}
                            initial={{ y: '100vh', opacity: 0 }}
                            animate={{ y: '-10vh', opacity: [0, 0.5, 0] }}
                            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 2 }}
                            style={{
                                position: 'absolute',
                                left: `${i * 20}%`,
                                color: 'rgba(255,255,255,0.5)'
                            }}
                        >
                            <Heart size={20 + i * 5} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
