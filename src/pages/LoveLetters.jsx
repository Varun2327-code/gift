import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen, Lock, ShieldCheck } from 'lucide-react';

/* ---------------- Pattern Lock Component ---------------- */
const PatternLockGate = ({ onUnlocked }) => {
    const [activeNodes, setActiveNodes] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [error, setError] = useState(false);
    const containerRef = useRef(null);

    // The correct pattern: An 'L' shape (0-3-6-7-8)
    const CORRECT_PATTERN = [0, 3, 6, 7, 8];

    const getIdentifier = (e) => {
        if (!containerRef.current) return null;
        const rect = containerRef.current.getBoundingClientRect();
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const nodes = containerRef.current.querySelectorAll('.node-inner');
        for (let i = 0; i < nodes.length; i++) {
            const nodeRect = nodes[i].getBoundingClientRect();
            const nx = nodeRect.left - rect.left + nodeRect.width / 2;
            const ny = nodeRect.top - rect.top + nodeRect.height / 2;
            const distance = Math.sqrt((x - nx) ** 2 + (y - ny) ** 2);

            if (distance < 35) return i;
        }
        return null;
    };

    const handleStart = (e) => {
        setError(false);
        const id = getIdentifier(e);
        if (id !== null) {
            setActiveNodes([id]);
            setIsDrawing(true);
        }
    };

    const handleMove = (e) => {
        if (!isDrawing) return;
        const id = getIdentifier(e);
        if (id !== null && !activeNodes.includes(id)) {
            setActiveNodes(prev => [...prev, id]);
        }
    };

    const handleEnd = () => {
        if (!isDrawing) return;
        setIsDrawing(false);

        if (JSON.stringify(activeNodes) === JSON.stringify(CORRECT_PATTERN)) {
            onUnlocked();
        } else {
            setError(true);
            setTimeout(() => {
                setActiveNodes([]);
                setError(false);
            }, 600);
        }
    };

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0a0a0a',
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            overflow: 'hidden'
        }}>
            {/* Background Glow */}
            <motion.div
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(255, 77, 109, 0.15) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    zIndex: 0
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ zIndex: 1, textAlign: 'center' }}
            >
                <div style={{ marginBottom: '3rem' }}>
                    <motion.div
                        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                        style={{
                            width: '60px',
                            height: '60px',
                            margin: '0 auto 1.5rem',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <ShieldCheck color={error ? "#ff4d6d" : "rgba(255,255,255,0.4)"} size={30} />
                    </motion.div>
                    <h2 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '300', letterSpacing: '4px', textTransform: 'uppercase' }}>
                        Draw the pattern
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                        Hint: A sign of 'L'ove
                    </p>
                </div>

                <div
                    ref={containerRef}
                    onMouseDown={handleStart}
                    onMouseMove={handleMove}
                    onMouseUp={handleEnd}
                    onTouchStart={handleStart}
                    onTouchMove={handleMove}
                    onTouchEnd={handleEnd}
                    style={{
                        position: 'relative',
                        width: '320px',
                        height: '320px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '40px',
                        padding: '40px',
                        background: 'rgba(255,255,255,0.02)',
                        borderRadius: '40px',
                        border: '1px solid rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(20px)',
                        touchAction: 'none'
                    }}
                >
                    {/* SVG Lines */}
                    <svg style={{
                        position: 'absolute',
                        top: 0, left: 0, width: '100%', height: '100%',
                        pointerEvents: 'none',
                        zIndex: 1
                    }}>
                        {activeNodes.map((nodeIdx, i) => {
                            if (i === 0) return null;
                            const prevIdx = activeNodes[i - 1];
                            const x1 = (prevIdx % 3) * 100 + 60;
                            const y1 = Math.floor(prevIdx / 3) * 100 + 60;
                            const x2 = (nodeIdx % 3) * 100 + 60;
                            const y2 = Math.floor(nodeIdx / 3) * 100 + 60;

                            return (
                                <motion.line
                                    key={`${i}-${nodeIdx}`}
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    x1={x1} y1={y1} x2={x2} y2={y2}
                                    stroke={error ? "#ff4d6d" : "var(--rose-red)"}
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                            );
                        })}
                    </svg>

                    {[...Array(9)].map((_, i) => (
                        <div
                            key={i}
                            className="node"
                            style={{
                                width: '100%',
                                aspectRatio: '1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                zIndex: 2
                            }}
                        >
                            <motion.div
                                className="node-inner"
                                animate={{
                                    scale: activeNodes.includes(i) ? 1.5 : 1,
                                    background: activeNodes.includes(i)
                                        ? (error ? "#ff4d6d" : "var(--rose-red)")
                                        : "rgba(255,255,255,0.15)"
                                }}
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    boxShadow: activeNodes.includes(i)
                                        ? `0 0 20px ${error ? "#ff4d6d" : "var(--rose-red)"}`
                                        : 'none'
                                }}
                            />
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

/* ---------------- Letter Component ---------------- */
const Letter = ({ title, content, date, isLocked, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
            style={{ position: 'relative', margin: '1.5rem' }}
        >
            <motion.div
                whileHover={!isLocked ? {
                    scale: 1.05,
                    rotate: index % 2 === 0 ? 2 : -2,
                    y: -10,
                    transition: { type: "spring", stiffness: 300, damping: 15 }
                } : {}}
                whileTap={!isLocked ? { scale: 0.95 } : {}}
                onClick={() => !isLocked && setIsOpen(true)}
                className="letter-card"
                style={{
                    width: '300px',
                    height: '240px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isLocked ? 'rgba(0,0,0,0.02)' : 'white',
                    cursor: isLocked ? 'not-allowed' : 'pointer',
                    border: '1.5px solid rgba(214, 51, 132, 0.1)',
                    borderRadius: '24px',
                    position: 'relative',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    padding: '1rem',
                    textAlign: 'center'
                }}
            >
                {/* Decorative Pattern */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, height: '6px',
                    background: 'linear-gradient(90deg, var(--rose-red), var(--blush-pink))',
                    borderRadius: '24px 24px 0 0'
                }} />

                {isLocked ? (
                    <>
                        <div style={{ opacity: 0.3 }}>
                            <Lock size={40} color="var(--text-light)" />
                        </div>
                        <p style={{ marginTop: '1.5rem', color: '#999', fontSize: '0.8rem', letterSpacing: '1px' }}>UNLOCKS ON</p>
                        <p style={{ color: 'var(--rose-red)', fontWeight: '600' }}>{date}</p>
                    </>
                ) : (
                    <>
                        <motion.div
                            animate={{
                                y: [0, -8, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            style={{
                                width: '60px',
                                height: '60px',
                                background: 'rgba(255, 77, 109, 0.05)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem'
                            }}
                        >
                            <Mail size={32} color="var(--rose-red)" strokeWidth={1.5} />
                        </motion.div>
                        <h3 className="romantic-text" style={{ fontSize: '1.5rem', color: 'var(--deep-rose)', marginBottom: '0.5rem' }}>{title}</h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', opacity: 0.6 }}>{date}</p>
                    </>
                )}
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(10, 10, 10, 0.8)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 3000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1rem'
                        }}
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            style={{
                                background: '#fff',
                                padding: 'clamp(1.5rem, 5vw, 3.5rem)',
                                maxWidth: '650px',
                                width: '100%',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                borderRadius: '32px',
                                boxShadow: '0 50px 100px rgba(0,0,0,0.5)',
                                color: '#2d3436',
                                position: 'relative'
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '25px',
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    color: '#ccc'
                                }}
                            >
                                ×
                            </button>

                            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                <MailOpen size={40} color="var(--rose-red)" style={{ marginBottom: '1rem', opacity: 0.2 }} />
                                <p style={{ fontSize: '0.8rem', letterSpacing: '2px', color: '#999', textTransform: 'uppercase' }}>{date}</p>
                                <h2 className="romantic-text" style={{ fontSize: '2.5rem', color: 'var(--deep-rose)', marginTop: '0.5rem' }}>{title}</h2>
                            </div>

                            <div style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '1.1rem',
                                lineHeight: '1.8',
                                color: '#444',
                                whiteSpace: 'pre-line'
                            }}>
                                {content}
                            </div>

                            <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #f0f0f0', textAlign: 'center' }}>
                                <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>With all my love,</p>
                                <p style={{ fontSize: '1.8rem', color: 'var(--deep-rose)', fontFamily: 'var(--font-romantic)' }}>Me ❤️</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

/* ---------------- Main Page ---------------- */
const LoveLetters = () => {
    const [isUnlocked, setIsUnlocked] = useState(false);

    const letters = [
        {
            title: "The Beginning",
            date: "Feb 10, 2026",
            content: "I still remember the first time I saw you during Navarati. Everything seemed brighter then, but it was our first talk that really changed everything for me.\n\n\"Tumse milkar aisa laga jaise koi purani dua qabool ho gayi ho. Tumhari ek smile hi kafi hai mera din banane ke liye.\"\n\nThank you for walking into my life and making it beautiful.",
            isLocked: false
        },
        {
            title: "Why I Love You",
            date: "Feb 11, 2026",
            content: "I love the way you laugh at my silly jokes. I love how you always know when I need a hug. Most of all, I love the person I am when I'm with you.\n\n\"Teri saadgi, teri baatein, tera mujhse yun ruthna... har ada par dil fida hai.\"\n\nYou are my home, my peace, and my greatest adventure.",
            isLocked: false
        },
        {
            title: "Our Future",
            date: "Feb 12, 2026",
            content: "I dream of all the places we'll go and the things we'll do. Every tomorrow looks beautiful because I see you in it.\n\n\"Hath thama hai toh sath nibhayenge, tum jahan jaoge hum wahin milenge.\"\n\nI can't wait to build a lifetime of memories with you.",
            isLocked: false
        },
        {
            title: "A Secret Note",
            date: "Feb 13, 2026",
            content: "From our endless video calls and late-night chatting to spending quiet time together in the garden and all our crazy night outs—every moment is a treasure.\n\n\"Log kehte hain mohabbat ek baar hoti hai, par mujhe toh tumse har roz hoti hai.\"\n\nYou are the secret ingredient to my happiness.",
            isLocked: false
        },
        {
            title: "Valentine's Day",
            date: "Feb 14, 2026",
            content: "Today is our day! My heart is full of love for you. I have so much planned, but most of all, I plan to love you even more today than I did yesterday.\n\n\"Main aur meri tanhai aksar ye baatein karte hain... ki tum na hote toh zindagi kaisi hoti. Shukriya meri zindagi mein aane ke liye.\"\n\nHappy Valentine's Day, my love! ❤️",
            isLocked: false
        }
    ];

    if (!isUnlocked) {
        return <PatternLockGate onUnlocked={() => setIsUnlocked(true)} />;
    }

    return (
        <div style={{ padding: '8rem 2rem 4rem', minHeight: '100vh', backgroundColor: 'var(--soft-beige)' }}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ textAlign: 'center', marginBottom: '5rem' }}
            >
                <span style={{ color: 'var(--rose-red)', fontWeight: '600', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Private Collection</span>
                <h1 style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)', fontWeight: '700', letterSpacing: '-1px', color: 'var(--deep-rose)', marginTop: '1rem' }}>Love Letters</h1>
                <div style={{
                    width: '60px',
                    height: '3px',
                    background: 'var(--rose-red)',
                    margin: '1.5rem auto',
                    borderRadius: '2px'
                }} />
                <p className="romantic-text" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.1rem)', color: 'var(--text-main)' }}>Words from the heart, just for you</p>
            </motion.div>

            <motion.div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '1rem'
                }}
            >
                {letters.map((l, i) => (
                    <Letter key={i} {...l} index={i} />
                ))}
            </motion.div>
        </div>
    );
};

export default LoveLetters;
