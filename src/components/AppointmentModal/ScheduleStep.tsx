import React from 'react';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';

interface ScheduleStepProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date) => void;
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

export default function ScheduleStep({
  selectedDate,
  onDateSelect,
  selectedTime,
  onTimeSelect
}: ScheduleStepProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Date *
        </label>
        <DateSelector
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Time *
        </label>
        <TimeSelector
          selectedTime={selectedTime}
          onTimeSelect={onTimeSelect}
        />
      </div>
    </div>
  );
}