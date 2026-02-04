"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import FloatingHearts from "./components/FloatingHearts";

export default function Home() {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleNoHover = () => {
    const maxX = window.innerWidth - 100; // Buffer for button width
    const maxY = window.innerHeight - 50;  // Buffer for button height
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    // Ensure padding from edges (50px)
    const padding = 50;
    const clampedX = Math.max(padding, Math.min(x, maxX - padding));
    const clampedY = Math.max(padding, Math.min(y, maxY - padding));

    setNoPosition({ x: clampedX, y: clampedY });
    setHasMoved(true);
    setYesScale((prev) => prev + 1);
  };

  const handleYesClick = () => {
    setIsSuccess(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ffffff']
    });
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  const resetGame = () => {
    setIsSuccess(false);
    setYesScale(1);
    setHasMoved(false);
    setNoPosition({ x: 0, y: 0 });
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <FloatingHearts />
      <audio ref={audioRef} src="https://www.myinstants.com/media/sounds/careless-whisper-sax-iphone.mp3" />

      <AnimatePresence>
        {!isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="z-10 flex flex-col items-center gap-12 text-center"
          >
            <h1 className="font-dancing text-6xl md:text-8xl text-purple-700 drop-shadow-sm pointer-events-none select-none">
              Will you be my Valentine?
            </h1>

            <div className="relative flex items-center justify-center gap-8">
              <motion.button
                onClick={handleYesClick}
                layout
                style={{ scale: yesScale }}
                className="rounded-xl bg-[#ff4d6d] hover:bg-[#ff3355] text-white font-bold py-3 px-8 text-2xl shadow-md transition-colors duration-200"
              >
                Yes 💖
              </motion.button>

              <motion.button
                onMouseEnter={handleNoHover}
                // Also trigger on click for touch devices
                onClick={handleNoHover}
                style={{
                  position: hasMoved ? "fixed" : "relative",
                  left: hasMoved ? noPosition.x : "auto",
                  top: hasMoved ? noPosition.y : "auto",
                  zIndex: 100,
                }}
                className="rounded-xl bg-white hover:bg-gray-50 text-purple-700 font-bold py-3 px-8 text-xl shadow-md transition-colors duration-200 whitespace-nowrap"
                animate={hasMoved ? { left: noPosition.x, top: noPosition.y } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                No 🥀
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={resetGame}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="z-50 relative p-8 md:p-12 rounded-3xl bg-white/40 backdrop-blur-xl shadow-2xl border border-white/50 max-w-2xl w-full mx-4 text-center"
            >
              <button
                onClick={resetGame}
                className="absolute top-4 right-4 text-purple-700 hover:text-purple-900 transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
              </button>

              <h2 className="font-dancing text-6xl text-purple-700 mb-6">
                Thank you for being my valentine. I love you
              </h2>

              <div className="w-full aspect-video bg-gray-200 rounded-2xl mb-6 overflow-hidden flex items-center justify-center border-2 border-purple-200 border-dashed">
                <span className="text-purple-400">Put your photo here</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
