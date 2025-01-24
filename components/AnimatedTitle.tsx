import React from 'react';
import { motion } from 'framer-motion';

const AnimatedTitle = () => {
  const letters = "Emergency Requests".split("");
  
  return (
    <div className="flex">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="text-2xl font-bold text-gray-800 hover:text-red-500"
          whileHover={{
            scale: 1.2,
            color: '#EF4444',
            textShadow: "0 0 8px rgba(239, 68, 68, 0.3)",
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 10
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
};

export default AnimatedTitle;