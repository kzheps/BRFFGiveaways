import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

import BoostyLogo from '../assets/icons/boosty.svg?react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1c1c1f] text-[#e7e7e7] py-4 border-t border-[#3a3a3c]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-2 md:mb-0">
            <span className="font-mono text-sm text-[#3a3a3c]">Version 0.1.0Beta</span>
          </div>

          <motion.div
            className="mb-2 md:mb-0 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <a href="https://boosty.to/kzheps" target="_blank" rel="noopener noreferrer" className="group font-mono text-[#3a3a3c] hover:text-brff-text transition-colors duration-200 flex items-center justify-center">
              Created by
              <span className="font-italic mx-1 text-purple-500 group-hover:text-purple-400 text-sm md:text-base relative">
                KZHEPS
                <BoostyLogo className="w-4 h-4 ml-1 inline-block text-[#3a3a3c] transition-all duration-300 group-hover:text-[#FF6B00] group-hover:drop-shadow-[0_0_8px_rgba(255,107,0,0.6)" />
              </span>
            </a>
          </motion.div>

          <motion.div
            className="font-mono text-[#3a3a3c] text-sm flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <span>Made with </span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                repeatType: "loop"
              }}
              className="inline-block mx-1"
            >
              <Heart className="h-4 w-4 text-purple-500 inline" />
            </motion.div>
            <span> for chief</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
