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
            <span className="text-sm text-[#3a3a3c]">Version 0.1.0Beta</span>
          </div>

          <motion.div
            className="mb-2 md:mb-0 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <a href="https://boosty.to/kzheps" target="_blank" rel="noopener noreferrer" className="text-[#3a3a3c] hover:text-brff-text transition-colors duration-200 flex items-center space-x-2">
              Created by
              <span className="font-bold mx-1 text-[#e7e7e7]">KZHEPS</span>
              <BoostyLogo className="w-4 h-4 animate-float bg-[#3a3a3c]" />
            </a>
          </motion.div>

          <motion.div
            className="text-sm flex items-center"
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
              <Heart className="h-4 w-4 text-red-500 inline" />
            </motion.div>
            <span> for chief</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
