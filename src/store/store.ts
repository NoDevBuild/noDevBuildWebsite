import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './coursesSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/setUser'],
      },
    }),
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;