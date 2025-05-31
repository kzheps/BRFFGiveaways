import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { cn } from '../utils/cn';
import { Key } from 'lucide-react';

interface KeywordDisplayProps {
  keyword: string;
  isActive: boolean;
}

const KeywordDisplay: React.FC<KeywordDisplayProps> = ({ keyword, isActive }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setIsVisible(false);
      return;
    }

    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [isActive]);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(keyword);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">КЛЮЧЕВОЕ СЛОВО</CardTitle>
        <Key className="h-5 w-5 text-purple-500" />
      </CardHeader>
      <CardContent>
        {isActive ? (
          <div className="flex flex-col items-center space-y-3">
            <div
              className={cn(
                "transition-all duration-500 transform",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              )}
            >
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400 tracking-wider">
                  {keyword}
                </span>
              </div>
            </div>
            <p className={cn(
              "text-sm text-center text-slate-500 dark:text-slate-400 transition-opacity duration-300",
              isVisible ? "opacity-100" : "opacity-0"
            )}>
              Введите это ключевое слово в чате, чтобы принять участие в розыгрыше
            </p>
            <button
              onClick={handleCopyClick}
              className={cn(
                "text-sm px-3 py-1 rounded bg-purple-100 text-purple-700 hover:bg-purple-200",
                "dark:bg-purple-900 dark:text-purple-100 dark:hover:bg-purple-800",
                "transition-all duration-200",
                isVisible ? "opacity-100" : "opacity-0",
                isCopied && "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100"
              )}
            >
              {isCopied ? "Скопировано!" : "Копировать в буфер обмена"}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-20 text-slate-400 dark:text-slate-600">
            Нет заданного слова
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KeywordDisplay;
