import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Moon, Sparkles, Wind, Eye, Play, Delete, Volume2, VolumeX, Music } from 'lucide-react';

/* ================= CONFIG ================= */
const PASSWORD = "bubudaa";

const memories = [
    { id: 1, year: "2023", title: "The Beginning", text: "Sab kuch ek pal mein badal gaya jab humne pehli baar baat ki." },
    { id: 2, year: "2024", title: "Growing Closer", text: "Har ek din humari dosti aur gehri hoti gayi." },
    { id: 3, year: "2025", title: "The Connection", text: "Waqt beet gaya par humari baatein kabhi khatam nahi hui." },
    { id: 4, year: "2026", title: "The Promise", text: "Hamesha wala saath, jo sadiyon tak chalega." }
];

const whispers = [
    "Tumhare bina har ek shaam adhuri lagti hai.",
    "Shaam ka mausam, garden ki hawa, aur tum… saath milke bani chaat.",
    "Chaat thodi teekhi hai, par tumhari muskaan usse bhi zyada.",
    "Garden ke bench pe baith ke, waqt bina bole hi beet jaata hai.",
    "Tumhare haath se li hui chaat aur bhi zyada tasty lagti hai.",
    "Bas thoda aur waqt... tumhare saath.",
    "Tum meri zindagi ka wo ek raaz ho jo main sabko batana chahta hoon.",
    "Mujhe tumhara saath nahi, tum chahiye — hamesha.",
    "Tumhari aadat lag chuki hai… aur yeh aadat mujhe pasand hai.",
    "Tum sirf pyaar nahi, mera sukoon ho.",
    "Tum paas aate ho aur focus chala jaata hai.",
    "Iss kamre mein sab kuch fast ho jaata hai jab tum paas hoti ho.",
    "Bas ek raat… jahan waqt hum dono ke liye ruk jaaye."



];

/* ================= COMPONENTS ================= */

const AuroraBackground = () => (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: '#020202', overflow: 'hidden' }}>
        <motion.div
            animate={{
                background: [
                    'radial-gradient(circle at 20% 20%, #1a0b2e 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 80%, #2d0b16 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 80%, #0b1a2e 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 20%, #1a0b2e 0%, transparent 50%)'
                ]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ position: 'absolute', inset: 0, opacity: 0.6 }}
        />
        <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(100px)' }} />
    </div>
);

const GlassCard = ({ children, style, onClick }) => (
    <motion.div
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
        onClick={onClick}
        style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            padding: '2rem',
            cursor: onClick ? 'pointer' : 'default',
            ...style
        }}
    >
        {children}
    </motion.div>
);



