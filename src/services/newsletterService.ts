import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
}

export const newsletterService = {
  async subscribe(email: string): Promise<void> {
    if (!email || !email.includes('@')) {
      throw new Error('Invalid email address');
    }

    const subscriber: NewsletterSubscriber = {
      email,
      subscribedAt: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, 'newsletterSubscribers'), subscriber);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw new Error('Failed to subscribe to newsletter');
    }
  }
};