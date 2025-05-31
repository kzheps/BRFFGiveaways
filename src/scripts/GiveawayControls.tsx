import React, { useState } from 'react';
import Button from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { Play, Pause, RotateCw, Users, Award } from 'lucide-react';
import { cn } from '../utils/cn';
import Toast from './ui/Toast';

interface GiveawayControlsProps {
  status: 'idle' | 'active' | 'drawing' | 'completed';
  onStart: (duration: number, keyword: string, restrictions: { subscribersOnly: boolean; chattersOnly: boolean }) => void;
  onStop: () => void;
  onReset: () => void;
  onDrawWinner: () => void;
  participantsCount: number;
}

const GiveawayControls: React.FC<GiveawayControlsProps> = ({
  status,
  onStart,
  onStop,
  onReset,
  onDrawWinner,
  participantsCount
}) => {
  const [duration, setDuration] = useState(300);
  const [keyword, setKeyword] = useState('');
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [subscribersOnly, setSubscribersOnly] = useState(false);
  const [chattersOnly, setChattersOnly] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' } | null>(null);

  const durations = [
    { label: '1:00', value: 60 },
    { label: '2:00', value: 120 },
    { label: '5:00', value: 300 },
    { label: '10:00', value: 600 },
    { label: '15:00', value: 900 },
    { label: '30:00', value: 1800 },
  ];

  const handleStart = () => {
    if (!keyword.trim()) {
      setToast({ message: 'Введите ключевое слово!', type: 'error' });
      return;
    }

    if (!subscribersOnly && !chattersOnly) {
      setToast({ message: 'Выберите тип розыгрыша!', type: 'error' });
      return;
    }

    onReset();
    onStart(duration, keyword, { subscribersOnly, chattersOnly });
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleRestrictionChange = (type: 'subscribers' | 'chatters') => {
    if (type === 'subscribers') {
      setSubscribersOnly(true);
      setChattersOnly(false);
    } else {
      setChattersOnly(true);
      setSubscribersOnly(false);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Card className="w-full">
        <CardContent>
          <div className="space-y-4">
            {status === 'idle' && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Ключевое слово
                  </label>
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className={cn(
                      "w-full px-3 py-2 text-sm rounded-md",
                      "border border-slate-300 dark:border-slate-700",
                      "bg-white dark:bg-slate-800",
                      "focus:outline-none focus:ring-2 focus:ring-purple-500"
                    )}
                    placeholder="Введите ключевое слово..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Продолжительность
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDurationOpen(!isDurationOpen)}
                      className={cn(
                        "w-full flex items-center justify-between",
                        "px-3 py-2 text-sm rounded-md",
                        "border border-slate-300 dark:border-slate-700",
                        "bg-white dark:bg-slate-800",
                        "focus:outline-none focus:ring-2 focus:ring-purple-500"
                      )}
                    >
                      <span>{formatDuration(duration)}</span>
                      <svg
                        className="h-4 w-4 text-slate-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isDurationOpen && (
                      <div className={cn(
                        "absolute z-10 mt-1 w-full rounded-md shadow-lg",
                        "bg-white dark:bg-slate-800",
                        "border border-slate-200 dark:border-slate-700",
                        "animate-fadeIn"
                      )}>
                        <div className="py-1">
                          {durations.map((item) => (
                            <button
                              key={item.value}
                              onClick={() => {
                                setDuration(item.value);
                                setIsDurationOpen(false);
                              }}
                              className={cn(
                                "w-full text-left px-4 py-2 text-sm",
                                "hover:bg-slate-100 dark:hover:bg-slate-700",
                                duration === item.value && "bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-100"
                              )}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  <label className={cn(
                    "relative flex items-center gap-2 p-3 rounded-lg cursor-pointer",
                    "border-2 transition-colors",
                    subscribersOnly
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                      : "border-slate-200 dark:border-slate-700"
                  )}>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={subscribersOnly}
                      onChange={() => handleRestrictionChange('subscribers')}
                    />
                    <span className="text-sm font-medium">
                      Среди Subscribers
                    </span>
                  </label>

                  <label className={cn(
                    "relative flex items-center gap-2 p-3 rounded-lg cursor-pointer",
                    "border-2 transition-colors",
                    chattersOnly
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                      : "border-slate-200 dark:border-slate-700"
                  )}>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={chattersOnly}
                      onChange={() => handleRestrictionChange('chatters')}
                    />
                    <span className="text-sm font-medium">
                      Для всех желающих
                    </span>
                  </label>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full flex items-center justify-center"
                  onClick={handleStart}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Начать розыгрыш
                </Button>
              </>
            )}

            {status === 'active' && (
              <div className="space-y-4">
                <p className="text-sm text-center text-slate-500 dark:text-slate-400">
                  Розыгрыш активен в данный момент
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={onStop}
                  >
                    <Pause className="h-4 w-4 mr-2" />
                    Прервать
                  </Button>
                  <Button
                    variant="primary"
                    onClick={onDrawWinner}
                    disabled={participantsCount === 0}
                  >
                    <Award className="h-4 w-4 mr-2" />
                    Досрочно определить
                  </Button>
                </div>
              </div>
            )}

            {(status === 'drawing' || status === 'completed') && (
              <div className="space-y-4">
                <p className="text-sm text-center text-slate-500 dark:text-slate-400">
                  {status === 'drawing' ? 'Выбираетесь счастливчик...' : 'Победитель найден!'}
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={onReset}
                >
                  <RotateCw className="h-4 w-4 mr-2" />
                  Повторить розыгрыш
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default GiveawayControls