export default function AfterHours() {
    const [step, setStep] = useState("question"); // question, passcode, entry, sanctuary
    const [input, setInput] = useState("");
    const [isError, setIsError] = useState(false);
    const [activeTab, setActiveTab] = useState("home"); // home, vibes, years
    const [selectedMemory, setSelectedMemory] = useState(null);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if (step === "entry") {
            const timer = setTimeout(() => {
                setStep("sanctuary");
                // Try to start music on entry if not already playing
                if (audioRef.current && !isMusicPlaying) {
                    audioRef.current.play().then(() => setIsMusicPlaying(true)).catch(e => console.log("Music click required"));
                }
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [step, isMusicPlaying]);

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isMusicPlaying) {
                audioRef.current.pause();
                setIsMusicPlaying(false);
            } else {
                audioRef.current.play();
                setIsMusicPlaying(true);
            }
        }
    };

    const handlePasscodeSubmit = () => {
        if (input.toLowerCase().trim() === PASSWORD) {
            setStep("entry");
        } else {
            setIsError(true);
            setTimeout(() => {
                setInput("");
                setIsError(false);
            }, 1000);
        }
    };



    return (
        <div className="full-page gate-wrapper">
            <AuroraBackground />

            <audio
                ref={audioRef}
                src="/audio/Raabta-Arijit-Singh-Slowed-Reverb-Lyrics-Use-Headphones-🎧🎧-2.mp3"
                loop
            />

            <motion.button
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMusic}
                className="music-toggle-btn"
                style={{
                    position: 'fixed',
                    top: '30px',
                    right: '30px',
                    zIndex: 1000,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(15px)',
                    cursor: 'pointer'
                }}
            >
                {isMusicPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </motion.button>

            <AnimatePresence mode="wait">
                {step === "question" && (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="gate-container"
                    >
                        <h1 className="gate-question-text">Do you remember me?</h1>

                        <div className="gate-actions">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 77, 109, 0.3)' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setStep("passcode")}
                                className="primary-gate-btn"
                            >
                                Yes ❤️
                            </motion.button>

                            <motion.button
                                className="secondary-gate-btn"
                                whileHover={{ opacity: 1 }}
                            >
                                I think so
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {step === "passcode" && (
                    <motion.div
                        key="passcode"
                        initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                        transition={{ duration: 0.6 }}
                        className="gate-container"
                    >
                        <motion.div
                            animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
                            transition={{ duration: 0.4 }}
                        >
                            <h1 className="gate-sub-text">Then tell me one word.</h1>
                        </motion.div>

                        <div className="passcode-input-wrapper">
                            <input
                                autoFocus
                                type="password"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handlePasscodeSubmit()}
                                className="premium-input"
                                placeholder="••••••••"
                            />
                            <motion.button
                                onClick={handlePasscodeSubmit}
                                whileHover={{ scale: 1.1, color: '#ff4d6d' }}
                                whileTap={{ scale: 0.9 }}
                                className="input-submit-btn"
                                style={{ opacity: input.length > 0 ? 1 : 0 }}
                            >
                                <Play size={28} />
                            </motion.button>
                        </div>

                        <p className="input-hint">Press Enter to confirm</p>
                    </motion.div>
                )}

                {step === "entry" && (
                    <motion.div
                        key="entry"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="gate-container"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                filter: ['drop-shadow(0 0 0px #ff4d6d)', 'drop-shadow(0 0 20px #ff4d6d)', 'drop-shadow(0 0 0px #ff4d6d)']
                            }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <Heart size={64} fill="#ff4d6d" stroke="none" />
                        </motion.div>
                        <h2 className="opening-text">Opening...</h2>
                    </motion.div>
                )}
            </AnimatePresence>

            {step === "sanctuary" && (
                <div className="main-layout-container">
                    <div className="main-layout">
                        {/* Navigation - Sidebar for Desktop, Bottom Bar for Mobile */}
                        <nav className="navigation">
                            <div className="profile-section">
                                <div className="avatar" />
                                <div className="profile-info">
                                    <p className="profile-name">Devu & You</p>
                                    <p className="profile-status">In our bubble</p>
                                </div>
                            </div>

                            <div className="nav-items">
                                {[
                                    { id: 'home', icon: <Moon size={20} />, label: 'Sanctuary' },
                                    { id: 'vibes', icon: <Sparkles size={20} />, label: 'Whispers' },
                                    { id: 'years', icon: <Wind size={20} />, label: 'Timeline' },
                                ].map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`nav-btn ${activeTab === item.id ? 'active' : ''}`}
                                    >
                                        {item.icon}
                                        <span className="nav-label">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </nav>

                        {/* Main Content Area */}
                        <div className="content-area">
                            <AnimatePresence mode="wait">
                                {activeTab === 'home' && (
                                    <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                        <h2 className="section-title">Welcome Home</h2>
                                        <GlassCard style={{ minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                            <motion.div
                                                animate={{ y: [0, -10, 0] }}
                                                transition={{ repeat: Infinity, duration: 4 }}
                                                style={{ position: 'relative' }}
                                            >
                                                <div className="main-orb" />
                                            </motion.div>
                                            <p className="hero-quote">"Tumhara hona hi mera sukoon hai."</p>
                                            <p style={{ opacity: 0.4, fontSize: '0.9rem' }}>Select a mode to begin your journey.</p>
                                        </GlassCard>
                                    </motion.div>
                                )}

                                {activeTab === 'vibes' && (
                                    <motion.div key="vibes" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        <h2 className="section-title">Midnight Whispers</h2>
                                        <div className="whisper-grid">
                                            {whispers.map((w, i) => (
                                                <GlassCard key={i} style={{ padding: '2rem', textAlign: 'center' }}>
                                                    <p className="whisper-text">"{w}"</p>
                                                </GlassCard>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'years' && (
                                    <motion.div key="years" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <h2 className="section-title">Our Timeline</h2>
                                        <div className="timeline-wrapper">
                                            {memories.map((m, i) => (
                                                <GlassCard key={m.id} onClick={() => setSelectedMemory(m)} style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem' }}>
                                                    <div>
                                                        <span className="year-badge">{m.year}</span>
                                                        <h3 style={{ margin: '0.5rem 0', fontWeight: '400', fontSize: '1.1rem' }}>{m.title}</h3>
                                                    </div>
                                                    <Play size={16} style={{ opacity: 0.3 }} />
                                                </GlassCard>
                                            ))}
                                        </div>

                                        <AnimatePresence>
                                            {selectedMemory && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    className="modal-overlay"
                                                    onClick={() => setSelectedMemory(null)}
                                                >
                                                    <GlassCard style={{ maxWidth: '500px', width: '90%', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                                                        <span className="year-badge">{selectedMemory.year}</span>
                                                        <h2 style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>{selectedMemory.title}</h2>
                                                        <p style={{ lineHeight: '1.8', opacity: 0.7, fontSize: '1.1rem' }}>{selectedMemory.text}</p>
                                                        <button onClick={() => setSelectedMemory(null)} className="close-btn">Close</button>
                                                    </GlassCard>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            )}


            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400&family=Playfair+Display:ital,wght@1,400&display=swap');
                
                * { box-sizing: border-box; }
                
                body { 
                    margin: 0; 
                    font-family: 'Outfit', sans-serif; 
                    background: #000;
                    color: #fff;
                    overflow: hidden;
                }

                .full-page { 
                    width: 100vw; 
                    height: 100vh; 
                    height: 100dvh;
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    position: relative; 
                    overflow: hidden;
                }

                .gate-wrapper {
                    background: #000;
                }

                .gate-container {
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 2rem;
                    width: 100%;
                    max-width: 600px;
                    position: relative;
                }

                .gate-question-text {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(2.2rem, 10vw, 3.5rem);
                    font-weight: 400;
                    font-style: italic;
                    margin-bottom: 4rem;
                    letter-spacing: -0.5px;
                }

                .gate-sub-text {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(1.5rem, 6vw, 2.2rem);
                    font-weight: 400;
                    font-style: italic;
                    margin-bottom: 2rem;
                    opacity: 0.9;
                }

                .gate-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 1.2rem;
                    width: 100%;
                    max-width: 320px;
                }

                .primary-gate-btn {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #fff;
                    padding: 1.2rem 2rem;
                    border-radius: 100px;
                    font-size: 1.1rem;
                    cursor: pointer;
                    backdrop-filter: blur(20px);
                    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
                }

                .secondary-gate-btn {
                    background: none;
                    border: none;
                    color: #fff;
                    opacity: 0.4;
                    font-size: 0.9rem;
                    cursor: pointer;
                    letter-spacing: 1px;
                }

                .passcode-input-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 350px;
                    margin-top: 2rem;
                }

                .premium-input {
                    background: none;
                    border: none;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    color: #fff;
                    font-size: 1.8rem;
                    text-align: center;
                    width: 100%;
                    outline: none;
                    padding: 1rem 0;
                    letter-spacing: 12px;
                    transition: border-color 0.4s;
                }

                .premium-input:focus {
                    border-color: rgba(255, 255, 255, 0.4);
                }

                .input-submit-btn {
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    color: #fff;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .input-hint {
                    margin-top: 2rem;
                    font-size: 0.8rem;
                    opacity: 0.3;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                }

                .opening-text {
                    font-size: clamp(1.2rem, 5vw, 1.8rem);
                    font-weight: 300;
                    letter-spacing: 8px;
                    margin-top: 2.5rem;
                    text-transform: uppercase;
                    opacity: 0.8;
                }

                /* Dashboard Layout */
                .main-layout-container {
                    width: 100%;
                    height: 100vh;
                    height: 100dvh;
                    position: relative;
                    z-index: 10;
                }

                .main-layout {
                    display: flex;
                    width: 100%;
                    max-width: 1400px;
                    height: 100%;
                    margin: 0 auto;
                    padding: 4rem;
                    gap: 6rem;
                }

                .navigation {
                    width: 280px;
                    display: flex;
                    flex-direction: column;
                    padding-bottom: 2rem;
                }

                .profile-section {
                    display: flex;
                    align-items: center;
                    gap: 1.2rem;
                    margin-bottom: 4rem;
                }

                .avatar {
                    width: 54px;
                    height: 54px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #2d0b16, #1a0b2e);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .profile-name { font-size: 1.1rem; margin: 0; font-weight: 400; color: rgba(255,255,255,0.9); }
                .profile-status { font-size: 0.75rem; opacity: 0.5; margin: 0.2rem 0 0; }

                .nav-items {
                    display: flex;
                    flex-direction: column;
                    gap: 1.2rem;
                }

                .nav-btn {
                    background: transparent;
                    border: none;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    gap: 1.2rem;
                    font-size: 1.05rem;
                    font-weight: 300;
                    opacity: 0.4;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    padding: 0.8rem 1rem;
                    border-radius: 12px;
                    text-align: left;
                    margin-left: -1rem;
                }

                .nav-btn:hover {
                    opacity: 0.7;
                    background: rgba(255, 255, 255, 0.03);
                }

                .nav-btn.active {
                    opacity: 1;
                    font-weight: 400;
                    background: rgba(255, 255, 255, 0.05);
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                }

                .content-area {
                    flex: 1;
                    overflow-y: auto;
                    padding-right: 1rem;
                    scrollbar-width: none;
                }

                .content-area::-webkit-scrollbar { display: none; }

                .section-title { 
                    font-size: clamp(1.8rem, 4vw, 2.5rem); 
                    font-weight: 200; 
                    letter-spacing: 4px; 
                    text-transform: uppercase; 
                    margin-bottom: 2.5rem; 
                }

                .main-orb {
                    width: 140px;
                    height: 140px;
                    border-radius: 50%;
                    background: radial-gradient(circle at 30% 30%, #ff4d6d88, #9d4edd88);
                    filter: blur(40px);
                    opacity: 0.6;
                }

                .hero-quote {
                    font-size: clamp(1.4rem, 4vw, 2rem);
                    font-style: italic;
                    font-family: 'Playfair Display', serif;
                    margin: 2.5rem 0 1rem;
                    line-height: 1.4;
                }

                .whisper-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1.5rem;
                    padding-bottom: 4rem;
                }

                .whisper-text {
                    font-size: 1.1rem;
                    font-style: italic;
                    opacity: 0.8;
                    line-height: 1.6;
                }

                .year-badge {
                    font-size: 0.65rem;
                    color: #ff4d6d;
                    letter-spacing: 2px;
                    font-weight: 600;
                    text-transform: uppercase;
                }

                .timeline-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    padding-bottom: 4rem;
                }

                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.8);
                    backdrop-filter: blur(25px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 2rem;
                }

                .close-btn {
                    margin-top: 2.5rem;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #fff;
                    padding: 0.9rem 3rem;
                    border-radius: 100px;
                    cursor: pointer;
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    transition: 0.3s;
                }

                .close-btn:hover { background: rgba(255, 255, 255, 0.1); }

                /* Tablet Responses */
                @media (max-width: 1100px) {
                    .main-layout { gap: 3rem; padding: 2rem; }
                    .navigation { width: 220px; }
                }

                /* Mobile Adjustments */
                @media (max-width: 850px) {
                    .main-layout {
                        flex-direction: column;
                        padding: 1.5rem;
                        gap: 2.5rem;
                    }

                    .navigation {
                        width: 100%;
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        background: rgba(8, 8, 8, 0.85);
                        backdrop-filter: blur(30px);
                        padding: 0.8rem 1.5rem;
                        border-top: 1px solid rgba(255, 255, 255, 0.05);
                        z-index: 100;
                        flex-direction: row;
                    }

                    .profile-section { display: none; }

                    .nav-items {
                        flex-direction: row;
                        width: 100%;
                        justify-content: space-around;
                        gap: 0;
                    }

                    .nav-btn {
                        flex-direction: column;
                        gap: 0.3rem;
                        font-size: 0.7rem;
                        padding: 0.6rem;
                        align-items: center;
                        margin-left: 0;
                    }

                    .nav-label {
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        font-size: 0.6rem;
                    }

                    .content-area {
                        padding-right: 0;
                        padding-bottom: 90px;
                    }

                    .section-title { margin-bottom: 2rem; text-align: left; }
                }

                @media (max-width: 480px) {
                    .gate-question-text { margin-bottom: 3rem; }
                    .premium-input { font-size: 1.4rem; letter-spacing: 8px; }
                    .main-layout { padding: 1rem; }
                }
            `}</style>
        </div>
    );
}
