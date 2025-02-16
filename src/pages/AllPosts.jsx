import {useState,useEffect} from 'react'
import service from '../appwrite/config' 
import { Container,Postcard } from '../components'

function AllPosts() {
    const [posts,setPosts]=useState([]) //udhr config se all posts ek arrya send krega appwrite
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        service.getPosts([]).then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
            setLoading(false);
        })
    },[])
  
  return (
    <div className="py-2 md:py-4">
        <Container>
            <div className="w-full max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8 md:mb-12 text-center">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent mb-4">
                        All Articles
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                        Explore our collection of insightful articles
                    </p>
                </div>

                {/* Posts Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {posts.map((post) => (
                            <div key={post.$id} className="transform hover:-translate-y-1 transition-transform duration-300">
                                <Postcard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Container>
    </div>
  ) 
}

export default AllPosts