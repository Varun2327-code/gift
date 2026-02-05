import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Landing from './pages/Landing';
import OurStory from './pages/OurStory';
import Memories from './pages/Memories';
import LoveGames from './pages/LoveGames';
import SpendingTime from './pages/SpendingTime';
import LoveLetters from './pages/LoveLetters';
import FutureDreams from './pages/FutureDreams';
import FinalSurprise from './pages/FinalSurprise';
import Afterhours from './pages/Afterhours';
import Navbar from './components/Navbar';
import FloatingHearts from './components/FloatingHearts';
import BackgroundMusic from './components/BackgroundMusic';

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ minHeight: 'calc(100vh - 80px)' }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const [showHearts, setShowHearts] = useState(true);

  return (
    <Router>
      <div className="app-container">
        <FloatingHearts count={15} />
        <Navbar />
        <BackgroundMusic />
        <main className="main-content">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageWrapper><Landing /></PageWrapper>} />
              <Route path="/story" element={<PageWrapper><OurStory /></PageWrapper>} />
              <Route path="/memories" element={<PageWrapper><Memories /></PageWrapper>} />
              <Route path="/games" element={<PageWrapper><LoveGames /></PageWrapper>} />
              <Route path="/time" element={<PageWrapper><SpendingTime /></PageWrapper>} />
              <Route path="/letters" element={<PageWrapper><LoveLetters /></PageWrapper>} />
              <Route path="/dreams" element={<PageWrapper><FutureDreams /></PageWrapper>} />
              <Route path="/surprise" element={<PageWrapper><FinalSurprise /></PageWrapper>} />
              <Route path="/afterhours" element={<PageWrapper><Afterhours /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  )
}

export default App
