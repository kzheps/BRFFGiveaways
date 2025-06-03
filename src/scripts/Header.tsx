import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

import TwitchLogo from '../assets/icons/twitch.svg?react';

const Header: React.FC = () => {
  return (
    <motion.header
      className="bg-gradient-to-r from-[#1f1135]/80 via-[#2b1a47]/80 to-[#1f1135]/80 backdrop-blur-sm border-b border-purple-500/20 text-white p-6 shadow-lg transition-all duration-1000 ease-in-out"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div
          className="flex items-center space-x-3 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onClick={() => window.location.reload()}
        >
          <div className="relative">
            <TwitchLogo className="h-8 w-8 text-purple-400" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="h-4 w-4 text-purple-300" />
            </motion.div>
          </div>
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#9146FF] via-[#A970FF] to-[#BF94FF] bg-clip-text text-transparent transition-all duration-1000 ease-in-out">
              TTV/BRATISHKINOFF
            </span>
            <div className="text-xs text-purple-400/80">Нажми чтоб обновить</div>
          </div>
        </motion.div>

        <motion.nav>
          <motion.a
            href="https://ue.bot"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block rounded-xl overflow-hidden border border-purple-500/30 text-white px-4 py-2 cursor-pointer"
            initial="initial"
            whileHover="hovered"
            whileTap={{ scale: 0.97 }}
          >
            <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: "url('https://i.imgur.com/MbLwoPR.jpeg')" }}
  />
            <span className="relative z-10 flex items-center justify-center h-full w-full font-semibold text-sm">ue.bot - Пополняй баланс и покупай любимые игры!</span>
            <motion.div
              className="absolute inset-0"
              variants={{
                hovered: { opacity: 0.6, filter: 'blur(3px)' },
                initial: { opacity: 1, filter: 'blur(8px)' },
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                WebkitBackdropFilter: 'blur(8px)',
                backdropFilter: 'blur(8px)',
              }}
            />
          </motion.a>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default Header;
