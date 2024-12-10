import React from 'react';
import { Clock } from 'lucide-react';

interface TimeSlotProps {
  time: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function TimeSlot({ time, isSelected, onClick }: TimeSlotProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full p-2.5 sm:p-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2
        ${isSelected 
          ? 'bg-secondary text-white border-secondary' 
          : 'hover:border-secondary'
        }
      `}
    >
      <Clock className="w-4 h-4" />
      <span className="text-sm">{time}</span>
    </button>
  );
}