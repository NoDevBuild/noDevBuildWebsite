import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Star, BookOpen, Users, Check, Rocket, Shield, Trophy } from 'lucide-react';
import FAQ from '../components/FAQ';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getImageUrl } from '../utils/helpers';

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { items: courses, loading, error } = useSelector((state: RootState) => state.courses);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const course = courses.find(c => c.slug === courseId);

  if (loading) {
    return (
      <div className="pt-24 sm:pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          <p className="mt-2 text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 sm:pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-red-600 bg-red-50 p-4 rounded-lg">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="pt-24 sm:pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-lg sm:text-xl text-gray-600">The course you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const allLessons = course.courseContent.reduce((acc, section) => {
    return [...acc, ...section.lessons];
  }, [] as string[]);

  return (
    <div className="pt-24 sm:pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-8 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6">
                {/* Course Icon/Image */}
                <div className="w-20 sm:w-24 h-20 sm:h-24 flex-shrink-0">
                  <img
                    src={getImageUrl(course.image)}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Title and Description */}
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                    {course.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6">
                    {course.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 sm:gap-6 mb-4 sm:mb-6 text-sm sm:text-base">
                    <div className="flex items-center">
                      <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 mr-1.5 sm:mr-2" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 mr-1.5 sm:mr-2" />
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 mr-1.5 sm:mr-2" />
                      <span>{course.students.toLocaleString()}+ members</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400 fill-current mr-1" />
                      <span>{course.rating}</span>
                      <span className="text-gray-500 ml-1">({course.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <img
                      src={getImageUrl(course.instructor.image)}
                      alt={course.instructor.name}
                      className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover mr-3 sm:mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{course.instructor.name}</h3>
                      <p className="text-gray-600 text-sm">{course.instructor.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                What you'll learn in this course
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {allLessons.map((lesson, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="w-3 h-3 text-purple-600" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700">{lesson}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Course Content
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {course.courseContent.map((section, index) => (
                  <div key={index} className="border rounded-lg p-4 sm:p-6 bg-gray-50">
                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{section.title}</h3>
                      <span className="text-sm sm:text-base text-gray-500">{section.duration}</span>
                    </div>
                    <ul className="space-y-2 sm:space-y-3">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                            <Check className="w-3 h-3 text-blue-600" />
                          </div>
                          <span className="text-sm sm:text-base text-gray-700">{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Who is this course for?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {course.targetAudience.map((point, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <FAQ faqs={course.faqs} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
                
                <div className="relative p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center transform rotate-12">
                      <Rocket className="w-5 sm:w-6 h-5 sm:h-6 text-white transform -rotate-12" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Get Started Today!
                    </h2>
                  </div>

                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-9 sm:w-10 h-9 sm:h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                        <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
                      </div>
                      <span className="font-medium text-sm sm:text-base">60-day money back guarantee</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-9 sm:w-10 h-9 sm:h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                        <Users className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600" />
                      </div>
                      <span className="font-medium text-sm sm:text-base">Join {course.students.toLocaleString()}+ members</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-9 sm:w-10 h-9 sm:h-10 bg-green-50 rounded-xl flex items-center justify-center">
                        <Trophy className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
                      </div>
                      <span className="font-medium text-sm sm:text-base">Certificate of completion</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/register')}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-blue-700 hover:to-purple-700 transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    Start Learning
                  </button>

                  {!user && (
                    <div className="mt-4 text-center text-sm sm:text-base">
                      <span className="text-gray-600">Existing user? </span>
                      <button 
                        onClick={() => navigate('/login')}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Login
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;