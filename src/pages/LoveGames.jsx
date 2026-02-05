import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Brain, MessageCircle, RotateCcw, Sparkles, Zap } from 'lucide-react';

const LoveQuiz = () => {
    const questions = [
        { q: "Where was our first date?", options: ["Cafe", "Mall", "Cinema", "City"], a: 1 },
        { q: "What's my favorite color?", options: ["Blue", "Red", "Pink", "Gold"], a: 0 },
        { q: "When is our First Meetup?", options: ["Sept 14", "Oct 21", "Dec 25", "Feb 14"], a: 1 },
        { q: "What is our favorite food to eat together?", options: ["Chaat", "Street Food", "Pasta", "Bhel"], a: 0 },
    ];
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (idx) => {
        if (idx === questions[current].a) setScore(score + 1);
        if (current + 1 < questions.length) {
            setCurrent(current + 1);
        } else {
            setShowResult(true);
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ffdae0', '#d63384', '#c21e56']
            });
        }
    };

    if (showResult) return (
        <div style={{ textAlign: 'center' }}>
            <h2 className="romantic-text" style={{ fontSize: '2rem' }}>You know us so well!</h2>
            <p style={{ fontSize: '3rem', margin: '1rem 0' }}>{score}/{questions.length} ❤️</p>
            <button onClick={() => { setCurrent(0); setScore(0); setShowResult(false); }} className="card" style={{ padding: '0.5rem 1rem' }}>Play Again</button>
        </div>
    );

    return (
        <div>
            <h3 style={{ marginBottom: '1.5rem' }}>{questions[current].q}</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
                {questions[current].options.map((opt, i) => (
                    <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(i)}
                        style={{
                            padding: '1rem',
                            borderRadius: '10px',
                            border: '1px solid var(--blush-pink)',
                            textAlign: 'left',
                            background: 'white'
                        }}
                    >
                        {opt}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

const MemoryMatch = () => {
    const icons = ['❤️', '💖', '🌹', '🥂', '🍫', '💌'];
    const [cards, setCards] = useState([...icons, ...icons].sort(() => Math.random() - 0.5));
    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);

    const handleFlip = (idx) => {
        if (flipped.length === 2 || flipped.includes(idx) || solved.includes(idx)) return;
        const newFlipped = [...flipped, idx];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
                setSolved([...solved, ...newFlipped]);
                setFlipped([]);
                if (solved.length + 2 === cards.length) {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        colors: ['#ffdae0', '#d63384']
                    });
                }
            } else {
                setTimeout(() => setFlipped([]), 1000);
            }
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {cards.map((icon, i) => (
                <motion.div
                    key={i}
                    animate={{ rotateY: flipped.includes(i) || solved.includes(i) ? 180 : 0 }}
                    onClick={() => handleFlip(i)}
                    style={{
                        height: '60px',
                        background: flipped.includes(i) || solved.includes(i) ? 'white' : 'var(--blush-pink)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        border: '1px solid var(--blush-pink)'
                    }}
                >
                    {(flipped.includes(i) || solved.includes(i)) && <span style={{ transform: 'rotateY(180deg)' }}>{icon}</span>}
                </motion.div>
            ))}
            {solved.length === cards.length && (
                <button
                    onClick={() => { setCards([...icons, ...icons].sort(() => Math.random() - 0.5)); setSolved([]); }}
                    style={{ gridColumn: 'span 4', marginTop: '1rem', color: 'var(--rose-red)' }}
                >
                    Reset Game
                </button>
            )}
        </div>
    );
};

