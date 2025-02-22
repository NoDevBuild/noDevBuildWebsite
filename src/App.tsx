import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, limit } from 'firebase/firestore'
import { auth, db } from './lib/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setInitialized } from './store/authSlice'
import { setLoading, setCourses, setError } from './store/coursesSlice'
import { RootState } from './store/store'
import { scrollToTop } from './utils/helpers'

// Components
import Header from './components/Header'
import Hero from './components/Hero'
import WhyNoCode from './components/WhyNoCode'
import Instructors from './components/Instructors'
import Courses from './components/Courses'
import Benefits from './components/Benefits'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import StartupBuilder from './components/StartupBuilder'

// Pages
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import CancellationRefund from './pages/CancellationRefund'
import ContactUs from './pages/ContactUs'

function App() {
  const location = useLocation()
  const dispatch = useDispatch()
  const { initialized } = useSelector((state: RootState) => state.auth)
  const isAuthPage = ['/login'].includes(location.pathname)

  // Scroll to top on route change
  useEffect(() => {
    scrollToTop({ behavior: 'instant' })
  }, [location.pathname])

  // Handle authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user))
      dispatch(setInitialized(true))
    })

    return () => unsubscribe()
  }, [dispatch])

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      dispatch(setLoading(true))
      try {
        const coursesRef = collection(db, 'courses')
        const q = query(coursesRef, limit(6))
        const snapshot = await getDocs(q)
        const coursesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        dispatch(setCourses(coursesData))
      } catch (err) {
        dispatch(setError('Failed to load courses'))
        console.error('Error fetching courses:', err)
      }
    }

    fetchCourses()
  }, [dispatch])

  if (!initialized) {
    return (
      <div className='min-h-screen bg-[#0d1117] flex items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent'></div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[#0d1117]'>
      {!isAuthPage && <Header />}
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/startup-builder' element={<StartupBuilder />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/courses' element={<CoursesPage />} />
        <Route path='/courses/:courseId' element={<CourseDetailPage />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
        <Route path='/cancellation-refund' element={<CancellationRefund />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route
          path='/'
          element={
            <main className='bg-[#0d1117]'>
              <Hero />
              <div className='bg-white'>
                <Courses />
                <WhyNoCode />
                <Benefits />
                <Instructors />
                <Testimonials />
              </div>
            </main>
          }
        />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </div>
  )
}

export default App