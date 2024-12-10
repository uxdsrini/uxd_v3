import React from 'react';

interface ProgressStepsProps {
  currentStep: number;
}

export default function ProgressSteps({ currentStep }: ProgressStepsProps) {
  return (
    <div className="px-4 sm:px-6 pt-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <div className={`h-2 rounded-full ${currentStep >= 1 ? 'bg-secondary' : 'bg-gray-200'}`} />
          <p className={`text-xs sm:text-sm mt-2 ${currentStep >= 1 ? 'text-secondary font-medium' : 'text-gray-500'}`}>
            Personal Info
          </p>
        </div>
        <div className="flex-1 mx-2">
          <div className={`h-2 rounded-full ${currentStep >= 2 ? 'bg-secondary' : 'bg-gray-200'}`} />
          <p className={`text-xs sm:text-sm mt-2 ${currentStep >= 2 ? 'text-secondary font-medium' : 'text-gray-500'}`}>
            Schedule
          </p>
        </div>
        <div className="flex-1">
          <div className={`h-2 rounded-full ${currentStep >= 3 ? 'bg-secondary' : 'bg-gray-200'}`} />
          <p className={`text-xs sm:text-sm mt-2 ${currentStep >= 3 ? 'text-secondary font-medium' : 'text-gray-500'}`}>
            Details
          </p>
        </div>
      </div>
    </div>
  );
}