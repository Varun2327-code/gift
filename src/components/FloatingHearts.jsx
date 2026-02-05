import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingHearts = ({ count = 20 }) => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const colors = ['#ffdae0', '#ffb7c5', '#ff8da1', '#d63384'];
        const newHearts = Array.from({ length: count }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            size: Math.random() * 24 + 12,
            duration: Math.random() * 15 + 15,
            delay: Math.random() * 20,
            opacity: Math.random() * 0.4 + 0.1,
            color: colors[Math.floor(Math.random() * colors.length)],
            sway: Math.random() * 100 - 50,
            rotation: Math.random() * 360
        }));
        setHearts(newHearts);
    }, [count]);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'hidden'
        }}>
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    initial={{ y: '110vh', opacity: 0, x: `${heart.left}vw`, rotate: heart.rotation }}
                    animate={{
                        y: '-20vh',
                        opacity: [0, heart.opacity, heart.opacity, 0],
                        x: [
                            `${heart.left}vw`,
                            `${heart.left + (heart.sway / 5)}vw`,
                            `${heart.left - (heart.sway / 5)}vw`,
                            `${heart.left}vw`
                        ],
                        rotate: heart.rotation + 360
                    }}
                    transition={{
                        duration: heart.duration,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        width: heart.size,
                        height: heart.size,
                    }}
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill={heart.color}
                        style={{
                            width: '100%',
                            height: '100%',
                            filter: `blur(${Math.random() * 2}px) drop-shadow(0 0 5px ${heart.color}44)`
                        }}
                    >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingHearts;
