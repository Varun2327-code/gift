import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

// Import images from assets
import firstDateImg from '../assets/first date.jpeg';
import foodImg from '../assets/food.jpeg';
import musicNightImg from '../assets/music night.jpeg';
import navaratiImg from '../assets/navarati.jpeg';
import saariImg from '../assets/saari pic.jpeg';
import outsideImg from '../assets/outside.jpeg';
import firstGiftImg from '../assets/first gift.jpeg';
import thirtyFirstImg from '../assets/31st.jpeg';
import handDilImg from '../assets/hand dil.jpeg';

// New Imports
import formalImg from '../assets/formal.jpeg';
import spendDayImg from '../assets/spend day.jpeg';
import navaratiDayImg from '../assets/navarati day.jpeg';
import cakeDateImg from '../assets/cake date.jpeg';
import specialDayImg from '../assets/special day.jpeg';
import oneMoreImg from '../assets/one more.jpeg';
import giftsImg from '../assets/gifts.jpeg';
import nightTimeImg from '../assets/night time.jpeg';
import saariDayImg from '../assets/saari day.jpeg';
import gardenTalksImg from '../assets/garden talks.jpeg';
import bothHandImg from '../assets/both hand.jpeg';
import firstFoodImg from '../assets/first food together.jpeg';

const MemoryCard = ({ memory, onClick, index }) => {
    return (
        <motion.div
            layoutId={`card-${memory.id}`}
            initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -5 : 5 }}
            animate={{ opacity: 1, y: 0, rotate: memory.rotate }}
            transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.43, 0.13, 0.23, 0.96]
            }}
            onClick={() => onClick(memory)}
            whileHover={{
                y: -15,
                rotate: 0,
                scale: 1.02,
                zIndex: 10,
                transition: { type: "spring", stiffness: 300, damping: 15 }
            }}
            style={{
                background: 'white',
                padding: '1rem 1rem 3.5rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                width: '100%',
                maxWidth: '300px',
                margin: '1rem',
                border: '1px solid #f0f0f0',
                position: 'relative',
                display: 'inline-block'
            }}
        >
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px' }}>
                <motion.img
                    src={memory.image}
                    alt={memory.title}
                    style={{
                        width: '100%',
                        height: '240px',
                        objectFit: 'cover',
                        marginBottom: '1rem',
                        display: 'block'
                    }}
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(214, 51, 132, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(2px)'
                    }}
                >
                    <ZoomIn size={32} color="white" />
                </motion.div>
            </div>

            <h3 className="romantic-text" style={{
                textAlign: 'center',
                fontSize: '1.6rem',
                color: 'var(--deep-rose)',
                marginTop: '1rem'
            }}>
                {memory.title}
            </h3>

            {/* Polaroid Shadow Tape Effect */}
            <div style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '30px',
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(5px)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                zIndex: -1
            }} />
        </motion.div>
    );
};

