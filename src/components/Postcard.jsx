import { useEffect, useState } from 'react'
import service from "../appwrite/config"
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

function PostCard({ $id, title, featuredImage, userId, $createdAt }) {
  const [imageSrc, setImgSrc] = useState(null)
  const userData = useSelector((state) => state.auth.userData)
  
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const image = await service.getFileView(featuredImage)
        setImgSrc(image)
      } catch (err) {
        console.error('Error fetching image preview', err)
        setImgSrc('')
      }
    }
    fetchImage()
  }, [featuredImage])
    
  return (
    <Link to={`/post/${$id}`} className="block group">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-pink-50 via-violet-50 to-purple-50 dark:bg-gray-800 h-full border border-violet-100 dark:border-gray-700/20 transition-all duration-300 group-hover:border-violet-500/50 dark:group-hover:border-cyan-500/50 group-hover:translate-y-[-4px] backdrop-blur-sm">
        {/* Fixed aspect ratio container for image */}
        <div className="relative w-full pt-[56.25%]"> {/* 16:9 aspect ratio */}
          {imageSrc ? (
            <img 
              src={imageSrc} 
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500 ease-out"
            />
          ) : (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
              {/* simple placeholder */}
              <svg className="w-12 h-12 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15V7a2 2 0 00-2-2H5a2 2 0 00-2 2v8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 19h18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="11" r="2.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-violet-900/80 dark:from-black/80 via-violet-900/20 dark:via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        </div>
        
        {/* Content */}
        <div className="p-4 bg-gradient-to-b from-pink-50/80 via-violet-50/80 to-purple-50/80 dark:from-gray-800 dark:to-gray-800 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-violet-600 dark:group-hover:text-cyan-500 transition-colors duration-300 line-clamp-2">
            {title}
          </h2>
          <div className="mt-2 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 dark:from-cyan-500 dark:via-purple-500 dark:to-pink-500 transition-all duration-500 ease-out"></div>
          {/* Author Info */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-3">
            <svg 
              className="w-4 h-4 group-hover:text-cyan-500 transition-colors duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
              />
            </svg>
            <span className="group-hover:text-cyan-500 transition-colors duration-300">
              {userId === userData?.$id ? userData?.name : 'Anonymous'}
            </span>
            <span className="text-gray-400 dark:text-gray-500">•</span>
            <span className="group-hover:text-cyan-500 transition-colors duration-300">
              {new Date($createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

PostCard.propTypes = {
  $id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  featuredImage: PropTypes.string.isRequired,
  userId: PropTypes.string,
  $createdAt: PropTypes.string.isRequired
}

export default PostCard