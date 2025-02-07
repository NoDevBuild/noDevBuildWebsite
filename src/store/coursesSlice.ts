import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course } from '../services/courseService';

interface CoursesState {
  items: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  items: [],
  loading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setCourses, setError } = coursesSlice.actions;
export default coursesSlice.reducer;