const Memories = () => {
    const [selected, setSelected] = useState(null);
    const [filter, setFilter] = useState('All');

    const memories = [
        { id: 1, title: "Our First Date", category: "Romantic", image: firstDateImg, rotate: -2, desc: "The day it all began. Every moment felt like a dream." },
        { id: 2, title: "Foodies Forever", category: "Funny", image: foodImg, rotate: 3, desc: "Our shared love for food is second only to our love for each other!" },
        { id: 3, title: "A Night of Music", category: "Romantic", image: musicNightImg, rotate: -1, desc: "Lost in the rhythm and each other's company. Such a beautiful night." },
        { id: 4, title: "Navarati Vibes", category: "Cute", image: navaratiImg, rotate: 2, desc: "Dressing up and dancing through the celebration. You looked stunning!" },
        { id: 5, title: "Elegance in Saari", category: "Cute", image: saariImg, rotate: -3, desc: "The grace, the smile, the everything. Just wow." },
        { id: 6, title: "Outdoor Adventures", category: "Travel", image: outsideImg, rotate: 1, desc: "Exploring new places with my favorite person." },
        { id: 7, title: "The First Gift", category: "Cute", image: firstGiftImg, rotate: -2, desc: "A small token of love that meant so much more." },
        { id: 8, title: "New Year's Eve", category: "Romantic", image: thirtyFirstImg, rotate: 3, desc: "Starting the year with you by my side. Here's to many more!" },
        { id: 9, title: "Hand Heart", category: "Cute", image: handDilImg, rotate: -1, desc: "A symbol of our love, perfectly captured." },
        { id: 10, title: "Formal Night", category: "Romantic", image: formalImg, rotate: 2, desc: "Dressed to impress, but I only had eyes for you." },
        { id: 11, title: "Spending the Day", category: "Travel", image: spendDayImg, rotate: -2, desc: "Just us, wandering and making every second count." },
        { id: 12, title: "Navarati Special", category: "Cute", image: navaratiDayImg, rotate: 1, desc: "Another beautiful day of celebration and smiles." },
        { id: 13, title: "Cake Date", category: "Romantic", image: cakeDateImg, rotate: -3, desc: "Sweet treats and even sweeter company." },
        { id: 14, title: "Special Day", category: "Romantic", image: specialDayImg, rotate: 2, desc: "A moment that stands still in my heart forever." },
        { id: 15, title: "One More Memory", category: "Cute", image: oneMoreImg, rotate: -1, desc: "Because one memory is never enough with you." },
        { id: 16, title: "Gifts of Love", category: "Cute", image: giftsImg, rotate: 3, desc: "It's not about the gift, but the thought behind it." },
        { id: 17, title: "Night Time Tales", category: "Romantic", image: nightTimeImg, rotate: -2, desc: "The world sleeps while we share our dreams." },
        { id: 18, title: "Saari Elegance", category: "Cute", image: saariDayImg, rotate: 1, desc: "Timeless beauty in a timeless tradition." },
        { id: 19, title: "Garden Talks", category: "Romantic", image: gardenTalksImg, rotate: -3, desc: "Where words flow as naturally as the breeze." },
        { id: 20, title: "Holding Hands", category: "Cute", image: bothHandImg, rotate: 2, desc: "My favorite place to be is with my hand in yours." },
        { id: 21, title: "First Foodie Date", category: "Funny", image: firstFoodImg, rotate: -1, desc: "The start of our delicious journey together!" }
    ];

    const filteredMemories = filter === 'All' ? memories : memories.filter(m => m.category === filter);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div style={{ padding: '8rem 2rem 4rem', minHeight: '100vh' }}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
                <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '1rem' }}>Our Memories</h1>
                <p className="romantic-text" style={{ fontSize: '1.4rem', color: 'var(--deep-rose)', marginBottom: '2rem' }}>
                    Capturing our beautiful moments
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                    {['All', 'Cute', 'Funny', 'Romantic', 'Travel'].map(cat => (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            key={cat}
                            onClick={() => setFilter(cat)}
                            style={{
                                padding: '0.6rem 1.8rem',
                                borderRadius: '30px',
                                background: filter === cat ? 'var(--rose-red)' : 'white',
                                color: filter === cat ? 'white' : 'var(--text-main)',
                                boxShadow: filter === cat ? '0 5px 15px rgba(214, 51, 132, 0.3)' : 'var(--shadow-soft)',
                                transition: 'all 0.3s ease',
                                fontWeight: '500',
                                border: 'none'
                            }}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}
            >
                {filteredMemories.map((memory, idx) => (
                    <MemoryCard key={memory.id} memory={memory} onClick={setSelected} index={idx} />
                ))}
            </motion.div>

            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.92)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2000,
                            padding: '2rem',
                            backdropFilter: 'blur(8px)'
                        }}
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            layoutId={`card-${selected.id}`}
                            initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                            exit={{ scale: 0.8, opacity: 0, rotateY: -90 }}
                            transition={{ type: "spring", damping: 20, stiffness: 150 }}
                            style={{
                                background: 'white',
                                padding: '1.5rem',
                                borderRadius: '4px',
                                maxWidth: '700px',
                                width: '100%',
                                position: 'relative',
                                boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelected(null)}
                                style={{
                                    position: 'absolute',
                                    top: '-40px',
                                    right: '-40px',
                                    color: 'white',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <X size={32} />
                            </motion.button>

                            <div style={{ padding: '1rem', background: '#fff', border: '1px solid #eee' }}>
                                <img
                                    src={selected.image}
                                    alt={selected.title}
                                    style={{
                                        width: '100%',
                                        maxHeight: '65vh',
                                        objectFit: 'contain',
                                        borderRadius: '2px'
                                    }}
                                />
                                <div style={{ padding: '2rem 1rem 1rem', textAlign: 'center' }}>
                                    <h2 className="romantic-text" style={{ fontSize: '2.8rem', color: 'var(--deep-rose)', marginBottom: '1rem' }}>
                                        {selected.title}
                                    </h2>
                                    <p style={{
                                        lineHeight: '1.8',
                                        color: 'var(--text-main)',
                                        fontSize: '1.1rem',
                                        maxWidth: '500px',
                                        margin: '0 auto'
                                    }}>
                                        {selected.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Memories;
