import React, { useState } from 'react';
import { X, Calendar, User, Mail, MessageSquare, Clock } from 'lucide-react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import toast, { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

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
      // Create a new appointment document in Firestore
      const appointmentsRef = collection(db, 'appointments');
      const appointmentData = {
        name,
        email,
        date: Timestamp.fromDate(selectedDate),
        time: selectedTime,
        notes,
        status: 'pending',
        createdAt: Timestamp.now(),
      };

      await addDoc(appointmentsRef, appointmentData);
      
      toast.success('Appointment booked successfully!');
      
      // Reset form
      setName('');
      setEmail('');
      setNotes('');
      setSelectedDate(undefined);
      setSelectedTime('');
      
      onClose();
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date();
  const nextWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return date;
  });

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
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {nextWeek.map((date) => {
                  const isSelected = selectedDate && 
                    format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                  return (
                    <button
                      key={date.toISOString()}
                      type="button"
                      onClick={() => setSelectedDate(date)}
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
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Time *</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
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