import React from 'react';
import { useGiveaway } from '../hooks/useGiveaway';
import { useTwitchChat } from '../hooks/useTwitchChat';

const OBSOverlay: React.FC = () => {
  const {
    state,
    endTime,
  } = useGiveaway('bratishkinoff');

  const timeLeft = React.useMemo(() => {
    if (!endTime) return '00:00';
    const diff = Math.max(0, Math.floor((endTime.getTime() - Date.now()) / 1000));
    const mins = Math.floor(diff / 60).toString().padStart(2, '0');
    const secs = (diff % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }, [endTime, state.status]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-transparent text-white font-bold text-shadow-xl relative">
      {state.status === 'active' ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl uppercase tracking-widest">
          {state.keyword}
        </div>
      ) : null}

      <div className="absolute bottom-4 left-4 text-2xl">
        {state.status === 'active' ? timeLeft : ''}
      </div>

      <div className="absolute bottom-4 right-4 text-2xl">
        {state.participants.length} участник{state.participants.length === 1 ? '' : 'ов'}
      </div>

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
        Created by KZHEPS
      </div>
    </div>
  );
};

export default OBSOverlay;
