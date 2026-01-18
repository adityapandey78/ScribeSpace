import { Link } from 'react-router-dom'
import { Logo } from '../index'

function Footer() {
    return (
        <footer className="relative py-8 mt-16 border-t border-gray-200/50 dark:border-gray-700/50 z-10">
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl"></div>
            
            <div className="relative">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Logo & Description */}
                    <div className="flex flex-col items-center sm:items-start space-y-4">
                        <div className="mx-auto sm:mx-0">
                            <Logo 
                                width="50px" 
                                className="hover:scale-105 transition-transform duration-300" 
                            />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 text-center sm:text-left">
                            A platform for developers to share their knowledge and experiences through blogs.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center sm:text-left">Quick Links</h3>
                        <ul className="space-y-2 text-center sm:text-left">
                            <li>
                                <Link to="/" className="text-sm text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/all-posts" className="text-sm text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors">
                                    All Posts
                                </Link>
                            </li>
                            <li>
                                <Link to="/add-post" className="text-sm text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors">
                                    Add Post
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center sm:text-left">Connect With Us</h3>
                        <div className="flex flex-col space-y-2 items-center sm:items-start">
                            <a 
                                href="mailto:contact@scribespace.com" 
                                className="text-sm text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                contact@scribespace.com
                            </a>
                            <div className="flex items-center gap-4 mt-4">
                                <a 
                                    href="" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a 
                                    href="" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors"
                                    aria-label="X (formerly Twitter)"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright and Social Links */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center space-y-4">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        Made with 
                        <span className="mx-1">
                            <svg className="w-4 h-4 inline-block text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </span>
                        by Shivesh Kumar
                    </p>
                    
                    {/* Social Media Links */}
                    <div className="flex justify-center items-center gap-4">
                        <a 
                            href="mailto:shiveshkumar822@gmail.com" 
                            className="text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors"
                            aria-label="Email"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </a>
                        <a 
                            href="https://github.com/Shivesh7856" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors"
                            aria-label="GitHub"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/shiveshkumar56" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors"
                            aria-label="LinkedIn"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                        {/* <a 
                            href="https://x.com/adityapandey78" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors"
                            aria-label="X (formerly Twitter)"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a> */}
                    </div>
                </div>
            </div>
            </div>
        </footer>
    )
}

export default Footer