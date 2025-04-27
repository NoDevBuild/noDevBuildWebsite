import api from './api';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface PaymentOrder {
  orderId: string;
  amount: number;
  key: string;
  discountedAmount?: number;
}

export const paymentService = {
  loadRazorpay(): Promise<boolean> {
    return new Promise((resolve) => {
      if (window?.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  },

  async initiatePayment(planType: 'basicPlan' | 'premiumPlan', user: any, referralCode?: string): Promise<void> {
    try {
      const isLoaded = await this.loadRazorpay();
      if (!isLoaded) {
        throw new Error('Failed to load payment system. Please try again.');
      }

      // Create payment order with the verified referral code
      const response = await api.post<PaymentOrder>('/payment/orders', { 
        planType, 
        referralCode // Only pass the verified referral code
      });
      const { orderId, amount, key } = response.data;

      const options = {
        key,
        amount,
        currency: 'INR',
        name: 'NoDevBuild',
        description: `${planType === 'basicPlan' ? 'Basic' : 'Premium'} Plan${referralCode ? ' (with discount)' : ''}`,
        image: '/noDevBuild-logo.png',
        order_id: orderId,
        handler: async (response: any) => {
          try {
            await api.put(`/payment/orders/${orderId}`, {
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              status: 'completed',
              referralCode // Include referral code in payment verification
            });
            
            window.dispatchEvent(new CustomEvent('payment_success', {
              detail: {
                planType,
                orderId
              }
            }));
          } catch (error) {
            console.error('Payment verification failed:', error);
            await api.put(`/payment/orders/${orderId}`, {
              paymentId: response.razorpay_payment_id,
              status: 'failed',
              referralCode
            });
            
            window.dispatchEvent(new CustomEvent('payment_error', {
              detail: {
                error: 'Payment verification failed'
              }
            }));
          }
        },
        prefill: {
          name: user.displayName || '',
          email: user.email || '',
        },
        theme: {
          color: '#7c3aed'
        },
        modal: {
          ondismiss: async () => {
            await api.put(`/payment/orders/${orderId}`, {
              paymentId: 'cancelled',
              status: 'failed',
              referralCode
            });
            
            window.dispatchEvent(new CustomEvent('payment_cancelled'));
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      // Throw the specific error message from the server
      throw new Error(error.message || error.response?.data?.error || 'Payment initiation failed');
    }
  }
};