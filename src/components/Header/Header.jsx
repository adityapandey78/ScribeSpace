import { useState, useEffect } from 'react'
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth.status)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      // Check localStorage first
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        // Apply theme immediately on mount
        document.documentElement.classList.toggle('dark', savedTheme === 'dark')
        return savedTheme === 'dark'
      }
      // Check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.classList.toggle('dark', systemPrefersDark)
      return systemPrefersDark
    }
    return false
  })

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus
    }
  ]

  useEffect(() => {
    // Apply theme whenever it changes
    document.documentElement.classList.toggle('dark', isDarkMode)
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev)
  }

  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300">
      {/* Clear Glassmorphism Background */}
      <div className="absolute inset-0 bg-white/20 dark:bg-gray-900/20 backdrop-blur-md border-b border-white/10 dark:border-gray-700/10"></div>
      
      <div className="relative">
      <Container>
        <nav className="flex items-center justify-between h-12 py-8">
          {/* Logo Section */}
          <div className="group">
            <Link to="/">
              <Logo 
                width="50px" 
                className="hover:scale-105 transition-transform duration-300 py-4 " 
              />
            </Link>
            <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300"></div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-1.5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className={`lg:flex items-center gap-3 ${
            isMenuOpen 
              ? 'absolute top-full left-auto right-2 bg-white dark:bg-gray-900 shadow-lg p-3 flex flex-col max-w-[220px] rounded-lg mt-1' 
              : 'hidden'
          }`}>
            <ul className={`flex ${isMenuOpen ? 'flex-col space-y-1' : 'items-center gap-3'}`}>
              {navItems.map((item) => 
                item.active ? (
                  <li key={item.name} className={isMenuOpen ? 'w-full' : 'relative'}>
                    <button
                      onClick={() => {
                        navigate(item.slug)
                        setIsMenuOpen(false)
                      }}
                      className="group px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 w-full text-left relative"
                    >
                      <span>{item.name}</span>
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </button>
                  </li>
                ) : null
              )}
            </ul>

            {/* Theme Toggle and Logout */}
            <div className={`flex items-center ${isMenuOpen ? 'mt-3 pt-3 border-t border-gray-200 dark:border-gray-700' : 'gap-3'}`}>
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              {authStatus && <LogoutBtn onClick={() => setIsMenuOpen(false)} />}
            </div>
          </div>
        </nav>
      </Container>

      </div>
      
      {/* Neon Border Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 dark:via-cyan-500/50 to-transparent"></div>
    </header>
  )
}

export default Header