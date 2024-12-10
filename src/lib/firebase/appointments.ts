import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

interface AppointmentData {
  name: string;
  email: string;
  date: Date;
  time: string;
  notes: string;
}

export async function createAppointment(data: AppointmentData) {
  try {
    const appointmentsRef = collection(db, 'appointments');
    const appointmentData = {
      ...data,
      date: Timestamp.fromDate(data.date),
      status: 'pending',
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(appointmentsRef, appointmentData);
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error('Error creating appointment:', error);
    throw new Error(error.message || 'Failed to create appointment');
  }
}