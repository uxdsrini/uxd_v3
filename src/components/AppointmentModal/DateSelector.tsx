import React from 'react';
import { format } from 'date-fns';

interface DateSelectorProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date) => void;
}

export default function DateSelector({ selectedDate, onDateSelect }: DateSelectorProps) {
  const today = new Date();
  const nextWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return date;
  });

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      {nextWeek.map((date) => {
        const isSelected = selectedDate && 
          format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
        return (
          <button
            key={date.toISOString()}
            type="button"
            onClick={() => onDateSelect(date)}
            className={`flex-shrink-0 p-3 rounded-xl border-2 transition-all min-w-[90px]
              ${isSelected 
                ? 'bg-secondary text-white border-secondary' 
                : 'hover:border-secondary'
              }`}
          >
            <div className="text-center">
              <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                {format(date, 'EEE')}
              </p>
              <p className="text-lg font-semibold mt-1">
                {format(date, 'd')}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}