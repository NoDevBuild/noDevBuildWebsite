import api from './api';

interface CollaborationEnquiry {
  email: string;
  enquiryDate: string;
}

export const collaborationService = {
  async submitEnquiry(email: string): Promise<void> {
    try {
      await api.post('/collaboration/enquiries', { email });
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to submit enquiry');
    }
  }
};