import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'error' | 'success';
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'error',
  onClose,
  duration = 3000
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const toastElement = (
    <div className={cn(
      "fixed bottom-16 right-2 z-[9999]",
      "flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg",
      "animate-slideIn",
      type === 'error' ? "bg-red-500 text-white" : "bg-green-500 text-white",
      "text-sm max-w-xs"
    )}>
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="p-1 hover:bg-white/20 rounded-full transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );

  return createPortal(toastElement, document.body);
};

export default Toast;
