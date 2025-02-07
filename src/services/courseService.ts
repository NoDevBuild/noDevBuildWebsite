import { db } from '../lib/firebase';
import { collection, doc, getDoc, getDocs, query, where, addDoc } from 'firebase/firestore';

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
      const coursesRef = collection(db, 'courses');
      const snapshot = await getDocs(coursesRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Course[];
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  async getCourseById(id: string): Promise<Course | null> {
    try {
      const docRef = doc(db, 'courses', id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return null;
      }

      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Course;
    } catch (error) {
      console.error('Error fetching course by ID:', error);
      throw error;
    }
  },

  async getCourseBySlug(slug: string): Promise<Course | null> {
    try {
      const coursesRef = collection(db, 'courses');
      const q = query(coursesRef, where('slug', '==', slug));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        return null;
      }

      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      } as Course;
    } catch (error) {
      console.error('Error fetching course by slug:', error);
      throw error;
    }
  },

  async addCourse(course: Omit<Course, 'id'>): Promise<string> {
    try {
      const coursesRef = collection(db, 'courses');
      const docRef = await addDoc(coursesRef, {
        ...course,
        slug: course.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding course:', error);
      throw error;
    }
  }
};