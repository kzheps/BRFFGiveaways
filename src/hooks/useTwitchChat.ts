import { useEffect, useRef } from 'react';
import tmi from 'tmi.js';
import { useGiveawayStore } from '../store/giveawayStore';
import { Participant } from '../types';

export const useTwitchChat = () => {
  const clientRef = useRef<tmi.Client | null>(null);
  const {
    isActive,
    keyword,
    addParticipant,
    winner,
    updateWinnerMessages
  } = useGiveawayStore();

  useEffect(() => {
    const client = new tmi.Client({
      channels: ['bratishkinoff']
    });

    client.connect().catch(console.error);
    clientRef.current = client;

    client.on('message', (channel, tags, message, self) => {
      if (self) return;

      const username = tags.username || '';
      const displayName = tags['display-name'] || username;

      if (winner && winner.username === username) {
        updateWinnerMessages(username, message);
        return;
      }

      if (isActive && message.trim().toLowerCase() === keyword.toLowerCase()) {
        const participant: Participant = {
          id: tags.id || '',
          username,
          displayName,
          message,
          timestamp: Date.now(),
          isSubscriber: !!tags.subscriber,
          isVIP: !!tags.vip,
          isModerator: !!tags.mod,
          badges: tags.badges || {}
        };

        addParticipant(participant);
      }
    });

    return () => {
      if (clientRef.current) {
        clientRef.current.disconnect();
        clientRef.current = null;
      }
    };
  }, [isActive, keyword, winner, addParticipant, updateWinnerMessages]);

  return { client: clientRef.current };
};
