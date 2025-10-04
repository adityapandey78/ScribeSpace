import {useState,useEffect} from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import service from '../appwrite/config'
import {Container} from '../components/'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

export default function Post() {
    const[post,setPost]=useState(null);
    const [imageSrc, setImageSrc] = useState('');
    const {slug} =useParams();
    const navigate =useNavigate();

    const userData= useSelector((state)=>state.auth.userData);

    const isAuthor = post && userData ? post.userId=== userData.$id:false;

    useEffect(()=>{
        // Scroll to top when this page loads
        window.scrollTo(0, 0);
        
        if (slug) {
            service.getPost(slug).then((post)=>{
                if(post) {
                    setPost(post);
                    fetchImagePreview(post.featuredImage);
                } else navigate('/');
            })
        } else navigate('/');
        
    },[slug,navigate])
    
    // Fetching the image preview - using getFileView for consistency with Postcard
    const fetchImagePreview = async (fileId) => {
        try {
            console.log('Fetching image for fileId:', fileId);
            const imageUrl = await service.getFileView(fileId);
            console.log('Image URL received:', imageUrl);
            setImageSrc(imageUrl || '');
        } catch (err) {
            console.error('Error fetching image preview:', err);
            setImageSrc('');
        }
    };
    const deletePost=()=>{
        service.deletePost(post.$id).then((status)=>{
            if(status){
                service.deleteFile(post.featuredImage);
                navigate('/');
            }
        })
    }

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }
        return new Date(dateString).toLocaleDateString('en-US', options)
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-gray-600 dark:text-gray-400">Loading...</div>
            </div>
        )
    }

    return (
        <div className="py-4 md:py-8">
            <Container>
                <article className="max-w-3xl mx-auto px-4">
                    {/* Author and Actions Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8 mb-6 sm:mb-8">
                        {/* Author Info */}
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 p-0.5 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center p-2">
                                        <svg 
                                            className="w-full h-full text-gray-700 dark:text-gray-200" 
                                            viewBox="0 0 24 24" 
                                            fill="currentColor"
                                        >
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="font-medium text-base sm:text-lg text-gray-900 dark:text-white">
                                    {userData?.name || 'Anonymous'}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                    {formatDate(post.$createdAt)}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {isAuthor && (
                            <div className="flex items-center gap-4 self-end sm:self-auto">
                                <Link
                                    to={`/edit-post/${post.$id}`}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-cyan-500 hover:text-cyan-600 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                                        />
                                    </svg>
                                    <span>Edit</span>
                                </Link>
                                <button
                                    onClick={deletePost}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-500 hover:text-red-600 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m4-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                                        />
                                    </svg>
                                    <span>Delete</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent break-words hyphens-auto overflow-hidden">
                        {post.title}
                    </h1>

                    {/* Featured Image */}
                    {imageSrc ? (
                        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src={imageSrc}
                                alt={post.title}
                                className="w-full h-auto object-cover"
                                onError={(e) => {
                                    console.error('Image failed to load:', imageSrc);
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    ) : post.featuredImage ? (
                        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center" style={{minHeight: '400px'}}>
                            <div className="text-center text-gray-400">
                                <svg className="w-16 h-16 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M21 15V7a2 2 0 00-2-2H5a2 2 0 00-2 2v8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M3 19h18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <circle cx="12" cy="11" r="2.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <p className="text-sm">Loading image...</p>
                            </div>
                        </div>
                    ) : null}

                    {/* Content with refined styling */}
                    <div className="prose prose-base md:prose-lg max-w-none mx-auto">
                        <div className="text-gray-600 dark:text-gray-300 break-words whitespace-normal font-['Poppins']">
                            <div className="[&>p]:mb-3 [&>p]:leading-relaxed [&>p]:text-[0.875rem] md:text-base [&>p]:font-['Poppins'] [&>p]:tracking-normal
                                [&>h1]:text-xl md:[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-4 [&>h1]:font-['Poppins']
                                [&>h2]:text-lg md:[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-3 [&>h2]:font-['Poppins']
                                [&>h3]:text-base md:[&>h3]:text-xl [&>h3]:font-bold [&>h3]:mb-3 [&>h3]:font-['Poppins']
                                [&>ul]:list-disc [&>ul]:ml-4 md:[&>ul]:ml-6 [&>ul]:mb-3
                                [&>ol]:list-decimal [&>ol]:ml-4 md:[&>ol]:ml-6 [&>ol]:mb-3
                                [&>li]:mb-1 [&>li]:text-[0.875rem] md:[&>li]:text-base
                                [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-3 [&>blockquote]:italic [&>blockquote]:my-3 [&>blockquote]:text-[0.875rem] md:[&>blockquote]:text-base
                                [&>pre]:bg-gray-100 [&>pre]:p-3 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:dark:bg-gray-800 [&>pre]:text-[0.75rem] md:[&>pre]:text-sm
                                [&>code]:font-mono [&>code]:text-[0.75rem] md:[&>code]:text-sm [&>code]:bg-gray-100 [&>code]:dark:bg-gray-800 [&>code]:px-1 [&>code]:rounded
                                [&>a]:text-cyan-500 [&>a]:hover:text-cyan-600 [&>a]:underline [&>a]:text-[0.875rem] md:[&>a]:text-base
                                [&>img]:rounded-lg [&>img]:my-3 [&>img]:max-w-full [&>img]:h-auto"
                            >
                                {parse(post.content)}
                            </div>
                        </div>
                    </div>
                </article>
            </Container>
        </div>
    )
}
