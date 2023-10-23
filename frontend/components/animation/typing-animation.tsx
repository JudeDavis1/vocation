import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TypingAnimationProps {
  text: string;
  delay?: number;
  stiffness?: number;
  className?: string;
}

export function TypingAnimation({
  text,
  delay = 0.1,
  stiffness = 1000,
  className,
}: TypingAnimationProps) {
  const characters = [...text];

  return (
    <div className={className}>
      <AnimatePresence>
        {characters.map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, x: "-0.5rem" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              delay: index * delay,
              type: "spring",
              stiffness: stiffness,
              damping: 30,
            }}
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
