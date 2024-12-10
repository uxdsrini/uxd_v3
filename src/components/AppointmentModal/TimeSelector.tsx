import React from 'react';
import { Clock } from 'lucide-react';

interface TimeSelectorProps {
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

export default function TimeSelector({ selectedTime, onTimeSelect }: TimeSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {timeSlots.map((time) => (
        <button
          key={time}
          type="button"
          onClick={() => onTimeSelect(time)}
          className={`p-2.5 rounded-xl border-2 transition-all flex items-center justify-center gap-2
            ${time === selectedTime 
              ? 'bg-secondary text-white border-secondary' 
              : 'hover:border-secondary'
            }`}
        >
          <Clock className="w-4 h-4" />
          <span className="text-sm">{time}</span>
        </button>
      ))}
    </div>
  );
}