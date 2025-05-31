import { useEffect } from 'react';
import tmi from 'tmi.js';

export interface ChatUser {
  username: string;
  displayName: string;
  isSubscriber: boolean;
  isMod: boolean;
  isVip: boolean;
  message: string;
}

export function useTwitchChat(
  channel: string,
  onMessage: (user: ChatUser) => void
) {
  useEffect(() => {
    if (!channel) return;

    const client = new tmi.Client({
      options: { debug: false },
      connection: { reconnect: true, secure: true },
      channels: [channel],
    });

    client.connect();

    client.on('message', (_, userstate, message) => {
      const user: ChatUser = {
        username: userstate.username || '',
        displayName: userstate['display-name'] || userstate.username || '',
        isSubscriber: !!userstate.subscriber,
        isMod: !!userstate.mod,
        isVip: userstate.badges?.vip === '1',
        message,
      };

      onMessage(user);
    });

    return () => {
      client.disconnect();
    };
  }, [channel, onMessage]);
}
