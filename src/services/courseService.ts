import api from './api';

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  reviews: number;
  image: string;
  instructor: {
    name: string;
    title: string;
    image: string;
  };
  learningPoints: string[];
  courseContent: {
    title: string;
    duration: string;
    lessons: string[];
  }[];
  targetAudience: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  isNew?: boolean;
  isTrending?: boolean;
  slug?: string;
}

export const courseService = {
  async getAllCourses(): Promise<Course[]> {
    try {
      const response = await api.get('/courses');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to fetch courses');
    }
  },

  async getCourseById(id: string): Promise<Course> {
    try {
      const response = await api.get(`/courses/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to fetch course');
    }
  },

  async getCourseBySlug(slug: string): Promise<Course> {
    try {
      const response = await api.get(`/courses/slug/${slug}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to fetch course');
    }
  },

  async createCourse(course: Omit<Course, 'id'>): Promise<Course> {
    try {
      const response = await api.post('/courses', course);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to create course');
    }
  }
};