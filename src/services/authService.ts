import api from './api';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

export const authService = {
  async login(email: string, password: string): Promise<User> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', { 
        email, 
        password 
      });
      
      // Store the token
      localStorage.setItem('token', response.data.token);
      
      return response.data.user;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Login failed';
      throw new Error(errorMessage);
    }
  },

  async register(email: string, password: string, fullName: string): Promise<User> {
    try {
      const response = await api.post<AuthResponse>('/auth/signup', {
        email,
        password,
        displayName: fullName
      });
      
      // Store the token
      localStorage.setItem('token', response.data.token);
      
      // Show verification message if provided
      if (response.data.message) {
        console.info(response.data.message);
      }
      
      return response.data.user;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Registration failed';
      throw new Error(errorMessage);
    }
  },

  async logout(): Promise<void> {
    try {
      localStorage.removeItem('token');
    } catch (error: any) {
      throw new Error('Logout failed');
    }
  },

  async updateProfile(userId: string, data: { displayName?: string; photoURL?: string }): Promise<void> {
    try {
      await api.put(`/auth/users/${userId}`, data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Profile update failed';
      throw new Error(errorMessage);
    }
  },

  async resetPassword(email: string): Promise<{ link: string }> {
    try {
      const response = await api.post<{ link: string }>('/auth/reset-password', { email });
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
  }
};