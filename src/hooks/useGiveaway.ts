import { useState, useCallback, useRef } from 'react';
import { GiveawayState, Participant, ChatUser, ChatMessage } from '../types';
import { useTwitchChat } from './useTwitchChat';
import { v4 as uuidv4 } from 'uuid';

export const useGiveaway = (initialChannel = '') => {
  const [state, setState] = useState<Omit<GiveawayState, 'participants'>>({
    status: 'idle',
    channelName: initialChannel,
    keyword: '',
    timer: 0,
    winner: null,
    restrictions: { subscribersOnly: false, chattersOnly: false },
  });

  const [participantsMap, setParticipantsMap] = useState<Map<string, Participant>>(new Map());
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [hasTimerEnded, setHasTimerEnded] = useState(false);

  const queueRef = useRef<ChatUser[]>([]);
  const flushTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const flushQueue = () => {
    setParticipantsMap(prevMap => {
      const newMap = new Map(prevMap);
      queueRef.current.forEach(user => {
        if (!newMap.has(user.username)) {
          newMap.set(user.username, {
            id: uuidv4(),
            username: user.username,
            displayName: user.displayName,
            entryTime: Date.now(),
            roles: {
              isSubscriber: user.isSubscriber,
              isModerator: user.isMod,
              isVIP: user.isVip,
              isFollower: false,
            },
          });
        }
      });
      return newMap;
    });
    queueRef.current = [];
    flushTimeoutRef.current = null;
  };

  const enqueueParticipant = (user: ChatUser) => {
    if (state.restrictions?.subscribersOnly && !user.isSubscriber) return;
    queueRef.current.push(user);
    if (!flushTimeoutRef.current) {
      flushTimeoutRef.current = setTimeout(flushQueue, 250);
    }
  };

  useTwitchChat(state.channelName, (user) => {
    const isActive = state.status === 'active';
    const keywordMatched = user.message.toLowerCase().includes(state.keyword.toLowerCase());

    if (isActive && keywordMatched) {
      enqueueParticipant(user);
    }

    if (state.status === 'completed' && state.winner?.username === user.username) {
      const newMessage: ChatMessage = {
        id: uuidv4(),
        content: user.message,
        timestamp: Date.now(),
      };

      setState(prev => {
        if (!prev.winner) return prev;
        const updatedWinner = {
          ...prev.winner,
          messages: [...(prev.winner.messages || []), newMessage].slice(-10),
        };
        return {
          ...prev,
          winner: updatedWinner,
        };
      });
    }
  });

  const startGiveaway = useCallback((duration: number, keyword: string) => {
    setState(prev => ({
      ...prev,
      status: 'active',
      keyword,
      timer: duration,
      winner: null,
    }));
    setParticipantsMap(new Map());
    setHasTimerEnded(false);
    const end = new Date();
    end.setSeconds(end.getSeconds() + duration);
    setEndTime(end);
  }, []);

  const stopGiveaway = useCallback(() => {
    setState(prev => ({ ...prev, status: 'idle' }));
    setEndTime(null);
    setHasTimerEnded(true);
  }, []);

  const resetGiveaway = useCallback(() => {
    setState(prev => ({
      ...prev,
      status: 'idle',
      keyword: '',
      timer: 0,
      winner: null,
    }));
    setParticipantsMap(new Map());
    setEndTime(null);
    setHasTimerEnded(false);
  }, []);

  const drawWinner = useCallback(() => {
    setParticipantsMap(prevMap => {
      const entries = Array.from(prevMap.entries());
      const eligible = state.winner
        ? entries.filter(([username]) => username !== state.winner?.username)
        : entries;

      if (eligible.length === 0) return prevMap;

      const [randomUsername, participant] = eligible[Math.floor(Math.random() * eligible.length)];

      setState(prev => ({
        ...prev,
        status: 'completed',
        winner: {
          ...participant,
          messages: [],
        },
      }));

      return prevMap;
    });
  }, [state.winner]);

  const setChannelName = useCallback((channelName: string) => {
    setState(prev => ({ ...prev, channelName }));
  }, []);

  const updateRestrictions = useCallback((newRestrictions: Partial<GiveawayState['restrictions']>) => {
    setState(prev => ({
      ...prev,
      restrictions: {
        ...prev.restrictions,
        ...newRestrictions,
      },
    }));
  }, []);

  const handleTimerEnd = useCallback(() => {
    setState(prev => (prev.status !== 'active' ? prev : { ...prev, status: 'idle' }));
    setEndTime(null);
    setHasTimerEnded(true);
  }, []);

  return {
    state: {
      ...state,
      participants: Array.from(participantsMap.values()),
    },
    endTime,
    startGiveaway,
    stopGiveaway,
    resetGiveaway,
    drawWinner,
    setChannelName,
    updateRestrictions,
    handleTimerEnd,
    hasTimerEnded,
  };
};
