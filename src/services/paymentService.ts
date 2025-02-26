import api from './api';

interface PaymentOrder {
  orderId: string;
  amount: number;
  key: string;
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

  async initiatePayment(planType: 'annual' | 'lifetime', user: any): Promise<void> {
    try {
      const isLoaded = await this.loadRazorpay();
      if (!isLoaded) {
        throw new Error('Failed to load payment system. Please try again.');
      }

      const response = await api.post<PaymentOrder>('/payment/orders', { planType });
      const { orderId, amount, key } = response.data;

      const options = {
        key,
        amount,
        currency: 'INR',
        name: 'NoDev Build',
        description: `${planType === 'annual' ? 'Annual' : 'Lifetime'} Membership`,
        image: '/noDevBuild-logo.png',
        order_id: orderId,
        handler: async (response: any) => {
          try {
            await api.put(`/payment/orders/${orderId}`, {
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              status: 'completed'
            });
            window.location.href = '/dashboard';
          } catch (error) {
            console.error('Payment verification failed:', error);
            await api.put(`/payment/orders/${orderId}`, {
              paymentId: response.razorpay_payment_id,
              status: 'failed'
            });
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
              status: 'failed'
            });
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Payment initiation failed');
    }
  }
};