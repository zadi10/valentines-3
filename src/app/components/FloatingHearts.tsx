"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingHearts() {
    const [hearts, setHearts] = useState<{ id: number; left: number; duration: number; delay: number }[]>([]);

    useEffect(() => {
        const newHearts = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            duration: Math.random() * 10 + 10, // 10-20s duration
            delay: Math.random() * 10,
        }));
        setHearts(newHearts);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    className="absolute bottom-[-50px] text-pink-300 opacity-50 text-4xl"
                    style={{ left: `${heart.left}%` }}
                    animate={{
                        y: [-50, -1200], // Move up off-screen (approx height)
                        opacity: [0, 0.8, 0],
                    }}
                    transition={{
                        duration: heart.duration,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: "linear",
                    }}
                >
                    ❤️
                </motion.div>
            ))}
        </div>
    );
}
