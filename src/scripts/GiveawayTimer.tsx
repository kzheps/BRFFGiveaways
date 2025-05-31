import React, { useEffect, useState } from 'react';
import { cn } from '../utils/cn';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Timer } from 'lucide-react';

interface GiveawayTimerProps {
  endTime: Date | null;
  isActive: boolean;
  onTimerEnd: () => void;
  drawWinner: () => void;
  hasEnded: boolean;
  status: 'idle' | 'active' | 'drawing' | 'completed';
}

const GiveawayTimer: React.FC<GiveawayTimerProps> = ({
  endTime,
  isActive,
  onTimerEnd,
  drawWinner,
  hasEnded,
  status,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (!isActive || !endTime) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = endTime.getTime();
      const diff = Math.max(0, Math.floor((end - now) / 1000));
      setTimeLeft(diff);

      if (diff <= 0) {
        clearInterval(interval);
        onTimerEnd();
        drawWinner();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, endTime, onTimerEnd, drawWinner, status]);

  useEffect(() => {
    if (!isActive || !endTime) {
      setTimeLeft(0);
    }
  }, [isActive, endTime]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  let displayText = '';
  switch (status) {
    case 'drawing':
      displayText = 'Выбор победителя...';
      break;
    case 'completed':
      displayText = 'Время вышло!';
      break;
    case 'idle':
      displayText = 'Ожидание';
      break;
    case 'active':
      displayText = formatTime(timeLeft);
      break;
    default:
      displayText = '';
  }

  const shouldPulse = status === 'active' && timeLeft <= 10;

  return (
    <Card gradient className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">ТАЙМЕР</CardTitle>
        <Timer className="h-5 w-5 text-purple-500" />
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            'flex justify-center mt-4 text-3xl font-bold',
            'bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent',
            shouldPulse && 'animate-pulse'
          )}
        >
          {displayText}
        </div>
      </CardContent>
    </Card>
  );
};

export default GiveawayTimer;
