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

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  throw new Error('Razorpay credentials are not configured');
}

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

  async createOrder(userId: string, planType: 'annual' | 'lifetime'): Promise<string> {
    // Amount in paise (multiply by 100)
    const amount = planType === 'annual' ? 180000 : 500000;
    
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
        throw new Error(errorData.error?.description || 'Failed to create Razorpay order');
      }

      const razorpayOrder = await response.json();

      // Update our order with Razorpay order ID
      await updateDoc(orderRef, {
        razorpayOrderId: razorpayOrder.id
      });

      return razorpayOrder.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  async initiatePayment(planType: 'annual' | 'lifetime', user: any): Promise<void> {
    try {
      // Ensure Razorpay is loaded
      const isLoaded = await this.loadRazorpay();
      if (!isLoaded) {
        throw new Error('Failed to load Razorpay');
      }

      // Create order
      const orderId = await this.createOrder(user.uid, planType);
      const amount = planType === 'annual' ? 180000 : 500000;

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
    } catch (error) {
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