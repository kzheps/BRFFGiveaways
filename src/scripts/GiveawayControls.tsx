import React from 'react';
import { motion } from 'framer-motion';
import { useGiveawayStore } from '../store/giveawayStore';

import SUB from '../assets/icons/subscriber.svg?react';
import Users from '../assets/icons/online.svg?react';

const SettingsToggle: React.FC = () => {
  const { participationMode, setParticipationMode, isActive } = useGiveawayStore();

  const handleModeChange = (mode: 'all' | 'subscribers') => {
    if (!isActive) {
      setParticipationMode(mode);
    }
  };

  return (
    <motion.div
      className="bg-[#1c1c1f] rounded-lg p-6 shadow-lg border border-[#3a3a3c]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <h2 className="text-[#e7e7e7] text-lg font-medium mb-4">ТИП РОЗЫГРЫША</h2>

      <div className="flex space-x-4">
        <motion.div
          onClick={() => handleModeChange('all')}
          whileHover={!isActive ? { scale: 1.03 } : {}}
          whileTap={!isActive ? { scale: 0.97 } : {}}
          className={`flex-1 p-4 rounded-lg cursor-pointer duration-200 flex flex-col items-center justify-center border-2 transition-colors ${
            participationMode === 'all'
              ? 'border-[#3a3a3c] bg-[#1a1a1a] text-[#e7e7e7]'
              : 'border-[#3a3a3c] bg-[#1c1c1f] text-[#3a3a3c]'
          } ${isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Users className="h-4 w-4 mb-2" />
          <span className="font-medium">Для всех желающих</span>
        </motion.div>

        <motion.div
          onClick={() => handleModeChange('subscribers')}
          whileHover={!isActive ? { scale: 1.03 } : {}}
          whileTap={!isActive ? { scale: 0.97 } : {}}
          className={`flex-1 p-4 rounded-lg cursor-pointer duration-200 flex flex-col items-center justify-center border-2 transition-colors ${
            participationMode === 'subscribers'
              ? 'border-[#3a3a3c] bg-[#1a1a1a] text-[#e7e7e7]'
              : 'border-[#3a3a3c] bg-[#1c1c1f] text-[#3a3a3c]'
          } ${isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <SUB className={`h-6 w-6 mb-2 transition-all duration-200 ${
            participationMode === 'subscribers'
              ? 'filter-none'
              : 'brightness-50'
          }`} />
          <span className="font-medium">Только Subscribers</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SettingsToggle;
