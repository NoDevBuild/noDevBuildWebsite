import React, { useState } from 'react';
import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Course } from '../services/courseService';

const AdminPage = () => {
  const [coursesJson, setCoursesJson] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Parse the JSON input
      const courses = JSON.parse(coursesJson) as Omit<Course, 'id'>[];
      
      // Validate the courses array
      if (!Array.isArray(courses)) {
        throw new Error('Input must be an array of courses');
      }

      if (courses.length === 0) {
        throw new Error('At least one course is required');
      }

      if (courses.length > 500) {
        throw new Error('Maximum 500 courses can be added at once');
      }

      // Create a batch write
      const batch = writeBatch(db);
      const coursesRef = collection(db, 'courses');

      // Add each course to the batch
      courses.forEach((course) => {
        const newCourseRef = doc(coursesRef);
        batch.set(newCourseRef, {
          ...course,
          // Generate a slug from the title
          slug: course.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          // Add timestamp
          createdAt: new Date().toISOString()
        });
      });

      // Commit the batch
      await batch.commit();
      
      setSuccess(true);
      setCoursesJson('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add courses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Courses</h1>
          <p className="text-gray-600">
            Paste a JSON array of course objects to add them to the database. Each course will be added as a separate document.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600">Courses added successfully!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Courses JSON
              <span className="text-gray-500 ml-2">(Array of course objects)</span>
            </label>
            <div className="mt-1 mb-2">
              <textarea
                value={coursesJson}
                onChange={e => setCoursesJson(e.target.value)}
                rows={20}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono text-sm"
                placeholder={`[
  {
    "title": "Course Title",
    "description": "Course Description",
    "duration": "5 hours",
    "lessons": 10,
    "students": 1000,
    "rating": 4.5,
    "reviews": 100,
    "image": "/course-image.svg",
    "instructor": {
      "name": "Instructor Name",
      "title": "Instructor Title",
      "image": "https://example.com/instructor.jpg"
    },
    "learningPoints": ["Point 1", "Point 2"],
    "courseContent": [
      {
        "title": "Section 1",
        "duration": "1 hour",
        "lessons": ["Lesson 1", "Lesson 2"]
      }
    ],
    "targetAudience": ["Audience 1", "Audience 2"],
    "faqs": [
      {
        "question": "FAQ Question?",
        "answer": "FAQ Answer"
      }
    ],
    "isNew": true,
    "isTrending": false
  }
]`}
                required
              />
            </div>
            <p className="text-sm text-gray-500">
              Maximum 500 courses can be added at once. Each course will be assigned a unique ID and slug.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setCoursesJson('')}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              disabled={loading || !coursesJson}
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={loading || !coursesJson}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Adding Courses...</span>
                </>
              ) : (
                <span>Add Courses</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;