import React, { useState } from 'react';
import { Twitch, Copy } from 'lucide-react';
import { cn } from '../utils/cn';

interface ChannelHeaderProps {
  channelName?: string;
}

const ChannelHeader: React.FC<ChannelHeaderProps> = ({ channelName }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('https://twitch.tv');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className={cn(
      "sticky top-0 z-10 py-4 px-6 sm:px-8",
      "bg-[url('/src/assets/uebotprime.jpg')]",
      "border-b border-slate-200 dark:border-slate-800",
      "transition-colors duration-300"
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="group flex flex-col items-start relative">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white transition-all duration-300 ease-in-out translate-y-1 group-hover:-translate-y-1">
              <span className="hidden sm:inline mr-2">BRFF LOVE IS ROLTON!</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block opacity-0 max-h-0 translate-y-2 group-hover:opacity-100 group-hover:max-h-20 group-hover:translate-y-0 transition-all duration-300 delay-150 ease-in-out overflow-hidden shadow-md rounded-md px-2 py-1 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
              — Как бы тут раздаривают фары с ролтоном
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {channelName && (
            <>
              <a
                href={`https://twitch.tv/${channelName}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "hidden sm:flex items-center px-3 py-2 text-sm",
                  "rounded bg-purple-100 text-purple-700",
                  "hover:bg-purple-200 transition-colors",
                  "dark:bg-purple-900 dark:text-purple-100 dark:hover:bg-purple-800"
                )}
              >
                <Twitch className="h-4 w-4 mr-2" />
                ttv/{channelName}
              </a>
              <button
                onClick={handleCopy}
                className={cn(
                  "flex items-center px-3 py-2 text-sm",
                  "rounded bg-purple-100 text-purple-700",
                  "hover:bg-purple-200 transition-colors",
                  "dark:bg-purple-900 dark:text-purple-100 dark:hover:bg-purple-800"
                )}
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? 'Скопировано!' : 'OBS Overlay'}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default ChannelHeader;
