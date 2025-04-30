import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../services/authService';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  message: null,
  initialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      state.initialized = true;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setMessage: (state, action: PayloadAction<string | null>) => {
      state.message = action.payload;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.error = null;
      state.message = null;
    }
  },
});

export const { setUser, setLoading, setError, setMessage, setInitialized, clearAuth } = authSlice.actions;
export default authSlice.reducer;