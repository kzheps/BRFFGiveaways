import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGiveawayStore } from '../store/giveawayStore';
import Tooltip from './UI/Tooltip'

import Timer from '../assets/icons/hourglass.svg?react';
import Outcomes from '@/assets/icons/outcomes.svg?react';

const GiveawayTimer: React.FC = () => {
  const { isActive, endTime, endGiveaway, selectWinner, keyword, participationMode } = useGiveawayStore();
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isNearEnd, setIsNearEnd] = useState<boolean>(false);

  useEffect(() => {
  window.electronAPI?.receive('giveaway-ended', (message: string) => {
    console.log(message);
  });

  return () => {
    window.electronAPI?.receive('giveaway-ended', () => {});
  };
}, []);

  useEffect(() => {
    if (!isActive || !endTime) return;

    const calculateTimeLeft = () => {
      const difference = endTime - Date.now();
      if (difference <= 0) {
        endGiveaway();
        return 0;
      }
      setIsNearEnd(difference <= 10000);
      return difference;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      if (newTimeLeft <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, endTime, endGiveaway]);

  if (!isActive) return null;

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  const formatTime = (value: number): string => value.toString().padStart(2, '0');

  const handleEndGiveaway = () => {
    endGiveaway();
    selectWinner();
    window.electronAPI?.send('end-giveaway', null);
  };

  return (
    <motion.div
      className={`bg-[#1c1c1f] rounded-lg p-6 shadow-lg border border-[#3a3a3c] ${isActive ? 'w-full' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Timer className="h-6 w-6 text-[#e7e7e7]" />
          <h2 className="text-xl font-semibold text-[#e7e7e7]">ТАЙМЕР</h2>
          <div className="bg-[#1a1a1a] px-4 py-2 rounded-lg">
            <span className="text-[#e7e7e7] text-sm">
              {participationMode === 'subscribers' ? 'Только для подписчиков' : 'Для всех'}
            </span>
          </div>
        </div>
        <Tooltip text="Завершение розыгрыша">
        <motion.button
          onClick={handleEndGiveaway}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg bg-[#3a3a3c] text-[#e7e7e7] hover:bg-red-500/20"
        >
          <Outcomes className="h-5 w-5" />
        </motion.button>
      </Tooltip>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="bg-[#1a1a1a] px-6 py-3 rounded-lg w-full text-center">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-[#e7e7e7] font-bold uppercase">{keyword}</span>
          </div>
        </div>

        <motion.div
          className={`text-4xl font-bold text-[#e7e7e7] flex items-center ${
            isNearEnd ? 'animate-pulse' : ''
          }`}
        >
          <span className="bg-[#1a1a1a] px-6 py-3 rounded-lg">{formatTime(minutes)}</span>
          <span className="mx-2 text-[#3a3a3c]">:</span>
          <span className="bg-[#1a1a1a] px-6 py-3 rounded-lg">{formatTime(seconds)}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GiveawayTimer;
