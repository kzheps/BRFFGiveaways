import React, { useMemo } from 'react';
import { List, AutoSizer } from 'react-virtualized';
import { motion } from 'framer-motion';
import { useGiveawayStore } from '../store/giveawayStore';

import MOD from '../assets/icons/moderator.svg?react';
import VIP from '../assets/icons/vip.svg?react';
import SUB from '../assets/icons/subscriber.svg?react';
import Users from '../assets/icons/online.svg?react';

const ParticipantsList: React.FC = () => {
  const { participants, isActive, winner } = useGiveawayStore();

  const sortedParticipants = useMemo(() => {
    return [...participants].sort((a, b) => {
      if (a.isModerator && !b.isModerator) return -1;
      if (!a.isModerator && b.isModerator) return 1;
      if (a.isVIP && !b.isVIP) return -1;
      if (!a.isVIP && b.isVIP) return 1;
      if (a.isSubscriber && !b.isSubscriber) return -1;
      if (!a.isSubscriber && b.isSubscriber) return 1;
      return a.timestamp - b.timestamp;
    });
  }, [participants]);

  const rowRenderer = ({ index, key, style }: any) => {
    const participant = sortedParticipants[index];

    return (
      <motion.div
        key={key}
        style={style}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, delay: index * 0.01 }}
        className="flex items-center space-x-3 p-3 border-b border-[#3a3a3c] hover:bg-[#1a1a1a] transition-colors duration-200"
      >
        <div className="flex-shrink-0">
          {participant.isModerator ? (
            <MOD className="h-5 w-5 text-green-400" />
          ) : participant.isVIP ? (
            <VIP className="h-5 w-5 text-purple-400" />
          ) : participant.isSubscriber ? (
            <SUB className="h-5 w-5 text-blue-400" />
          ) : (
            <div className="h-5 w-5" />
          )}
        </div>

        <div className="flex-grow">
          <span
            className={`font-medium ${
              participant.isModerator
                ? 'text-green-400'
                : participant.isVIP
                  ? 'text-purple-400'
                  : participant.isSubscriber
                    ? 'text-yellow-400'
                    : 'text-[#e7e7e7]'
            }`}
          >
            {participant.displayName}
          </span>
        </div>
      </motion.div>
    );
  };

  if (!isActive && participants.length === 0) return null;

  const listHeight = winner ? 200 : 400;

  return (
    <motion.div
      className="bg-[#1c1c1f] rounded-lg p-6 shadow-lg border border-[#3a3a3c]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Users className="h-5 w-5 text-[#e7e7e7] mr-2" />
          <h2 className="text-[#e7e7e7] text-lg font-medium">УЧАСТНИКИ</h2>
        </div>
        <span className="bg-[#3a3a3c] text-[#e7e7e7] px-3 py-1 rounded-full text-sm">
          {participants.length}
        </span>
      </div>

      <div className="border border-[#3a3a3c] rounded-lg overflow-hidden" style={{ height: listHeight }}>
        {participants.length === 0 ? (
          <div className="h-full flex items-center justify-center text-[#3a3a3c]">
            Нищий стример, без зрителей пока-что
          </div>
        ) : (
          <AutoSizer>
            {({ width, height }) => (
              <List
                width={width}
                height={height}
                rowCount={sortedParticipants.length}
                rowHeight={48}
                rowRenderer={rowRenderer}
                overscanRowCount={5}
              />
            )}
          </AutoSizer>
        )}
      </div>
    </motion.div>
  );
}

export default ParticipantsList;
