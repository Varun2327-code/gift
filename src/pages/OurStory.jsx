import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import chatImg from '../assets/chat.png';
import meetingImg from '../assets/first meet.jpeg';
import momentsImg from '../assets/moment.jpeg';
import todayImg from '../assets/first gift.jpeg';

const StoryCard = ({ title, date, text, image, index }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 1,
                delay: 0.1,
                ease: [0.215, 0.61, 0.355, 1]
            }}
            style={{
                display: 'flex',
                flexDirection: isEven ? 'row' : 'row-reverse',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3rem',
                marginBottom: '8rem',
                width: '100%',
                flexWrap: 'wrap-reverse',
                position: 'relative',
                zIndex: 2
            }}
        >
            {/* Image Container */}
            <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ flex: 1, minWidth: '300px', maxWidth: '500px' }}
            >
                <div style={{
                    position: 'relative',
                    padding: '10px',
                    background: 'white',
                    borderRadius: '24px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}>
                    <img
                        src={image}
                        alt={title}
                        style={{
                            width: '100%',
                            borderRadius: '16px',
                            display: 'block'
                        }}
                    />
                    {/* Decorative Element */}
                    <div style={{
                        position: 'absolute',
                        top: '-15px',
                        left: isEven ? '-15px' : 'auto',
                        right: !isEven ? '-15px' : 'auto',
                        width: '60px',
                        height: '60px',
                        background: 'var(--blush-pink)',
                        borderRadius: '50%',
                        zIndex: -1,
                        opacity: 0.5
                    }} />
                </div>
            </motion.div>

            {/* Content Container */}
            <div style={{
                flex: 1,
                minWidth: '300px',
                maxWidth: '500px',
                textAlign: isEven ? 'left' : 'right',
                padding: '1rem'
            }}>
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '40px' }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    style={{
                        height: '2px',
                        background: 'var(--rose-red)',
                        marginBottom: '1.5rem',
                        marginLeft: isEven ? '0' : 'auto'
                    }}
                />
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="romantic-text"
                    style={{
                        color: 'var(--rose-red)',
                        fontSize: '1.4rem',
                        fontWeight: '600'
                    }}
                >
                    {date}
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    style={{
                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                        margin: '0.8rem 0',
                        color: 'var(--deep-rose)',
                        lineHeight: 1.1
                    }}
                >
                    {title}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    style={{
                        color: 'var(--text-light)',
                        lineHeight: '1.8',
                        fontSize: '1.1rem'
                    }}
                >
                    {text}
                </motion.p>
            </div>

            {/* Connecting Dot */}
            <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '16px',
                height: '16px',
                background: 'var(--rose-red)',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                border: '4px solid var(--soft-beige)',
                boxShadow: '0 0 0 2px var(--blush-pink)',
                zIndex: 3
            }} className="timeline-dot" />
        </motion.div>
    );
};

const OurStory = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const events = [
        {
            title: "Our First Chat",
            date: "October 24, 2023",
            text: "It all started when I reacted to your story. That one little interaction sparked a conversation on Instagram that hasn't stopped since. Who knew a simple story reaction would lead us here?",
            image: chatImg
        },
        {
            title: "The First Meeting",
            date: "October 31, 2023",
            text: "Our first time meeting alone in that beautiful garden. We spent hours just talking and clicking pictures, losing track of time as we finally moved from screens to reality.",
            image: meetingImg
        },
        {
            title: "Special Moments",
            date: "February 24, 2025",
            text: "From riding together on the scooty to late-night outs, eating our favorite food and just spending endless hours together. Every little thing with you is a big memory for me.",
            image: momentsImg
        },
        {
            title: "Today & Forever",
            date: "February 08, 2024",
            text: "The night I first proposed to you at 7:10 PM. The very next day, we went on our beautiful date to Alembic City. A beginning that turned into my forever.",
            image: todayImg
        }
    ];

    return (
        <div style={{ padding: '8rem 2rem 4rem', overflowX: 'hidden' }} ref={containerRef}>
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ textAlign: 'center', marginBottom: '6rem' }}
            >
                <h1 style={{ fontSize: 'clamp(3rem, 10vw, 4.5rem)', color: 'var(--deep-rose)' }}>Our Story</h1>
                <p className="romantic-text" style={{ fontSize: '1.8rem', color: 'var(--rose-red)', marginTop: '0.5rem' }}>
                    Every step we took together
                </p>
            </motion.div>

            <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
                {/* Central Timeline Line */}
                <motion.div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        background: 'var(--blush-pink)',
                        transform: 'translateX(-50%)',
                        scaleY: scaleY,
                        originY: 0,
                        display: 'block'
                    }}
                />

                {events.map((event, index) => (
                    <StoryCard key={index} {...event} index={index} />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                style={{ textAlign: 'center', marginTop: '4rem' }}
            >
                <p className="romantic-text" style={{ fontSize: '2rem', color: 'var(--deep-rose)' }}>
                    ...and the best is yet to come ❤️
                </p>
            </motion.div>
        </div>
    );
};

export default OurStory;
