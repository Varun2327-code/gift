import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';

const BackgroundMusic = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const audioRef = useRef(null);
    const location = useLocation();

    // Using your special song
    const musicUrl = "/audio/Until_I_Found_You (1).mp3";

    const isAfterhours = location.pathname.toLowerCase() === '/afterhours';

    useEffect(() => {
        // Auto-pause if on Afterhours page
        if (isAfterhours) {
            if (audioRef.current && !audioRef.current.paused) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }
    }, [location.pathname, isPlaying, isAfterhours]);

    useEffect(() => {
        // Auto-hide hint after 5 seconds
        const timer = setTimeout(() => setShowHint(false), 5000);

        // Try to play on first user interaction (excluding Afterhours)
        const handleFirstInteraction = () => {
            if (audioRef.current && !isPlaying && location.pathname !== '/afterhours') {
                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true);
                        setShowHint(false);
                        document.removeEventListener('click', handleFirstInteraction);
                    })
                    .catch(err => console.log("Autoplay still blocked"));
            }
        };

        document.addEventListener('click', handleFirstInteraction);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('click', handleFirstInteraction);
        };
    }, [isPlaying]);

    const toggleMusic = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch(err => {
                console.log("Playback blocked by browser. User interaction required.");
            });
            setIsPlaying(true);
            setShowHint(false);
        }
    };

    if (isAfterhours) return null;

    return (
        <div style={{ position: 'fixed', bottom: '30px', left: '30px', zIndex: 9999 }}>
            <audio ref={audioRef} src={musicUrl} loop />

            <AnimatePresence>
                {showHint && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        style={{
                            position: 'absolute',
                            left: '60px',
                            bottom: '10px',
                            background: 'white',
                            padding: '8px 15px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            border: '1px solid var(--blush-pink)',
                            color: 'var(--deep-rose)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <Music size={14} />
                        Tap for music ❤️
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMusic}
                style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'white',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(214, 51, 132, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                }}
            >
                {isPlaying ? (
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <Volume2 color="var(--rose-red)" size={24} />
                    </motion.div>
                ) : (
                    <VolumeX color="var(--text-light)" size={24} />
                )}
            </motion.button>
        </div>
    );
};

export default BackgroundMusic;
