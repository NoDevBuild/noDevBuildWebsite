import React, { useEffect } from 'react';
import { Clock, BookOpen } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setCourses, setError } from '../../store/coursesSlice';
import { getImageUrl } from '../../utils/helpers';
import { courseService } from '../../services/courseService';
import { RootState } from '../../store/store';
import { Link } from 'react-router-dom';

// Use the Course type from the service
import type { Course } from '../../services/courseService';

const DashboardCourses = () => {
  const dispatch = useDispatch();
  const { items: courses, loading, error } = useSelector((state: RootState) => state.courses);

  useEffect(() => {
    const fetchCourses = async () => {
      dispatch(setLoading(true));
      try {
        const coursesData = await courseService.getAllCourses();
        dispatch(setCourses(coursesData));
      } catch (err) {
        dispatch(setError('Failed to load courses'));
        console.error(err);
      }
    };

    fetchCourses();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No courses found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Link 
          key={course.id} 
          to={`/dashboard/my-courses/${course.slug}`}
          className="group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          <div className="relative pt-[56.25%] bg-gray-100">
            <img
              src={getImageUrl(course.image)}
              alt={course.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
              {course.title}
            </h3>
            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
              {course.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                <BookOpen className="h-4 w-4 mr-1" />
                <span>View Course</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DashboardCourses; 