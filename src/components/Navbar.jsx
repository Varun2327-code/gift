import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, BookHeart, Camera, Gamepad2, Coffee, Mail, Sparkles, Gift, Moon } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const isLanding = location.pathname === '/';

    // Don't show navbar on landing page
    if (isLanding) return null;

    const navItems = [
        { path: '/story', icon: <BookHeart size={20} />, label: 'Story' },
        { path: '/memories', icon: <Camera size={20} />, label: 'Memories' },
        { path: '/games', icon: <Gamepad2 size={20} />, label: 'Games' },
        { path: '/time', icon: <Coffee size={20} />, label: 'Time' },
        { path: '/letters', icon: <Mail size={20} />, label: 'Letters' },
        { path: '/dreams', icon: <Sparkles size={20} />, label: 'Dreams' },
        { path: '/surprise', icon: <Gift size={20} />, label: 'Surprise' },
        { path: '/afterhours', icon: <Moon size={20} />, label: 'Late' },
    ];

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            zIndex: 1000,
            pointerEvents: 'none' // Allow clicking through the container
        }}>
            <motion.nav
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass"
                style={{
                    padding: '8px',
                    borderRadius: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    maxWidth: '92vw',
                    pointerEvents: 'auto', // Re-enable clicks for the nav itself
                    boxShadow: '0 8px 32px rgba(214, 51, 132, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(12px)',
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                {/* Home/Heart Icon */}
                <Link to="/" style={{ flexShrink: 0 }}>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            color: 'white',
                            padding: '10px',
                            borderRadius: '50%',
                            background: 'var(--rose-red)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px',
                            boxShadow: '0 4px 12px rgba(214, 51, 132, 0.3)'
                        }}
                    >
                        <Heart size={18} fill="white" />
                    </motion.div>
                </Link>

                {/* Nav Links */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    paddingRight: '4px'
                }}>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link key={item.path} to={item.path} style={{ flexShrink: 0 }}>
                                <motion.div
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        padding: isActive ? '8px 16px' : '8px 12px',
                                        borderRadius: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        background: isActive ? 'var(--blush-pink)' : 'transparent',
                                        color: isActive ? 'var(--deep-rose)' : 'var(--text-main)',
                                        transition: 'all 0.3s ease',
                                        position: 'relative'
                                    }}
                                >
                                    <span style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        transform: isActive ? 'scale(1.1)' : 'scale(1)',
                                        transition: 'transform 0.3s ease'
                                    }}>
                                        {item.icon}
                                    </span>

                                    {/* Label logic: Show if active, or on larger screens */}
                                    <span style={{
                                        fontSize: '0.85rem',
                                        fontWeight: isActive ? '600' : '400',
                                        display: isActive ? 'inline-block' : 'none', // Show label only if active on mobile
                                        whiteSpace: 'nowrap'
                                    }} className="nav-label">
                                        {item.label}
                                    </span>

                                    {/* Desktop view could show all labels, but for the "premium" feel, active-only is very modern */}
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            </motion.nav>

            {/* Custom CSS for hiding/showing labels on desktop */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (min-width: 768px) {
                    .nav-label {
                        display: inline-block !important;
                    }
                }
                nav::-webkit-scrollbar {
                    display: none;
                }
            `}} />
        </div>
    );
};

export default Navbar;
