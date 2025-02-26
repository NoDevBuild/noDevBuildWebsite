import api from './api';

export interface ContactQuery {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const contactService = {
  async submitQuery(query: ContactQuery): Promise<void> {
    try {
      await api.post('/contact/queries', query);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to submit query');
    }
  }
};