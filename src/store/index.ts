import { configureStore } from '@reduxjs/toolkit';
import { User } from '../types/user';

interface AppState {
  user: User | null;
}

const initialState: AppState = {
  user: null
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: rootReducer
}); 