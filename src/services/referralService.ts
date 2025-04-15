import api from './api';

export interface ReferralResponse {
  isValid: boolean;
  discountPercent?: number;
  acceptedPlans?: string[];
  planType?: string;
  expiryDate?: string;
  error?: string;
}

export const referralService = {
  async verifyCode(code: string, planType: 'basicPlan' | 'premiumPlan'): Promise<ReferralResponse> {
    try {
      const response = await api.post('/payment/verify-referral', { code, planType });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to verify referral code');
    }
  }
};