const AdultMemoryMatch = () => {
    const icons = ['🍒', '🍑', '🫦', '🛌', '💦', '👅'];
    const [cards, setCards] = useState([...icons, ...icons].sort(() => Math.random() - 0.5));
    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);

    const handleFlip = (idx) => {
        if (flipped.length === 2 || flipped.includes(idx) || solved.includes(idx)) return;
        const newFlipped = [...flipped, idx];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
                setSolved([...solved, ...newFlipped]);
                setFlipped([]);
                if (solved.length + 2 === cards.length) {
                    confetti({
                        particleCount: 150,
                        spread: 80,
                        colors: ['#ff4081', '#e91e63', '#c2185b']
                    });
                }
            } else {
                setTimeout(() => setFlipped([]), 1000);
            }
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {cards.map((icon, i) => (
                <motion.div
                    key={i}
                    animate={{ rotateY: flipped.includes(i) || solved.includes(i) ? 180 : 0 }}
                    onClick={() => handleFlip(i)}
                    style={{
                        height: '60px',
                        background: flipped.includes(i) || solved.includes(i) ? '#fff0f3' : '#2d0b16',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.8rem',
                        cursor: 'pointer',
                        border: '1px solid #ff4d6d'
                    }}
                >
                    {(flipped.includes(i) || solved.includes(i)) && <span style={{ transform: 'rotateY(180deg)' }}>{icon}</span>}
                </motion.div>
            ))}
            {solved.length === cards.length && (
                <button
                    onClick={() => { setCards([...icons, ...icons].sort(() => Math.random() - 0.5)); setSolved([]); }}
                    style={{ gridColumn: 'span 4', marginTop: '1rem', color: '#ff4d6d', fontWeight: 'bold' }}
                >
                    Play Again? 🔥
                </button>
            )}
        </div>
    );
};

