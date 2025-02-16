import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
        try {
            const slug = slugTransform(data.title, userData.$id);  // Generate slug
            console.log('Generated slug:', slug);    // Log the slug

            if (post) {
                const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
                // ye upr image uploadkrne ke liye hai
                console.log("Uploaded the Image!");
                
                if (file) {
                    try {
                        console.log("Attempting to delete the old Image");
                        await service.deleteFile(post.featuredImage)
                        console.log("Old Image deleted Successfully!"); 
                    } catch (deletError) {
                        console.log("There was error in deleting file!", deletError);
                    }
                }
                // ye delete krne ke liye appwrite ki services use kr rhe hain

                try {
                    const updatePayload = {
                        ...data,
                        slug: data.title !== post.title ? slugTransform(data.title) : post.slug, // Update slug if title changes
                        featuredImage: file ? file.$id : post.featuredImage, // retaining the existing file
                    }
                    console.log("Payload for update post!", updatePayload);
                    
                    const dbPost = await service.updatePost(post.$id, updatePayload);
                    console.log("Response from updatePayload", dbPost);
                
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                        console.log("Updating the post was success!");
                    } else {
                        console.error("Update operation returned null or undefined:", dbPost);
                    }
                } catch (error) {
                    console.error("Error during update process:", error);
                }
            } else {
                const file = await service.uploadFile(data.image[0]);
                if (file) {
                    const fileId = file.$id
                    data.featuredImage = fileId

                    // explicitly including the conntent
                    const postData = {
                        title: data.title,
                        content: data.content,
                        featuredImage: file ? file.$id : undefined,
                        status: data.status,
                        slug
                    };
                    console.log("Data being sent to createPost:", postData); // Debug log
                    console.log("The uploaded content is", data.content);
                    
                    // const dbPost=await service.createPost(postData)
                    const dbPost = await service.createPost({ ...data, userId: userData.$id })
                    console.log("Response from createPost:", dbPost); // Debug log
                    
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`)
                    }
                }
            }
        } catch (error) {
            console.error("Error during submit:", error);
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim() //wo value pehle trim krega
                .toLowerCase()
                .replace(/[^a-z\d\s-]/g, '') //regex hain ye, jo bich ki spaces and all ko sahi kr de and kuchh inputkr de
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-') // Replace multiple consecutive hyphens with a single hyphen
        }
        return ''
    }, [])

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }))
            }
        })
        return () => subscription.unsubscribe()
    }, [watch, slugTransform, setValue])

    const handleFileSelect = (e) => {
        // Handle file selection
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <div className="bg-white/50 dark:bg-gray-800 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-violet-100 dark:border-gray-700/20">
                <form onSubmit={handleSubmit(submit)} className="space-y-6">
                    {/* Main Content Section */}
                    <div className="flex-1 space-y-2 lg:space-y-4">
                        <Input
                            label="Title"
                            placeholder="Enter post title"
                            {...register("title", { required: true })}
                            className="w-full text-sm lg:text-base"
                        />
                        <Input
                            label="Slug"
                            placeholder="url-friendly-slug"
                            {...register("slug", { required: true })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                            }}
                            className="w-full text-sm lg:text-base"
                        />
                        <RTE 
                            label="Content" 
                            name="content" 
                            control={control} 
                            defaultValue={getValues("content")} 
                        />
                    </div>

                    {/* Sidebar Section */}
                    <div className="w-full lg:w-72 space-y-2 lg:space-y-4">
                        <Input
                            label="Featured Image"
                            type="file"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                            className="w-full text-sm lg:text-base"
                        />
                        {post && (
                            <div className="w-full rounded-lg overflow-hidden">
                                <img
                                    src={service.getFilePreview(post.featuredImage)}
                                    alt={post.title}
                                    className="w-full h-auto"
                                />
                            </div>
                        )}
                        <Select 
                            options={["active", "inactive"]}
                            label="Status"
                            {...register("status", { required: true })}
                            className="w-full text-sm lg:text-base"
                        />
                        <button
                            type="submit"
                            className="w-full group relative px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]"
                            disabled={false}
                        >
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative flex items-center justify-center gap-2">
                                <span>{post ? "Update" : "Publish"}</span>
                                <svg className="w-4 h-4 lg:w-5 lg:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                </svg>
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

PostForm.propTypes = {
    post: PropTypes.shape({
        $id: PropTypes.string,
        title: PropTypes.string,
        slug: PropTypes.string,
        content: PropTypes.string,
        featuredImage: PropTypes.string,
        status: PropTypes.string,
    })
}

export default PostForm