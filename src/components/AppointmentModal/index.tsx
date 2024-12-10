import React, { useState } from 'react';
import { X, Calendar, User, Mail, MessageSquare } from 'lucide-react';
import { createAppointment } from '../../lib/firebase/appointments';
import toast, { Toaster } from 'react-hot-toast';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !selectedDate || !selectedTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await createAppointment({
        name,
        email,
        date: selectedDate,
        time: selectedTime,
        notes
      });
      
      toast.success('Appointment booked successfully!');
      
      // Reset form
      setName('');
      setEmail('');
      setNotes('');
      setSelectedDate(undefined);
      setSelectedTime('');
      
      onClose();
    } catch (error) {
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Toaster position="top-right" />
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-primary">Book Appointment</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto">
          <div className="space-y-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 pr-4 py-2.5 w-full border-2 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 pr-4 py-2.5 w-full border-2 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Date *</label>
              <DateSelector
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Time *</label>
              <TimeSelector
                selectedTime={selectedTime}
                onTimeSelect={setTimeSelect}
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="pl-10 pr-4 py-2.5 w-full border-2 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary resize-none transition-all"
                  placeholder="Add any additional notes or special requests..."
                  rows={4}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-secondary text-white rounded-xl hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Booking...</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4 mr-1.5" />
                  <span>Book Appointment</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}