const ComplimentMachine = () => {
    const compliments = [
        "Your smile lights up my entire world.",
        "I love the way you think about things.",
        "You make me want to be a better person every day.",
        "Being with you is my favorite place to be.",
        "You have the most beautiful soul I've ever met.",
        "Your kindness is truly inspiring.",
        "I'm so lucky to have you in my life.",
        "You're the person I want to share every sunset with."
    ];
    const [current, setCurrent] = useState(null);

    const generate = () => {
        const random = compliments[Math.floor(Math.random() * compliments.length)];
        setCurrent(random);
        confetti({
            particleCount: 50,
            spread: 50,
            origin: { y: 0.8 },
            colors: ['#ffdae0', '#d63384']
        });
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <AnimatePresence mode="wait">
                {current ? (
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="romantic-text"
                        style={{ fontSize: '1.5rem', minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        "{current}"
                    </motion.div>
                ) : (
                    <div style={{ minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)' }}>
                        Need a sweet reminder?
                    </div>
                )}
            </AnimatePresence>
            <button
                onClick={generate}
                className="card"
                style={{ marginTop: '2rem', padding: '0.8rem 1.5rem', background: 'var(--rose-red)', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', margin: '1.5rem auto 0' }}
            >
                <Sparkles size={18} /> Get a Compliment
            </button>
        </div>
    );
};

const LovePredictor = () => {
    const [percentage, setPercentage] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const predict = () => {
        setLoading(true);
        setPercentage(null);
        setTimeout(() => {
            const val = Math.floor(Math.random() * (100 - 90 + 1)) + 90; // Expanded range to 90-100%
            setPercentage(val);

            let finalMessage = "";
            if (val >= 90 && val <= 98) {
                finalMessage = "Ab jldi se shaadi karlete hai motee💍";
            } else if (val === 100) {
                finalMessage = "Perfect Match! Soulmates forever.";
            } else {
                finalMessage = "Incredibly Strong Bond! Almost perfect.";
            }

            setMessage(finalMessage);
            setLoading(false);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }, 1500);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            {loading ? (
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    style={{ fontSize: '3rem', color: 'var(--rose-red)' }}
                >
                    ❤️
                </motion.div>
            ) : percentage ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--rose-red)' }}>{percentage}%</div>
                    <p className="romantic-text" style={{ fontSize: '1.5rem', marginTop: '1rem' }}>{message}</p>
                </motion.div>
            ) : (
                <p style={{ color: 'var(--text-light)' }}>Click to see our love frequency!</p>
            )}
            {!loading && (
                <button
                    onClick={predict}
                    className="card"
                    style={{ marginTop: '2rem', padding: '0.8rem 1.5rem', background: 'var(--blush-pink)', display: 'flex', alignItems: 'center', gap: '10px', margin: '1.5rem auto 0' }}
                >
                    <Zap size={18} /> Calculate Love
                </button>
            )}
        </div>
    );
};

const TruthOrDare = () => {
    const items = [
        { type: 'Truth', text: "What was your first impression of me?" },
        { type: 'Dare', text: "I want to sleep in your boobies." },
        { type: 'Truth', text: "When did you realize you were falling for me?" },
        { type: 'Dare', text: "Send me a sweet voice note saying 'I love you' 💕" },
        { type: 'Truth', text: "What is one thing about me that always makes you smile?" },
        { type: 'Dare', text: "Give me your cutest smile right now 😊" },
        { type: 'Truth', text: "What is your favorite memory of us together?" },
        { type: 'Dare', text: "Write one thing you love about me and show me 💌" },
        { type: 'Truth', text: "What do you miss the most when we're apart?" },
        { type: 'Dare', text: "Kiss me on the Lips 😘" },
        { type: 'Truth', text: "What's the most romantic thing I've done for you?" },
        { type: 'Dare', text: "Plan our next date in one sentence 🍽️🎬" },
        { type: 'Truth', text: "What is one habit of mine you secretly love?" },
        { type: 'Dare', text: "Say my name softly and smile ❤️" },
        { type: 'Truth', text: "What is one dream you have for us?" },
        { type: 'Dare', text: "Send me a cute emoji that describes us 🥰" },
        { type: 'Truth', text: "What makes our relationship different from others?" },
        { type: 'Dare', text: "Promise me one thing you'll always do for us 💍" }
    ];
    const [current, setCurrent] = useState(null);

    return (
        <div style={{ textAlign: 'center' }}>
            <AnimatePresence mode="wait">
                {current ? (
                    <motion.div
                        key={current.text}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        style={{ padding: '1rem' }}
                    >
                        <h4 style={{ color: current.type === 'Truth' ? '#4a90e2' : 'var(--rose-red)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{current.type}</h4>
                        <p style={{ fontSize: '1.1rem', fontStyle: 'italic' }}>"{current.text}"</p>
                    </motion.div>
                ) : (
                    <p style={{ color: 'var(--text-light)' }}>Click shuffle to get a prompt!</p>
                )}
            </AnimatePresence>
            <button
                onClick={() => setCurrent(items[Math.floor(Math.random() * items.length)])}
                className="card"
                style={{ marginTop: '1.5rem', padding: '0.8rem 1.5rem', background: 'var(--blush-pink)', display: 'flex', alignItems: 'center', gap: '10px', margin: '1.5rem auto 0' }}
            >
                <RotateCcw size={18} /> Shuffle Prompt
            </button>
        </div>
    );
};

const LoveGames = () => {
    const games = [
        { id: 'quiz', title: 'Love Quiz', icon: <Heart color="var(--rose-red)" />, component: <LoveQuiz /> },
        { id: 'memory', title: 'Memory Match', icon: <Brain color="#9c27b0" />, component: <MemoryMatch /> },
        { id: 'adult_memory', title: 'After Hours Memory', icon: <Heart color="#e91e63" />, component: <AdultMemoryMatch /> },
        { id: 'td', title: 'Truth or Dare', icon: <MessageCircle color="#4caf50" />, component: <TruthOrDare /> },
        { id: 'compliment', title: 'Compliment Machine', icon: <Sparkles color="#ff9800" />, component: <ComplimentMachine /> },
        { id: 'predictor', title: 'Love Predictor', icon: <Zap color="#f44336" />, component: <LovePredictor /> }
    ];

    return (
        <div style={{ padding: '6rem 2rem 2rem', minHeight: '100vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3.5rem' }}>Love Games</h1>
                <p className="romantic-text" style={{ fontSize: '1.5rem', color: 'var(--deep-rose)' }}>A little fun for the two of us</p>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                {games.map(game => (
                    <motion.div
                        key={game.id}
                        className="card"
                        style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
                            <div style={{ p: '10px', borderRadius: '12px', background: 'var(--soft-beige)', display: 'flex' }}>
                                {game.icon}
                            </div>
                            <h2 style={{ fontSize: '1.8rem' }}>{game.title}</h2>
                        </div>
                        <div style={{ flex: 1 }}>
                            {game.component}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default LoveGames;
