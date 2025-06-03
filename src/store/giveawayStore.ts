import { create } from 'zustand';
import { GiveawayState, Participant, ParticipationMode, Winner } from '../types';

interface GiveawayStore extends GiveawayState {
  setKeyword: (keyword: string) => void;
  setDuration: (duration: number) => void;
  setParticipationMode: (mode: ParticipationMode) => void;
  startGiveaway: () => void;
  endGiveaway: () => void;
  addParticipant: (participant: Participant) => void;
  selectWinner: () => void;
  reset: () => void;
  updateWinnerMessages: (username: string, message: string) => void;
}

const initialState: GiveawayState = {
  isActive: false,
  keyword: '',
  participants: [],
  winner: null,
  endTime: null,
  duration: 60 * 1000, // 1 min
  participationMode: 'all',
};

export const useGiveawayStore = create<GiveawayStore>((set, get) => ({
  ...initialState,

  setKeyword: (keyword) => set({ keyword }),

  setDuration: (duration) => set({ duration }),

  setParticipationMode: (mode) => set({ participationMode: mode }),

  startGiveaway: () => {
    const { duration } = get();
    set({
      isActive: true,
      participants: [],
      winner: null,
      endTime: Date.now() + duration,
    });
  },

  endGiveaway: () => {
    set({ isActive: false });
  },

  addParticipant: (participant) => {
    const { participants, participationMode, isActive } = get();

    if (!isActive) return;

    if (participationMode === 'subscribers' && !participant.isSubscriber) return;

    const existingParticipant = participants.find(p => p.username === participant.username);
    if (existingParticipant) return;

    set({ participants: [...participants, participant] });
  },

  selectWinner: () => {
    const { participants } = get();
    if (participants.length === 0) return;

    const randomIndex = Math.floor(Math.random() * participants.length);
    const selectedParticipant = participants[randomIndex];

    const winner: Winner = {
      ...selectedParticipant,
      recentMessages: [selectedParticipant.message]
    };

    set({ winner, isActive: false });
  },

  updateWinnerMessages: (username, message) => {
    const { winner } = get();
    if (!winner || winner.username !== username) return;

    const updatedWinner = {
      ...winner,
      recentMessages: [...winner.recentMessages, message].slice(-5)
    };

    set({ winner: updatedWinner });
  },

  reset: () => set(initialState)
}));
