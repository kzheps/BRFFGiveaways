import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGiveawayStore } from '../store/giveawayStore';

import { Clock } from 'lucide-react';
import Key from '../assets/icons/warning.svg?react';

const KeywordInput: React.FC = () => {
  const {
    keyword,
    setKeyword,
    duration,
    setDuration,
    isActive,
    startGiveaway,
    endGiveaway,
    selectWinner
  } = useGiveawayStore();

  const [keywordInput, setKeywordInput] = useState(keyword);
  const [durationInput, setDurationInput] = useState(Math.floor(duration / 1000 / 60));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isActive) {
      setKeyword(keywordInput);
      setDuration(durationInput * 60 * 1000);
      startGiveaway();
    } else {
      endGiveaway();
      selectWinner();
    }
  };

  if (isActive) return null;

  return (
    <motion.div
      className="bg-[#1c1c1f] rounded-lg p-6 shadow-lg border border-[#3a3a3c]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="keyword"
            className="block text-[#e7e7e7] text-sm font-medium mb-2 flex items-center"
          >
            <Key className="h-4 w-4 mr-2 text-[#e7e7e7]" />
            Ключевое слово
          </label>
          <motion.input
            type="text"
            id="keyword"
            placeholder="Введите ключевое слово!"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            className="w-full bg-[#1a1a1a] rounded-md border-[#3a3a3c] text-[#e7e7e7] px-4 py-2 focus:ring-purple-500 focus:border-purple-500 placeholder:text-[#3a3a3c] placeholder:text-sm"
            whileFocus={{ scale: 1.01 }}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="duration"
            className="block text-[#e7e7e7] text-sm font-medium mb-2 flex items-center"
          >
            <Clock className="h-4 w-4 mr-2 text-[#e7e7e7]" />
            Продолжительность (В минутах)
          </label>
          <motion.input
            type="number"
            id="duration"
            min="1"
            max="60"
            value={durationInput}
            onChange={(e) => setDurationInput(parseInt(e.target.value))}
            className="w-full bg-[#1a1a1a] rounded-md border-[#3a3a3c] text-[#e7e7e7] px-4 py-2 focus:ring-purple-500 focus:border-purple-500"
            whileFocus={{ scale: 1.01 }}
            required
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2 px-4 rounded-md font-medium text-[#e7e7e7] bg-[#3a3a3c] hover:bg-[#1a1a1a] transition-colors duration-200 border border-[#3a3a3c]"
        >
          Начать розыгрыш
        </motion.button>
      </form>
    </motion.div>
  );
};

export default KeywordInput;
