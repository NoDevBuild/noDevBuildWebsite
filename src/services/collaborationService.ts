import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface CollaborationEnquiry {
  email: string;
  enquiryDate: string;
}

export const collaborationService = {
  async submitEnquiry(email: string): Promise<void> {
    if (!email || !email.includes('@')) {
      throw new Error('Invalid email address');
    }

    const enquiry: CollaborationEnquiry = {
      email,
      enquiryDate: new Date().toISOString()
    };

    try {
      await addDoc(collection(db, 'collaborationEnquiries'), enquiry);
    } catch (error) {
      console.error('Error submitting collaboration enquiry:', error);
      throw new Error('Failed to submit enquiry');
    }
  }
};