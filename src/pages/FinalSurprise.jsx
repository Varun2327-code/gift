import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Heart, Sparkles, MapPin, Music, Film, Utensils, X, Camera, Star, Coffee } from 'lucide-react';

const RosePetals = () => {
    const [petals, setPetals] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPetals(prev => [
                ...prev.slice(-25),
                {
                    id: Date.now(),
                    left: Math.random() * 100,
                    size: Math.random() * 20 + 10,
                    duration: Math.random() * 6 + 4,
                    rotate: Math.random() * 360
                }
            ]);
        }, 400);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
            {petals.map(p => (
                <motion.div
                    key={p.id}
                    initial={{ y: -20, x: `${p.left}vw`, opacity: 0, rotate: p.rotate }}
                    animate={{
                        y: '110vh',
                        opacity: [0, 1, 1, 0],
                        x: `${p.left + (Math.random() * 15 - 7.5)}vw`,
                        rotate: p.rotate + 720
                    }}
                    transition={{ duration: p.duration, ease: "linear" }}
                    style={{ position: 'absolute', fontSize: `${p.size}px`, opacity: 0.6 }}
                >
                    🌸
                </motion.div>
            ))}
        </div>
    );
};

const Coupons = () => {
    const [redeemed, setRedeemed] = useState({});

    const coupons = [
        { id: 1, title: "Romantic Dinner", desc: "A candle-lit dinner at your favorite place.", icon: <Utensils size={32} />, code: "DIN-2026", color: "#ff4d6d", category: "Dining" },
        { id: 2, title: "Movie Night", desc: "Your choice of movie, snacks are on me!", icon: <Film size={32} />, code: "MOV-L0V3", color: "#7209b7", category: "Entertainment" },
        { id: 3, title: "One Long Hug", desc: "Redeemable anytime you need extra warmth.", icon: <Heart size={32} />, code: "HUG-INF", color: "#f72585", category: "Love" },
        { id: 4, title: "Surprise Gift", desc: "A special something just for being you.", icon: <Gift size={32} />, code: "GFT-SRPR", color: "#4361ee", category: "Gift" },
        { id: 5, title: "Coffee Date", desc: "A quiet morning with our favorite brew.", icon: <Coffee size={32} />, code: "COF-AMOR", color: "#b56576", category: "Daily" },
        { id: 6, title: "Spontaneous Trip", desc: "Pack your bags, we're going somewhere!", icon: <MapPin size={32} />, code: "TRIP-NOW", color: "#2a9d8f", category: "Adventure" },
        { id: 7, title: "Serenade Session", desc: "I'll play our favorite songs just for you.", icon: <Music size={32} />, code: "MUS-SRE", color: "#f4a261", category: "Music" },
        { id: 8, title: "Midnight Walk", desc: "A walk under the stars, just us and the moon.", icon: <Star size={32} />, code: "NW-2026", color: "#2b2d42", category: "Night" },
    ];

    const toggleRedeem = (id) => {
        if (!redeemed[id]) {
            confetti({
                particleCount: 40,
                spread: 50,
                origin: { y: 0.8 },
                colors: [coupons.find(c => c.id === id).color]
            });
        }
        setRedeemed(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="coupons-grid">
            {coupons.map((c) => (
                <motion.div
                    key={c.id}
                    whileHover={{ scale: 1.05, rotate: -1, zIndex: 10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleRedeem(c.id)}
                    className={`coupon-ticket ${redeemed[c.id] ? 'is-redeemed' : ''}`}
                    style={{ '--coupon-color': c.color }}
                >
                    <div className="coupon-left">
                        <div className="coupon-icon-wrapper">
                            {c.icon}
                        </div>
                        <span className="category-tag">{c.category}</span>
                    </div>
                    <div className="coupon-divider">
                        <div className="dot top"></div>
                        <div className="line"></div>
                        <div className="dot bottom"></div>
                    </div>
                    <div className="coupon-right">
                        <div>
                            <span className="coupon-type">Valentine Special 2026</span>
                            <h3 className="coupon-title">{c.title}</h3>
                            <p className="coupon-desc">{c.desc}</p>
                        </div>
                        <div className="coupon-footer">
                            <span className="coupon-code">{c.code}</span>
                            <span className="coupon-status">{redeemed[c.id] ? 'Redeemed ✓' : 'Life time validity'}</span>
                        </div>
                    </div>

                    {/* Holographic Shine Effect */}
                    <div className="shine-overlay"></div>

                    {/* Redeemed Stamp */}
                    <AnimatePresence>
                        {redeemed[c.id] && (
                            <motion.div
                                initial={{ scale: 2, opacity: 0, rotate: -45 }}
                                animate={{ scale: 1, opacity: 1, rotate: -20 }}
                                className="redeemed-stamp"
                            >
                                KAB JANA HAI MOTI
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
            <style>{`
                .coupons-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
                    gap: 2.5rem;
                    margin-top: 3rem;
                    padding: 2rem;
                }
                .coupon-ticket {
                    display: flex;
                    height: 200px;
                    background: white;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
                    position: relative;
                    cursor: pointer;
                    transition: box-shadow 0.3s ease;
                }
                .coupon-ticket:hover {
                    box-shadow: 0 20px 50px rgba(var(--coupon-color), 0.2);
                }
                .coupon-left {
                    width: 110px;
                    background: var(--coupon-color);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    position: relative;
                    padding: 1rem;
                }
                .category-tag {
                    position: absolute;
                    bottom: 1rem;
                    font-size: 0.6rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-weight: 800;
                    opacity: 0.8;
                }
                .coupon-icon-wrapper {
                    background: rgba(255, 255, 255, 0.2);
                    padding: 1.2rem;
                    border-radius: 50%;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    margin-bottom: 1rem;
                }
                .coupon-divider {
                    width: 2px;
                    position: relative;
                    background: #f8f9fa;
                }
                .coupon-divider .dot {
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    background: var(--soft-beige);
                    border-radius: 50%;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 5;
                    box-shadow: inset 0 0 10px rgba(0,0,0,0.05);
                }
                .coupon-divider .dot.top { top: -15px; }
                .coupon-divider .dot.bottom { bottom: -15px; }
                .coupon-divider .line {
                    position: absolute;
                    top: 20px;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    border-left: 2px dashed #e9ecef;
                }
                .coupon-right {
                    flex: 1;
                    padding: 1.8rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    text-align: left;
                    background: linear-gradient(135deg, #ffffff, #fafafa);
                }
                .coupon-type {
                    font-size: 0.65rem;
                    text-transform: uppercase;
                    letter-spacing: 2.5px;
                    color: var(--coupon-color);
                    font-weight: 800;
                    margin-bottom: 0.5rem;
                    display: block;
                }
                .coupon-title {
                    font-size: 1.4rem;
                    margin: 0.4rem 0;
                    color: #2d3436;
                    font-weight: 700;
                }
                .coupon-desc {
                    font-size: 0.9rem;
                    color: #636e72;
                    margin: 0;
                    line-height: 1.5;
                }
                .coupon-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-top: 1px solid #f1f2f6;
                    padding-top: 1rem;
                }
                .coupon-code {
                    font-family: 'Courier New', monospace;
                    font-size: 0.8rem;
                    color: #b2bec3;
                    font-weight: 600;
                }
                .coupon-status {
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #00b894;
                    text-transform: uppercase;
                }
                .is-redeemed .coupon-status {
                    color: #d63031;
                }
                .is-redeemed .coupon-right {
                    opacity: 0.6;
                }

                /* Shine effect */
                .coupon-ticket:hover .shine-overlay {
                    left: 100%;
                    transition: 0.6s ease-in-out;
                }
                .shine-overlay {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(
                        to right,
                        transparent,
                        rgba(255, 255, 255, 0.3),
                        transparent
                    );
                    transform: skewX(-25deg);
                    pointer-events: none;
                }

                /* Redeemed Stamp */
                .redeemed-stamp {
                    position: absolute;
                    top: 50%;
                    right: 20%;
                    transform: translate(-50%, -50%);
                    border: 4px solid #d63031;
                    color: #d63031;
                    padding: 0.5rem 1.5rem;
                    font-size: 2rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    border-radius: 8px;
                    opacity: 0.8;
                    user-select: none;
                    pointer-events: none;
                    font-family: 'Arial Black', sans-serif;
                    background: rgba(255, 255, 255, 0.9);
                    box-shadow: 0 0 20px rgba(0,0,0,0.1);
                }

                @media (max-width: 600px) {
                    .coupons-grid { padding: 1rem; gap: 1.5rem; }
                    .coupon-ticket { height: auto; min-height: 180px; }
                    .coupon-left { width: 90px; }
                    .coupon-right { padding: 1.2rem; }
                    .coupon-title { font-size: 1.2rem; }
                    .redeemed-stamp { font-size: 1.5rem; right: 10%; }
                }
            `}</style>
        </div>
    );
};

const BucketList = () => {
    const list = [
        "Watch a sunset together in silence.",
        "Take a spontaneous road trip.",
        "Cook a new dish from scratch.",
        "Recreate our first date just for fun.",
        "Travel to a place we've never been.",
        "Build a collection of our favorite memories.",
    ];

    return (
        <div style={{ textAlign: 'left', marginTop: '3rem', padding: '2rem', background: 'rgba(255,255,255,0.5)', borderRadius: '20px' }}>
            <h3 className="romantic-text" style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--rose-red)' }}>Our Bucket List 📝</h3>
            {list.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '1.1rem' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid var(--rose-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--rose-red)', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        {i + 1}
                    </div>
                    {item}
                </div>
            ))}
        </div>
    );
};

const LoveNotes = () => {
    const notes = [
        "You are my favorite thought. ❤️",
        "Every day with you is a gift. 🎁",
        "I love the way you smile. 😊",
        "You make the world a better place. 🌍",
        "I'm so lucky to have you. ✨",
        "You're my forever and always. 💍",
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
            {notes.map((note, i) => (
                <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    style={{
                        background: '#fff9c4',
                        padding: '1.5rem',
                        borderRadius: '10px',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                        textAlign: 'center',
                        fontFamily: 'var(--font-romantic)',
                        fontSize: '1.5rem',
                        color: '#5d4037',
                        position: 'relative'
                    }}
                >
                    <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', width: '40px', height: '15px', background: 'rgba(255,255,255,0.6)', borderRadius: '2px' }}></div>
                    {note}
                </motion.div>
            ))}
        </div>
    );
};

const FinalSurprise = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isGiftOpened, setIsGiftOpened] = useState(false);
    const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
    const [isAccepted, setIsAccepted] = useState(false);
    const [activeTab, setActiveTab] = useState('main'); // 'main', 'coupons', 'bucket', 'notes'

    useEffect(() => {
        const target = new Date("2026-02-08T19:10:00");
        const interval = setInterval(() => {
            const now = new Date();
            const diff = target - now;

            if (diff <= 0) {
                setIsUnlocked(true);
                clearInterval(interval);
            } else {
                setTimeLeft({
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((diff / 1000 / 60) % 60),
                    seconds: Math.floor((diff / 1000) % 60)
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleAccept = () => {
        setIsAccepted(true);
        confetti({
            particleCount: 500,
            spread: 160,
            origin: { y: 0.6 },
            colors: ['#ffdae0', '#d63384', '#e31b23', '#d4af37'],
            backdropFilter: 'blur(5px)'
        });

        // Extra bursts
        setTimeout(() => {
            confetti({
                particleCount: 150,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
        }, 250);
        setTimeout(() => {
            confetti({
                particleCount: 150,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });
        }, 500);
    };

    const moveNoButton = () => {
        const x = Math.random() * (window.innerWidth - 200) - (window.innerWidth / 2 - 100);
        const y = Math.random() * (window.innerHeight - 200) - (window.innerHeight / 2 - 100);
        setNoButtonPos({ x, y });
    };

    return (
        <div style={{
            padding: '2rem',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            background: 'var(--soft-beige)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <RosePetals />

            <AnimatePresence mode="wait">
                {!isUnlocked ? (
                    <motion.div
                        key="countdown"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -100 }}
                        className="card glass"
                        style={{ padding: '3rem', maxWidth: '800px', width: '90%', zIndex: 10 }}
                    >
                        <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', marginBottom: '1.5rem' }}>Countdown to Love</h1>
                        <p className="romantic-text" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: 'var(--deep-rose)', marginBottom: '3rem' }}>
                            A special surprise is waiting for Devu...
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            {[
                                { label: 'Days', value: timeLeft.days },
                                { label: 'Hours', value: timeLeft.hours },
                                { label: 'Mins', value: timeLeft.minutes },
                                { label: 'Secs', value: timeLeft.seconds }
                            ].map((t, idx) => (
                                <div key={idx} style={{ textAlign: 'center' }}>
                                    <motion.div
                                        key={t.value}
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        style={{
                                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                                            fontWeight: '700',
                                            color: 'var(--rose-red)',
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            padding: '1rem',
                                            borderRadius: '15px',
                                            minWidth: '80px',
                                            boxShadow: 'var(--shadow-soft)'
                                        }}
                                    >
                                        {String(t.value).padStart(2, '0')}
                                    </motion.div>
                                    <p style={{ marginTop: '0.5rem', fontWeight: '600', color: 'var(--text-light)', fontSize: '0.9rem' }}>{t.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Demo Unlock Button */}
                        <button
                            onClick={() => setIsUnlocked(true)}
                            style={{ marginTop: '3rem', fontSize: '0.8rem', opacity: 0.3, border: 'none', background: 'none', cursor: 'pointer' }}
                        >
                            Wait for it... 🌹
                        </button>
                    </motion.div>
                ) : !isGiftOpened ? (
                    <motion.div
                        key="gift-box"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        style={{ zIndex: 10, cursor: 'pointer' }}
                        onClick={() => {
                            setIsGiftOpened(true);
                            handleSurprise(); // Initial burst
                        }}
                    >
                        <motion.div
                            animate={{ rotate: [-2, 2, -2], y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <Gift size={150} color="var(--rose-red)" strokeWidth={1.5} />
                        </motion.div>
                        <h2 className="romantic-text" style={{ marginTop: '2rem', fontSize: '2.5rem', color: 'var(--deep-rose)' }}>
                            Devu, you have a gift! 🎁
                        </h2>
                        <p style={{ opacity: 0.6, marginTop: '0.5rem' }}>Tap the box to open it</p>
                    </motion.div>
                ) : !isAccepted ? (
                    <motion.div
                        key="proposal"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{ maxWidth: '800px', zIndex: 10 }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            style={{ fontSize: '10rem', lineHeight: 1, marginBottom: '2rem' }}
                        >
                            ❤️
                        </motion.div>

                        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', margin: '1rem 0', fontWeight: '800' }}>
                            Devu, Will You Be My Valentine?
                        </h1>

                        <p className="romantic-text" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.8rem)', color: 'var(--deep-rose)', marginBottom: '3.5rem', lineHeight: 1.5, padding: '0 1rem' }}>
                            "Har dharkan mein tum ho, har saans mein tumhara naam... <br />
                            Zindagi ke har raste par, chahiye mujhe sirf tumhara saath."
                        </p>

                        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleAccept}
                                style={{
                                    padding: '1.5rem 4rem',
                                    fontSize: '1.5rem',
                                    background: 'linear-gradient(45deg, var(--rose-red), var(--deep-rose))',
                                    color: 'white',
                                    borderRadius: '50px',
                                    fontWeight: '700',
                                    boxShadow: '0 10px 40px rgba(227, 27, 35, 0.4)',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                YES! ❤️
                            </motion.button>

                            <motion.button
                                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                                onMouseEnter={moveNoButton}
                                onClick={moveNoButton}
                                style={{
                                    padding: '1.2rem 3rem',
                                    fontSize: '1.2rem',
                                    background: 'white',
                                    color: 'var(--text-light)',
                                    borderRadius: '50px',
                                    border: '2px solid #ddd',
                                    cursor: 'not-allowed'
                                }}
                            >
                                NO ☹️
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="celebration"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ maxWidth: '900px', padding: '2rem', zIndex: 10, width: '100%' }}
                    >
                        <AnimatePresence mode="wait">
                            {activeTab === 'main' ? (
                                <motion.div key="main-celebration" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            rotate: [0, 10, -10, 0]
                                        }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                        style={{ fontSize: '8rem' }}
                                    >
                                        💍
                                    </motion.div>

                                    <h1 className="romantic-text" style={{ fontSize: 'clamp(3rem, 10vw, 5.5rem)', color: 'var(--rose-red)', margin: '2rem 0' }}>
                                        It's a Forever Deal! ❤️
                                    </h1>

                                    <div className="card glass" style={{ padding: '3rem', borderRadius: '30px' }}>
                                        <p className="romantic-text" style={{ fontSize: '1.8rem', lineHeight: 1.6, color: '#444' }}>
                                            "Tum meri har khushi ka raaz ho, meri har dua ki awaaz ho.<br />
                                            Happy Valentine's Day, my soulmate, my Devu!"
                                        </p>

                                        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                onClick={() => setActiveTab('coupons')}
                                                style={{ background: 'var(--blush-pink)', color: 'var(--deep-rose)', padding: '1rem 1.5rem', borderRadius: '30px', fontWeight: 'bold' }}
                                            >
                                                Love Coupons 🎁
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                onClick={() => setActiveTab('bucket')}
                                                style={{ background: 'var(--white)', border: '2px solid var(--blush-pink)', color: 'var(--deep-rose)', padding: '1rem 1.5rem', borderRadius: '30px', fontWeight: 'bold' }}
                                            >
                                                Bucket List 📝
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                onClick={() => setActiveTab('notes')}
                                                style={{ background: 'var(--rose-red)', color: 'white', padding: '1rem 1.5rem', borderRadius: '30px', fontWeight: 'bold' }}
                                            >
                                                Love Notes ✨
                                            </motion.button>
                                        </div>

                                        <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--blush-pink)', paddingTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                                            <Sparkles color="var(--rose-red)" />
                                            <Heart fill="var(--rose-red)" color="var(--rose-red)" />
                                            <Sparkles color="var(--rose-red)" />
                                        </div>
                                    </div>
                                </motion.div>
                            ) : activeTab === 'coupons' ? (
                                <motion.div key="coupons" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                        <h2 className="romantic-text" style={{ fontSize: '3rem', color: 'var(--deep-rose)' }}>Love Coupons</h2>
                                        <button onClick={() => setActiveTab('main')} style={{ background: 'rgba(0,0,0,0.05)', borderRadius: '50%', padding: '0.5rem' }}><X size={24} /></button>
                                    </div>
                                    <p style={{ opacity: 0.7 }}>Tap to see your special dates. Valid forever!</p>
                                    <Coupons />
                                </motion.div>
                            ) : activeTab === 'bucket' ? (
                                <motion.div key="bucket" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                        <h2 className="romantic-text" style={{ fontSize: '3rem', color: 'var(--deep-rose)' }}>Our Bucket List</h2>
                                        <button onClick={() => setActiveTab('main')} style={{ background: 'rgba(0,0,0,0.05)', borderRadius: '50%', padding: '0.5rem' }}><X size={24} /></button>
                                    </div>
                                    <p style={{ opacity: 0.7 }}>Adventures I want to share with you.</p>
                                    <BucketList />
                                </motion.div>
                            ) : (
                                <motion.div key="notes" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                        <h2 className="romantic-text" style={{ fontSize: '3rem', color: 'var(--deep-rose)' }}>Love Notes</h2>
                                        <button onClick={() => setActiveTab('main')} style={{ background: 'rgba(0,0,0,0.05)', borderRadius: '50%', padding: '0.5rem' }}><X size={24} /></button>
                                    </div>
                                    <p style={{ opacity: 0.7 }}>Small reminders of why I love you.</p>
                                    <LoveNotes />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <p style={{ marginTop: '3rem', fontSize: '1.1rem', opacity: 0.6, fontStyle: 'italic' }}>
                            I love you more than words can ever express. Forever and always.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const handleSurprise = () => {
    confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffdae0', '#d63384', '#e31b23', '#d4af37']
    });
};

export default FinalSurprise;
