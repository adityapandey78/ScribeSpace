import React, { useCallback, useState } from 'react'
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
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState("")
    const [submitStatus, setSubmitStatus] = useState("")

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-z\d\s-]/g, '') //regex for valid chars
                .replace(/\s+/g, '-') // Replace spaces with hyphens
                .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        }
        return ''
    }, [])

    const submit = async (data) => {
        if (!userData?.$id) {
            setSubmitError("User authentication required. Please login.");
            navigate('/login');
            return;
        }

        setIsSubmitting(true)
        setSubmitError("")
        setSubmitStatus("Submitting post...")

        try {
            const slug = slugTransform(data.title);
            console.log('Generated slug:', slug);

            if (post) {
                setSubmitStatus("Uploading image...")
                const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
                
                if (file) {
                    setSubmitStatus("Updating old image...")
                    try {
                        await service.deleteFile(post.featuredImage)
                    } catch (deletError) {
                        console.log("Error deleting old image:", deletError);
                        setSubmitError("Warning: Could not delete old image, but proceeding with update");
                    }
                }

                setSubmitStatus("Updating post...")
                const updatePayload = {
                    ...data,
                    slug: data.title !== post.title ? slugTransform(data.title) : post.slug,
                    featuredImage: file ? file.$id : post.featuredImage,
                }
                
                const dbPost = await service.updatePost(post.$id, updatePayload);
                
                if (dbPost) {
                    setSubmitStatus("Post updated successfully!")
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    throw new Error("Failed to update post");
                }
            } else {
                if (!data.image?.[0]) {
                    setSubmitError("Please select a featured image");
                    return;
                }

                setSubmitStatus("Uploading image...")
                const file = await service.uploadFile(data.image[0]);
                
                if (file) {
                    setSubmitStatus("Creating post...")
                    const dbPost = await service.createPost({ 
                        ...data, 
                        featuredImage: file.$id,
                        userId: userData.$id 
                    });
                    
                    if (dbPost) {
                        setSubmitStatus("Post created successfully!")
                        navigate(`/post/${dbPost.$id}`);
                    } else {
                        throw new Error("Failed to create post");
                    }
                } else {
                    throw new Error("Failed to upload image");
                }
            }
        } catch (error) {
            console.error("Error during submit:", error);
            setSubmitError(error.message || "Failed to submit post. Please try again.");
        } finally {
            setIsSubmitting(false)
        }
    }

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
            <div className="backdrop-blur-md bg-white/20 dark:bg-gray-900/20 rounded-2xl p-6 lg:p-8 shadow-xl border border-white/20 dark:border-gray-700/20">
                {/* Status and Error Messages */}
                {submitStatus && (
                    <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 dark:from-cyan-500/5 dark:to-purple-500/5 backdrop-blur-sm border border-cyan-500/20 dark:border-cyan-500/10">
                        <div className="flex items-center gap-3">
                            {isSubmitting && (
                                <svg className="animate-spin h-5 w-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{submitStatus}</span>
                        </div>
                    </div>
                )}
                
                {submitError && (
                    <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm text-red-600 dark:text-red-400">{submitError}</span>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit(submit)} className="space-y-6">
                    {/* Main Content Section */}
                    <div className="flex-1 space-y-2 lg:space-y-4">
                        <Input
                            label="Title"
                            placeholder="Enter post title"
                            {...register("title", { required: true })}
                            className="w-full text-sm lg:text-base"
                            disabled={isSubmitting}
                        />
                        <Input
                            label="Slug"
                            placeholder="url-friendly-slug"
                            {...register("slug", { required: true })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                            }}
                            className="w-full text-sm lg:text-base"
                            disabled={isSubmitting}
                        />
                        <RTE 
                            label="Content" 
                            name="content" 
                            control={control} 
                            defaultValue={getValues("content")}
                            disabled={isSubmitting}
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
                            disabled={isSubmitting}
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
                            disabled={isSubmitting}
                        />
                        <button
                            type="submit"
                            className={`w-full group relative px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                            disabled={isSubmitting}
                        >
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative flex items-center justify-center gap-2">
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>{post ? "Update" : "Publish"}</span>
                                        <svg className="w-4 h-4 lg:w-5 lg:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                        </svg>
                                    </>
                                )}
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