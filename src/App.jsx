/**
 * Main Application Component
 * 
 * Handles the application's core layout and authentication state management.
 * Provides a responsive layout with header, main content area, and footer.
 * Includes decorative gradient orbs for visual enhancement.
 */

import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { login, logout } from './store/authSlice'
import { Header, Footer, ScrollToTop } from "./components/index"
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  
  // Check and restore user authentication state on application load
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])
  
  // Display loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse text-2xl text-gray-600 dark:text-gray-400">
          Loading...
        </div>
      </div>
    )
  }

  // Main application layout with responsive container and decorative elements
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <ScrollToTop />
      <Header />
      <main className="flex-grow pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      <Footer />
      
      {/* Decorative gradient orbs for visual enhancement */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"></div>
      </div>
    </div>
  )
}

export default App
