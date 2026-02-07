import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Play, Lock, Clock, Calendar } from 'lucide-react';

import { useState, useEffect } from 'react';

const TextRain = () => {
    const [drops, setDrops] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const contents = ["Lbuuu", "👀", "❤️", "Lbuuu", "❤️", "Motiii"];
            const newDrop = {
                id: Date.now(),
                left: Math.random() * 100,
                content: contents[Math.floor(Math.random() * contents.length)],
                duration: Math.random() * 5 + 5,
                delay: Math.random() * 2,
                size: Math.random() * 1.5 + 0.8
            };
            setDrops(prev => [...prev.slice(-20), newDrop]);
        }, 600);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
            {drops.map(drop => (
                <motion.div
                    key={drop.id}
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: '110vh', opacity: [0, 0.4, 0.4, 0] }}
                    transition={{ duration: drop.duration, delay: drop.delay, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        left: `${drop.left}%`,
                        fontSize: `${drop.size}rem`,
                        color: 'var(--rose-red)',
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                        filter: 'blur(0.5px)'
                    }}
                >
                    {drop.content}
                </motion.div>
            ))}
        </div>
    );
};

const Landing = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState('hero'); // hero, countdown, passcode
    const [passcodeInput, setPasscodeInput] = useState('');
    const [isError, setIsError] = useState(false);

    // Config
    const TARGET_DATE = new Date("2026-02-07T18:20:00");
    const PASSWORD = "DEVU";

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date();
            const difference = TARGET_DATE - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        const timer = setInterval(calculateTime, 1000);
        calculateTime();
        return () => clearInterval(timer);
    }, []);

    const handleStartClick = () => {
        const now = new Date();
        if (now < TARGET_DATE) {
            setStep('countdown');
        } else {
            setStep('passcode');
        }
    };

    const handlePasscodeSubmit = () => {
        if (passcodeInput.trim().toLowerCase() === PASSWORD.toLowerCase()) {
            navigate('/story');
        } else {
            setIsError(true);
            setTimeout(() => {
                setPasscodeInput('');
                setIsError(false);
            }, 1000);
        }
    };

    return (
        <div className="landing-container" style={{
            height: '100vh',
            width: '100vw',
            background: '#020202',
            position: 'relative',
            overflow: 'hidden',
            color: '#fff'
        }}>
            <TextRain />

            <AnimatePresence mode="wait">
                {step === 'hero' && (
                    <motion.div
                        key="hero"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 1 }}
                        style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            padding: '2rem',
                            zIndex: 1
                        }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 6, repeat: Infinity }}
                        >
                            <h1 style={{
                                fontSize: 'clamp(3.5rem, 12vw, 7rem)',
                                fontWeight: '800',
                                letterSpacing: '-2px',
                                background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                marginBottom: '1rem'
                            }}>
                                For You Devu
                            </h1>
                        </motion.div>

                        <p style={{
                            fontSize: 'clamp(1rem, 3vw, 1.4rem)',
                            opacity: 0.6,
                            maxWidth: '600px',
                            margin: '1rem auto 3rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px'
                        }}>
                            "Every line of code holds a piece of my heart"
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleStartClick}
                            style={{
                                padding: '1.2rem 4rem',
                                fontSize: '1.2rem',
                                background: 'var(--rose-red, #ff4d6d)',
                                color: 'white',
                                borderRadius: '100px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '700',
                                boxShadow: '0 15px 35px rgba(255, 77, 109, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}
                        >
                            Start Our Journey <Heart fill="white" size={20} />
                        </motion.button>
                    </motion.div>
                )}

                {step === 'countdown' && (
                    <motion.div
                        key="countdown"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -50 }}
                        style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1,
                            padding: '2rem'
                        }}
                    >
                        <Calendar size={48} style={{ marginBottom: '2rem', opacity: 0.3 }} />
                        <h2 style={{ fontSize: '1.5rem', letterSpacing: '8px', textTransform: 'uppercase', opacity: 0.5, marginBottom: '3rem' }}>
                            Wait for our moment
                        </h2>

                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {[
                                { label: 'Days', val: timeLeft.days },
                                { label: 'Hours', val: timeLeft.hours },
                                { label: 'Mins', val: timeLeft.minutes },
                                { label: 'Secs', val: timeLeft.seconds }
                            ].map((t, i) => (
                                <div key={i} style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    padding: '1.5rem',
                                    borderRadius: '24px',
                                    minWidth: '100px',
                                    textAlign: 'center',
                                    border: '1px solid rgba(255,255,255,0.08)'
                                }}>
                                    <div style={{ fontSize: '2.5rem', fontWeight: '200' }}>{String(t.val).padStart(2, '0')}</div>
                                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.4, marginTop: '0.5rem' }}>{t.label}</div>
                                </div>
                            ))}
                        </div>

                        {new Date() >= TARGET_DATE && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onClick={() => setStep('passcode')}
                                style={{
                                    marginTop: '4rem',
                                    background: 'none',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    color: '#fff',
                                    padding: '0.8rem 2rem',
                                    borderRadius: '100px',
                                    cursor: 'pointer'
                                }}
                            >
                                Continue to Gate
                            </motion.button>
                        )}
                    </motion.div>
                )}

                {step === 'passcode' && (
                    <motion.div
                        key="passcode"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1,
                            padding: '2rem'
                        }}
                    >
                        <motion.div
                            animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
                            transition={{ duration: 0.4 }}
                            style={{ textAlign: 'center' }}
                        >
                            <Lock size={32} style={{ marginBottom: '2rem', opacity: 0.5 }} />
                            <h2 style={{
                                fontStyle: 'italic',
                                fontFamily: "'Playfair Display', serif",
                                fontSize: '2rem',
                                marginBottom: '3rem'
                            }}>
                                Tell me our secret word.
                            </h2>

                            <div style={{ position: 'relative', maxWidth: '300px', width: '100%' }}>
                                <input
                                    type="password"
                                    autoFocus
                                    value={passcodeInput}
                                    onChange={(e) => setPasscodeInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handlePasscodeSubmit()}
                                    placeholder="••••••••"
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        borderBottom: '1px solid rgba(255,255,255,0.2)',
                                        color: '#fff',
                                        fontSize: '1.5rem',
                                        width: '100%',
                                        textAlign: 'center',
                                        outline: 'none',
                                        padding: '1rem 0',
                                        letterSpacing: '8px'
                                    }}
                                />
                                <motion.button
                                    onClick={handlePasscodeSubmit}
                                    style={{
                                        position: 'absolute',
                                        right: '0',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        color: '#fff',
                                        cursor: 'pointer',
                                        opacity: passcodeInput.length > 0 ? 0.8 : 0
                                    }}
                                >
                                    <Play size={24} />
                                </motion.button>
                            </div>
                            <p style={{ marginTop: '2rem', fontSize: '0.8rem', opacity: 0.3 }}>Unlock the memories</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ambient Background Glows */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, 30, 0],
                    y: [0, 20, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    background: 'radial-gradient(circle at 10% 20%, rgba(255, 154, 158, 0.1) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(250, 208, 196, 0.1) 0%, transparent 40%)'
                }}
            />
            {/* Floating Decorative Elements */}
            <motion.div
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '10%',
                    opacity: 0.3
                }}
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 360]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <Heart size={40} color="var(--blush-pink)" />
            </motion.div>

            <motion.div
                style={{
                    position: 'absolute',
                    top: '15%',
                    right: '15%',
                    opacity: 0.2
                }}
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -360]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <Sparkles size={50} color="var(--deep-rose)" />
            </motion.div>
        </div>
    );
};

export default Landing;
