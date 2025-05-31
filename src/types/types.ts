export interface Participant {
  id: string;
  username: string;
  displayName: string;
  entryTime: Date;
  avatarUrl?: string;
}

export interface Winner extends Participant {
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
}

export interface GiveawayState {
  status: 'idle' | 'active' | 'drawing' | 'completed';
  channelName: string;
  keyword: string;
  timer: number;
  participants: Participant[];
  winner: Winner | null;
}
