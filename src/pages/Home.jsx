import { useEffect, useState, useRef } from 'react'
import service from '../appwrite/config'
import { Container, Postcard } from '../components'
import { Link } from 'react-router-dom'
import { Query } from 'appwrite'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const postsRef = useRef(null)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await service.getPosts([
                    Query.equal("status", "active"),
                    Query.orderDesc("$createdAt"),
                    Query.limit(6)
                ]);
                console.log("Response from getPosts:", response); // Debug log

                if (response && response.documents) {
                    setPosts(response.documents);
                } else {
                    setError("No posts found");
                }
            } catch (err) {
                console.error("Error fetching posts:", err);
                setError("Failed to load posts");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();

        // Intersection Observer setup
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in')
                        entry.target.classList.remove('opacity-0')
                    }
                })
            },
            { threshold: 0.1 }
        )

        if (postsRef.current) {
            observer.observe(postsRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const contentCategories = [
        {
            title: "Code Tutorials",
            description: "Share your coding knowledge",
            gif: "https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            )
        },
        {
            title: "Tech Reviews",
            description: "Latest tech insights",
            gif: "https://media.giphy.com/media/Dh5q0sShxgp13DwrvG/giphy.gif",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: "Game Analysis",
            description: "Deep dive into gaming",
            gif: "https://media.giphy.com/media/DpXqHdILXRRDi/giphy.gif",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
            )
        },
        {
            title: "AI & Future",
            description: "Explore tomorrow's tech",
            gif: "https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            )
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="py-12 md:py-20 px-4 text-center">
                <Container>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 animate-fade-in">
                        <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                            ScribeSpace
                        </span>
                        <br />
                        <span className="text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl">
                            A Coder&apos;s Chronicle
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-6 md:mb-8 max-w-3xl mx-auto animate-fade-in animation-delay-200">
                        Love blogging? Whether it&apos;s movie recommendations, code documentation, 
                        game reviews, or your personal tech journey - we&apos;ve got you covered.
                    </p>
                    <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 italic mb-6 md:mb-8 animate-fade-in animation-delay-300">
                        &quot;The place for coders 🧑‍💻, by coders🎉&quot;
                    </p>
                </Container>
            </section>

            {/* Features Section with GIFs */}
            <section id="features" className="py-12 md:py-20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 dark:from-cyan-500/5 dark:to-purple-500/5">
                <Container>
                    <div className="max-w-6xl mx-auto text-center mb-8 md:mb-16 px-4">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                            Express Yourself Through Code & Content
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 md:mb-12 max-w-3xl mx-auto">
                            Join a community of tech enthusiasts sharing their knowledge, experiences, and discoveries. 
                            From beginner tutorials to advanced tech deep-dives, every voice matters.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {contentCategories.map((category) => (
                                <div 
                                    key={category.title} 
                                    className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                                >
                                    <div className="aspect-w-16 aspect-h-9 overflow-hidden w-full h-48">
                                        <img 
                                            src={category.gif} 
                                            alt={category.title}
                                            className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow items-center justify-center text-center">
                                        <div className="text-gray-200 dark:text-gray-300 mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                            {category.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                                            {category.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Posts Section */}
            <section 
                ref={postsRef} 
                className={`py-20 transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}
            >
                <Container>
                    <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                        Latest Posts
                    </h2>
                    
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <div key={n} className="animate-pulse">
                                    <div className="bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden">
                                        <div className="aspect-w-16 aspect-h-9 bg-gray-300 dark:bg-gray-600"></div>
                                        <div className="p-4">
                                            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-center text-gray-600 dark:text-gray-400">
                            {error}
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center text-gray-600 dark:text-gray-400">
                            Want to see posts?✨ Log in and Let's get started!🚀
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {posts.map((post) => (
                                <div key={post.$id} className="transform hover:-translate-y-1 transition-transform duration-300">
                                    <Postcard {...post} />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* View All Posts Link */}
                    {posts.length > 0 && (
                        <div className="text-center mt-12">
                            <Link 
                                to="/all-posts"
                                className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-600 transition-colors"
                            >
                                <span>View All Posts</span>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>
                    )}
                </Container>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 dark:from-cyan-500/5 dark:to-purple-500/5">
                <Container>
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                            Ready to Share Your Story?
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/add-post"
                                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
                            >
                                <span>Start Writing</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <a
                                href="https://github.com/Shivesh7856/ScribeSpace"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3 bg-gray-900 dark:bg-gray-800 text-white rounded-full hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 border-2 border-transparent hover:border-cyan-500"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                <span>View Source</span>
                            </a>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    )
}

export default Home