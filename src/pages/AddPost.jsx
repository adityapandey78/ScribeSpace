import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='py-4 lg:py-8'>
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
            Create New Post
          </h1>
          <PostForm />
        </div>
      </Container>
    </div>
  )
}

export default AddPost