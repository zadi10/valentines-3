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
            <h1 className="font-dancing text-6xl md:text-8xl text-[#d14468] drop-shadow-sm">
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
                className="rounded-xl bg-white hover:bg-gray-50 text-black font-bold py-3 px-8 text-xl shadow-md transition-colors duration-200 whitespace-nowrap"
                animate={hasMoved ? { left: noPosition.x, top: noPosition.y } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                No 🥀
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-50 relative p-8 md:p-12 rounded-3xl bg-white/40 backdrop-blur-xl shadow-2xl border border-white/50 max-w-2xl w-full mx-4 text-center"
          >
            <h2 className="font-dancing text-6xl text-[#d14468] mb-6">
              Yay! You said Yes! ❤️
            </h2>

            <div className="w-full aspect-video bg-pink-100 rounded-2xl mb-6 overflow-hidden flex items-center justify-center">
              {/* Placeholder for GIF */}
              <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3h5YXo5Z3Q0Z3Q0Z3Q0Z3Q0Z3Q0Z3Q0Z3Q0/26BRv0ThflsKCqLXG/giphy.gif" alt="Romantic GIF" className="w-full h-full object-cover" />
            </div>

            <p className="font-inter text-xl text-gray-800 mb-8 leading-relaxed">
              I'm so happy! I can't wait to spend Valentine's Day with you.
              It's going to be magical! 💖
            </p>

            <button
              onClick={resetGame}
              className="rounded-full bg-white/80 hover:bg-white text-[#d14468] font-bold py-2 px-6 shadow-sm transition-all"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
