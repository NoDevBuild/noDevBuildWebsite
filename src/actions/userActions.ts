import { User } from '../types/user';

export const SET_USER = 'SET_USER';

export const setUser = (user: User | null) => ({
  type: SET_USER,
  payload: user
}); 