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
      console.error('Failed to fetch courses:', error.message);
      // Return mock data as fallback
      return getMockCourses();
    }
  },

  async getCourseById(id: string): Promise<Course> {
    try {
      const response = await api.get(`/courses/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch course by ID:', error.message);
      // Return a mock course as fallback
      const mockCourses = getMockCourses();
      const course = mockCourses.find(c => c.id === id) || mockCourses[0];
      return course;
    }
  },

  async getCourseBySlug(slug: string): Promise<Course> {
    try {
      const response = await api.get(`/courses/slug/${slug}`);
      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch course by slug:', error.message);
      // Return a mock course as fallback
      const mockCourses = getMockCourses();
      const course = mockCourses.find(c => c.slug === slug) || mockCourses[0];
      return course;
    }
  },

  async createCourse(course: Omit<Course, 'id'>): Promise<Course> {
    try {
      const response = await api.post('/courses', course);
      return response.data;
    } catch (error: any) {
      console.error('Failed to create course:', error.message);
      throw new Error(error.message || 'Failed to create course');
    }
  }
};

// Mock data function to provide fallback data when API fails
function getMockCourses(): Course[] {
  return [
    {
      id: "1",
      slug: "no-code-app-development",
      title: "No-Code App Development",
      description: "Learn to build fully functional apps without writing a single line of code",
      duration: "10 hours",
      lessons: 24,
      students: 1250,
      rating: 4.8,
      reviews: 156,
      image: "/bubble-logo.svg",
      icon: "/bubble-logo.svg",
      instructor: {
        name: "James Wilson",
        title: "No-Code Development Lead",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
      },
      learningPoints: [
        "Master Bubble.io's visual programming interface",
        "Create responsive designs for web and mobile",
        "Build complex workflows and database structures",
        "Integrate with third-party services and APIs",
        "Deploy and maintain your applications"
      ],
      courseContent: [
        {
          title: "Getting Started with Bubble",
          duration: "2 hours",
          lessons: [
            "Introduction to No-Code Development",
            "Setting Up Your Bubble Account",
            "Understanding the Bubble Interface",
            "Your First Bubble Application"
          ]
        },
        {
          title: "Building User Interfaces",
          duration: "3 hours",
          lessons: [
            "Responsive Design Principles",
            "Working with Containers and Groups",
            "Creating Dynamic Forms",
            "Advanced UI Components"
          ]
        },
        {
          title: "Database and Workflows",
          duration: "3 hours",
          lessons: [
            "Designing Your Database Structure",
            "Creating Complex Workflows",
            "User Authentication and Permissions",
            "Data Manipulation and Queries"
          ]
        },
        {
          title: "Deployment and Beyond",
          duration: "2 hours",
          lessons: [
            "Testing and Debugging",
            "Performance Optimization",
            "Deployment Strategies",
            "Maintaining Your Application"
          ]
        }
      ],
      targetAudience: [
        "Entrepreneurs and startup founders",
        "Product managers and business analysts",
        "Designers looking to build functional prototypes",
        "Anyone interested in building apps without coding"
      ],
      faqs: [
        {
          question: "Do I need any coding experience?",
          answer: "No, this course is specifically designed for people with no coding background."
        },
        {
          question: "What kind of apps can I build after this course?",
          answer: "You'll be able to build a wide range of applications including marketplaces, social networks, CRMs, and more."
        },
        {
          question: "Is Bubble.io free to use?",
          answer: "Bubble offers a free plan with limitations. For production apps, you'll likely need a paid plan starting at $25/month."
        },
        {
          question: "Will I get support if I get stuck?",
          answer: "Yes, you'll have access to our community forum where instructors and fellow students can help with your questions."
        }
      ],
      isNew: true,
      isTrending: true
    },
    {
      id: "2",
      slug: "figma-ui-design-masterclass",
      title: "Figma UI Design Masterclass",
      description: "Master modern UI design principles using Figma",
      duration: "8 hours",
      lessons: 18,
      students: 980,
      rating: 4.7,
      reviews: 124,
      image: "/figma-logo.svg",
      icon: "/figma-logo.svg",
      instructor: {
        name: "Maria Rodriguez",
        title: "Product Strategy Expert",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
      },
      learningPoints: [
        "Master Figma's interface and design tools",
        "Create responsive and adaptive layouts",
        "Design systems and component libraries",
        "Prototyping and animation",
        "Collaboration and handoff to developers"
      ],
      courseContent: [
        {
          title: "Figma Fundamentals",
          duration: "2 hours",
          lessons: [
            "Introduction to Figma",
            "Interface Overview",
            "Basic Shapes and Tools",
            "Working with Layers and Groups"
          ]
        },
        {
          title: "Advanced Design Techniques",
          duration: "3 hours",
          lessons: [
            "Typography and Text Styles",
            "Color Theory and Management",
            "Creating and Using Components",
            "Auto Layout and Constraints"
          ]
        },
        {
          title: "Prototyping and Interaction",
          duration: "2 hours",
          lessons: [
            "Creating Interactive Prototypes",
            "Transitions and Animations",
            "User Flows and Navigation",
            "Testing Your Prototypes"
          ]
        },
        {
          title: "Collaboration and Handoff",
          duration: "1 hour",
          lessons: [
            "Team Libraries and Collaboration",
            "Developer Handoff Best Practices",
            "Design System Documentation",
            "Exporting Assets"
          ]
        }
      ],
      targetAudience: [
        "Aspiring UI/UX designers",
        "Graphic designers transitioning to digital",
        "Product managers who work with design teams",
        "Developers who want to improve their design skills"
      ],
      faqs: [
        {
          question: "Do I need prior design experience?",
          answer: "Some basic understanding of design principles is helpful, but not required. We'll cover the fundamentals."
        },
        {
          question: "Is Figma free to use?",
          answer: "Yes, Figma offers a generous free plan that's perfect for learning and personal projects."
        },
        {
          question: "What equipment do I need?",
          answer: "A computer with internet access. Figma works on both Mac and Windows. A graphics tablet is optional but not required."
        },
        {
          question: "Will I be able to create a portfolio after this course?",
          answer: "Absolutely! You'll complete several projects throughout the course that can be used in your portfolio."
        }
      ],
      isNew: false,
      isTrending: true
    },
    {
      id: "3",
      slug: "flutterflow-mobile-app-development",
      title: "FlutterFlow Mobile App Development",
      description: "Build native mobile apps without coding using FlutterFlow",
      duration: "12 hours",
      lessons: 28,
      students: 750,
      rating: 4.6,
      reviews: 98,
      image: "/flutterflow-logo.svg",
      icon: "/flutterflow-logo.svg",
      instructor: {
        name: "Dr. Sarah Chen",
        title: "AI & Machine Learning Expert",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      },
      learningPoints: [
        "Master FlutterFlow's visual development environment",
        "Create beautiful, responsive mobile UIs",
        "Build complex app logic and workflows",
        "Integrate with Firebase and other services",
        "Publish to App Store and Google Play"
      ],
      courseContent: [
        {
          title: "Getting Started with FlutterFlow",
          duration: "3 hours",
          lessons: [
            "Introduction to FlutterFlow",
            "Setting Up Your Environment",
            "Understanding the FlutterFlow Interface",
            "Your First Mobile App"
          ]
        },
        {
          title: "Building Mobile UIs",
          duration: "4 hours",
          lessons: [
            "Mobile Design Principles",
            "Working with Widgets and Containers",
            "Creating Responsive Layouts",
            "Advanced UI Components"
          ]
        },
        {
          title: "App Logic and Firebase",
          duration: "3 hours",
          lessons: [
            "Setting Up Firebase",
            "Authentication and User Management",
            "Firestore Database Integration",
            "Cloud Functions and Backend Logic"
          ]
        },
        {
          title: "Deployment and Publishing",
          duration: "2 hours",
          lessons: [
            "Testing on Real Devices",
            "Preparing for App Store Submission",
            "Google Play Store Publishing",
            "App Maintenance and Updates"
          ]
        }
      ],
      targetAudience: [
        "Entrepreneurs with mobile app ideas",
        "Web developers looking to enter mobile development",
        "Product managers overseeing mobile projects",
        "Anyone interested in no-code mobile development"
      ],
      faqs: [
        {
          question: "Do I need any coding experience?",
          answer: "No coding experience is required. This course is designed for beginners."
        },
        {
          question: "Will my apps work on both iOS and Android?",
          answer: "Yes! FlutterFlow generates Flutter code that works natively on both platforms."
        },
        {
          question: "How much does FlutterFlow cost?",
          answer: "FlutterFlow offers a free plan for learning. Production apps typically require a paid plan starting at $30/month."
        },
        {
          question: "Can I export the code and continue development outside FlutterFlow?",
          answer: "Yes, FlutterFlow allows you to export clean Flutter code that you can further develop in any IDE."
        }
      ],
      isNew: true,
      isTrending: false
    }
  ];
}