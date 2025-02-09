import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface ContactQuery {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'in-progress' | 'resolved';
}

export const contactService = {
  async submitQuery(query: Omit<ContactQuery, 'createdAt' | 'status'>): Promise<void> {
    if (!query.email || !query.name || !query.subject || !query.message) {
      throw new Error('All fields are required');
    }

    const contactQuery: ContactQuery = {
      ...query,
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    try {
      await addDoc(collection(db, 'contactQueries'), contactQuery);
    } catch (error) {
      console.error('Error submitting contact query:', error);
      throw new Error('Failed to submit query');
    }
  }
};