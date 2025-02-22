import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface OrderDetails {
  userId: string;
  planType: 'annual' | 'lifetime';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  paymentId?: string;
  razorpayOrderId?: string;
  createdAt: string;
}

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = import.meta.env.VITE_RAZORPAY_KEY_SECRET;

export const paymentService = {
  loadRazorpay(): Promise<boolean> {
    return new Promise((resolve) => {
      if (window.Razorpay) {
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

  async createOrder(userId: string, planType: 'annual' | 'lifetime'): Promise<{ orderId: string, amount: number }> {
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      throw new Error('Payment system is not configured. Please contact support.');
    }

    // Add validation for userId
    if (!userId) {
      throw new Error('User ID is required');
    }

    // Consider moving these to environment variables or a config file
    const ANNUAL_AMOUNT = 180000;  // ₹1,800
    const LIFETIME_AMOUNT = 500000; // ₹5,000
    const amount = planType === 'annual' ? ANNUAL_AMOUNT : LIFETIME_AMOUNT;
    
    try {
      // First create our internal order
      const orderRef = await addDoc(collection(db, 'orders'), {
        userId,
        planType,
        amount,
        currency: 'INR',
        status: 'pending',
        createdAt: new Date().toISOString()
      } as OrderDetails);

      // Create Razorpay order
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`)}`
        },
        body: JSON.stringify({
          amount,
          currency: 'INR',
          receipt: orderRef.id,
          notes: {
            planType,
            userId,
            orderId: orderRef.id
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Razorpay API Error:', errorData);
        throw new Error(errorData.error?.description || 'Failed to create payment order');
      }

      const razorpayOrder = await response.json();

      // Update our order with Razorpay order ID
      await updateDoc(doc(db, 'orders', orderRef.id), {
        razorpayOrderId: razorpayOrder.id
      });

      return {
        orderId: razorpayOrder.id,
        amount
      };
    } catch (error: any) {
      console.error('Error creating order:', error);
      throw new Error(error.message || 'Failed to create payment order');
    }
  },

  async initiatePayment(planType: 'annual' | 'lifetime', user: any): Promise<void> {
    if (!RAZORPAY_KEY_ID) {
      throw new Error('Payment system is not configured. Please contact support.');
    }

    // Add type safety for user parameter
    if (!user?.uid) {
      throw new Error('Invalid user object');
    }

    try {
      // Ensure Razorpay is loaded
      const isLoaded = await this.loadRazorpay();
      if (!isLoaded) {
        throw new Error('Failed to load payment system. Please try again.');
      }

      // Create order
      const { orderId, amount } = await this.createOrder(user.uid, planType);

      // Configure Razorpay
      const options = {
        key: RAZORPAY_KEY_ID,
        amount,
        currency: 'INR',
        name: 'NoDev Build',
        description: `${planType === 'annual' ? 'Annual' : 'Lifetime'} Membership`,
        image: '/noDevBuild-logo.png',
        order_id: orderId,
        handler: async (response: any) => {
          try {
            await this.updateOrderStatus(orderId, {
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              status: 'completed'
            });
            window.location.href = '/dashboard';
          } catch (error) {
            console.error('Payment verification failed:', error);
            await this.updateOrderStatus(orderId, {
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
            await this.updateOrderStatus(orderId, {
              paymentId: 'cancelled',
              status: 'failed'
            });
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      console.error('Payment initiation failed:', error);
      throw error;
    }
  },

  async updateOrderStatus(orderId: string, paymentDetails: { 
    paymentId: string; 
    status: 'completed' | 'failed';
    signature?: string;
  }) {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        paymentId: paymentDetails.paymentId,
        status: paymentDetails.status,
        signature: paymentDetails.signature,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }
};