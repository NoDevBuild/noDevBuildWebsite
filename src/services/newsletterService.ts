import api from './api';

export const newsletterService = {
  async subscribe(email: string): Promise<void> {
    try {
      await api.post('/newsletter/subscribe', { email });
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to subscribe to newsletter');
    }
  }
};