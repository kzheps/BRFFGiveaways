import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGiveawayStore } from '../store/giveawayStore';

import { ExternalLink, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import Refreshh from '../assets/icons/refresh.svg?react';
import WINBOT from '../assets/icons/award.svg?react';
import Feedback from '../assets/icons/feedback.svg?react';
import MOD from '../assets/icons/moderator.svg?react';
import VIP from '../assets/icons/vip.svg?react';
import SUB from '../assets/icons/subscriber.svg?react';

const WinnerDisplay: React.FC = () => {
  const { winner, selectWinner } = useGiveawayStore();

  useEffect(() => {
    if (winner) {

      const colors = ['#9146FF', '#F0F4FF', '#6B21A8', '#D8B4FE', '#4C1D95'];
      confetti({
        particleCount: 300,
        angle: 90,
        spread: 120,
        origin: { x: 0.5, y: 0 },
        colors,
        gravity: 1.0,
        ticks: 500,
        scalar: 1.2
      });
    }
  }, [winner]);

  if (!winner) return null;

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const moscowTime = new Date(date.getTime() + (3 * 60 * 60 * 1000));
    return moscowTime.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC'
    });
  };

  return (
    <AnimatePresence mode="wait">

      {winner && (
        <motion.div
          onClick={selectWinner}
          className="bg-[#1c1c1f] rounded-lg overflow-hidden shadow-lg mb-6 border-2 border-purple-500"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{
          duration: 0.4,
          type: "spring",
          stiffness: 80
        }}
       >
       <motion.div
          className="bg-gradient-to-r from-[#6441a5] to-[#9146ff] p-4"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
      >
          <div className="flex items-center justify-center">
            <WINBOT className="h-8 w-8 text-[#e7e7e7] mr-2" />
            <h2 className="text-2xl font-bold text-[#e7e7e7]">ПОБЕДИТЕЛЬ!</h2>

            <motion.button onClick={() => selectWinner()} className="ml-4 text-[#e7e7e7] hover:text-purple-200 transition-colors" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} title="Переизбрать победителя">
              <Refreshh className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>

        <div className="p-6">
          <motion.div
            className="flex items-center justify-center mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center space-x-2">
              {winner.isModerator ? (
                <MOD className="h-6 w-6 text-green-400" />
              ) : winner.isVIP ? (
                <VIP className="h-6 w-6 text-purple-400" />
              ) : winner.isSubscriber ? (
                <SUB className="h-6 w-6 text-yellow-400" />
              ) : null}
              <h3 className="text-3xl font-bold text-[#e7e7e7]">{winner.displayName}</h3>
              <motion.a
                href={`https://twitch.tv/${winner.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          <div className="mt-6">
            <div className="flex items-center text-[#e7e7e7] mb-2">
              <Feedback className="h-5 w-5 text-purple-400 mr-2" />
              <h4 className="font-medium">Сообщения</h4>
            </div>

            <div className="space-y-2 mt-3">
              {winner.recentMessages.map((message, index) => (
                <motion.div
                  key={index}
                  className="bg-[#1a1a1a] p-3 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[#e7e7e7] break-words">{message}</p>
                    <div className="flex items-center text-xs text-[#3a3a3c] ml-2">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{formatTime(winner.timestamp)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    )}
    </AnimatePresence>
  );
};

export default WinnerDisplay;
