import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setCourses, setError } from '../store/coursesSlice';
import { getImageUrl } from '../utils/helpers';
import { courseService } from '../services/courseService';

const Courses = () => {
  const dispatch = useDispatch();
  const { items: courses, loading, error } = useSelector((state) => state.courses);

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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            <p className="mt-2 text-gray-600">Loading courses...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-blue-50 rounded-full mb-4">
            <span className="text-blue-600 text-sm font-medium tracking-wide uppercase">Courses</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            We cover the most <span className="italic">in-demand</span><br />
            no-code and AI tools.
          </h2>
          <p className="text-xl text-gray-600">
            Practical courses, all in one membership.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {Array.isArray(courses) && courses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.slug}`}
              className="group bg-white rounded-[32px] overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative pt-[50.8%] bg-[#EEF4FF]">
                <div className="absolute inset-0">
                  <img
                    src={getImageUrl(course.image)}
                    alt={course.title}
                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                  {course.isNew && (
                    <div className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm">
                      <img 
                        src="https://cdn.prod.website-files.com/5e6aa3e3f001fad873b8e1f5/65faef38088ecbd4842aed36_stars-03.avif" 
                        alt="" 
                        className="w-3 sm:w-3.5 h-3 sm:h-3.5"
                      />
                      <span className="text-[10px] sm:text-xs font-bold">New</span>
                    </div>
                  )}
                  {course.isTrending && (
                    <div className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-green-400 to-cyan-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm">
                      <img 
                        src="https://cdn.prod.website-files.com/5e6aa3e3f001fad873b8e1f5/664b0d08d4c57c99791347e2_breakpoint3.svg" 
                        alt="" 
                        className="w-3 sm:w-3.5 h-3 sm:h-3.5"
                      />
                      <span className="text-[10px] sm:text-xs font-bold whitespace-nowrap">Trending</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8">
                <h3 className="text-[24px] font-bold text-[#1e293b] mb-3 leading-tight">
                  {course.title}
                </h3>
                <p className="text-[#64748b] text-lg mb-6 leading-relaxed">
                  {course.description}
                </p>
                <div className="flex items-center text-[#64748b]">
                  <Clock className="w-5 h-5 mr-2 opacity-60" />
                  <span className="text-[15px]">{course.duration}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Browse All Courses Button */}
        <div className="text-center">
          <Link
            to="/courses"
            className="inline-flex items-center justify-center px-8 py-3 text-[15px] font-medium text-[#1e293b] bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
          >
            Browse all courses
            <svg className="w-4 h-4 ml-2 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Courses;