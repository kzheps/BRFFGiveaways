import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './UI/Card';
import { Crown, MessageSquare } from 'lucide-react';
import { Winner } from '../types';
import { cn } from '../utils/cn';
import Confetti from 'react-confetti';

interface WinnerDisplayProps {
  winner: Winner | null;
}

const WinnerDisplay: React.FC<WinnerDisplayProps> = ({ winner }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    if (winner) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [winner]);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.1}
          colors={['#9146FF', '#F0F4FF', '#6B21A8', '#D8B4FE', '#4C1D95']}
        />
      )}

      <Card className={cn(
        "w-full transition-all duration-500",
        winner ? "border-2 border-purple-500 shadow-lg" : ""
      )}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">ПОБЕДИТЕЛЬ</CardTitle>
          <Crown className={cn(
            "h-5 w-5 transition-colors duration-300",
            winner ? "text-yellow-500" : "text-slate-400"
          )} />
        </CardHeader>
        <CardContent>
          {winner ? (
            <div className="space-y-4">
              <div className={cn(
                "flex items-center justify-center p-4",
                "bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg",
                "animate-fadeInScale"
              )}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {winner.displayName}
                  </div>
                  <div className="text-sm text-purple-200">
                    @{winner.username}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 text-purple-500 mr-2" />
                  <span className="text-sm font-medium">Сообщения</span>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {winner.messages.map((message) => (
                    <div
                      key={message.id}
                      className="p-2 rounded bg-slate-50 dark:bg-slate-800 text-sm animate-fadeIn"
                    >
                      <div className="text-slate-900 dark:text-slate-100">
                        {message.content}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-slate-400 dark:text-slate-600">
              Не вычислен счастливчик из чата
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default WinnerDisplay;
