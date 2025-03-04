import React from 'react';
import { Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getImageUrl } from '../utils/helpers';

const CoursesPage = () => {
  const { items: courses, loading, error } = useSelector((state: RootState) => state.courses);

  if (loading) {
    return (
      <div className="pt-24 sm:pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            <p className="mt-2 text-gray-600">Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 sm:pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-blue-50 rounded-full mb-4">
            <span className="text-blue-600 text-sm font-medium tracking-wide uppercase">All Courses</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Master No-Code & AI<br />Development
          </h1>
          <p className="text-xl text-gray-600">
            Learn from industry experts and build real-world projects
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>No courses available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
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
                        <span className="text-[10px] sm:text-xs font-bold">Trending</span>
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
                  <div className="flex items-center justify-between text-[#64748b]">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 opacity-60" />
                      <span className="text-[15px]">{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                      <span className="text-[15px]">{course.rating}</span>
                      <span className="text-[15px] text-gray-400 ml-1">({course.reviews})</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;