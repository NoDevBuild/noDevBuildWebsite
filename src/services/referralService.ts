import api from './api';

interface ReferralResponse {
  isValid: boolean;
  discountPercent: number;
  message: string;
}

export const referralService = {
  async verifyCode(code: string): Promise<ReferralResponse> {
    try {
      const response = await api.post('/verify-referral', { code });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to verify referral code');
    }
  }
};