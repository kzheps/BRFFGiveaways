export interface Participant {
  id: string;
  username: string;
  displayName: string;
  message: string;
  timestamp: number;
  isSubscriber: boolean;
  isVIP: boolean;
  isModerator: boolean;
  badges: Record<string, string>;
}

export interface Winner extends Participant {
  recentMessages: string[];
}

export type ParticipationMode = 'all' | 'subscribers';

export interface GiveawayState {
  isActive: boolean;
  keyword: string;
  participants: Participant[];
  winner: Winner | null;
  endTime: number | null;
  duration: number;
  participationMode: ParticipationMode;
}
