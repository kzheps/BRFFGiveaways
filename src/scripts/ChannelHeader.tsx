import React from 'react';
import { Twitch } from 'lucide-react';
import { cn } from '../utils/cn';

interface ChannelHeaderProps {
  channelName?: string;
}

const ChannelHeader: React.FC<ChannelHeaderProps> = ({ channelName }) => {
  return (
    <header
      className={cn(
        'sticky top-0 z-10 py-4 px-6 sm:px-8',
        "bg-[url('/src/assets/uebotprime.jpg')] bg-cover bg-center",
        'border-b border-slate-700'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="group flex flex-col items-start relative">
            <h1 className="text-xl font-bold text-white translate-y-1 group-hover:-translate-y-1 transition-transform">
              <span className="hidden sm:inline mr-2">BRFF LOVE IS ROLTON!</span>
            </h1>
            <p className="text-xs text-slate-300 hidden sm:block opacity-0 max-h-0 translate-y-2 group-hover:opacity-100 group-hover:max-h-20 group-hover:translate-y-0 transition-all duration-300 delay-150 overflow-hidden shadow-md rounded-md px-2 py-1 bg-slate-900/70 backdrop-blur-sm">
              — Как бы тут раздаривают фары с ролтоном
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <a
            href={`https://twitch.tv/${channelName ?? 'bratishkinoff'}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'hidden sm:flex items-center px-3 py-2 text-sm',
              'rounded bg-purple-900 text-purple-100 hover:bg-purple-800 transition-colors',
              !channelName && 'opacity-50 pointer-events-none'
            )}
          >
            <Twitch className="h-4 w-4 mr-2" />
            ttv/{channelName ?? 'bratishkinoff'}
          </a>
        </div>
      </div>
    </header>
  );
};

export default ChannelHeader;
