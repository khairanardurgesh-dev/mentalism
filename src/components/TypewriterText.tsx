"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function TypewriterText({ text, speed = 50, className = "" }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-2 h-5 bg-accent ml-1"
      />
    </motion.span>
  );
}
