import api from './api';
import { User } from '../types/user';
import { setUser } from '../actions/userActions';
import { store } from '../store';

interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

interface ProfileUpdate {
  displayName?: string;
  photoURL?: string;
}

export const authService = {
  async login(email: string, password: string): Promise<{ user: User; membershipStatus: string }> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', { 
        email, 
        password 
      });
      
      // Store the token for login since user is verified
      localStorage.setItem('token', response.data.token);
      
      // Get user profile to check membership status
      const userProfile = await this.getProfile(response.data.user.uid);
      
      // Update Redux store with the user data including membership status
      const userWithMembership = {
        ...response.data.user,
        membershipStatus: userProfile.membershipStatus || 'inactive'
      };
      store.dispatch(setUser(userWithMembership));
      
      return {
        user: userWithMembership,
        membershipStatus: userProfile.membershipStatus || 'inactive'
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Login failed';
      throw new Error(errorMessage);
    }
  },

  async register(email: string, password: string, fullName: string): Promise<{ message: string }> {
    try {
      const response = await api.post<AuthResponse>('/auth/signup', {
        email,
        password,
        displayName: fullName
      });
      
      // Don't store token during signup - wait for email verification
      // Only return the success message
      return {
        message: response.data.message || 'Please check your email to verify your account. You will be able to login after verification.'
      };
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Handle specific error codes
      if (error.response?.data?.code === 'auth/email-already-exists') {
        throw new Error('This email is already registered. Please try logging in or use a different email.');
      } else if (error.response?.data?.code === 'auth/weak-password') {
        throw new Error('Password is too weak. Please use a stronger password.');
      } else if (error.response?.data?.code === 'auth/invalid-email') {
        throw new Error('Invalid email format. Please enter a valid email address.');
      } else if (error.response?.data?.code === 'auth/network-error') {
        throw new Error('Network error. Please check your internet connection and try again.');
      } else {
        const errorMessage = error.response?.data?.error || error?.message || 'Registration failed. Please try again.';
        throw new Error(errorMessage);
      }
    }
  },

  async logout(): Promise<void> {
    try {
      // Remove token from localStorage
      localStorage.removeItem('token');
      // Clear user state in Redux
      store.dispatch(setUser(null));
    } catch (error: any) {
      console.error('Error during logout:', error);
      throw new Error('Logout failed');
    }
  },

  async updateProfile(userId: string, data: ProfileUpdate): Promise<void> {
    try {
      // Remove any undefined values from the update object
      const cleanData: ProfileUpdate = {};
      if (data.displayName !== undefined) cleanData.displayName = data.displayName;
      if (data.photoURL !== undefined) cleanData.photoURL = data.photoURL;

      await api.put(`/auth/users/${userId}`, cleanData);
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Profile update failed';
      throw new Error(errorMessage);
    }
  },

  async resetPassword(email: string): Promise<{ message: string }> {
    try {
      const response = await api.post<{ message: string }>('/auth/reset-password', { email });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Password reset failed';
      throw new Error(errorMessage);
    }
  },

  async getProfile(userId: string): Promise<User> {
    try {
      const response = await api.get<User>(`/auth/users/${userId}`);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to fetch profile';
      throw new Error(errorMessage);
    }
  },

  async confirmPasswordReset(oobCode: string, newPassword: string) {
    try {
      const response = await api.post('/auth/confirm-password-reset', {
        oobCode,
        newPassword
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to reset password');
    }
  }
};