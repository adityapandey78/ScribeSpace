import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const login = async(data) => {
        setError("")
        setIsLoading(true)
        try {
            const session = await authService.login(data)
            if(session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-violet-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4'>
            <div className='w-full max-w-lg backdrop-blur-lg bg-white/30 dark:bg-gray-800/50 rounded-2xl p-8 shadow-xl border border-violet-100 dark:border-gray-700/20'>
                <div className='mb-8 flex flex-col items-center'>
                    <div className='mb-6 text-center space-y-2'>
                        <h2 className='text-3xl font-bold text-gray-800 dark:text-white'>
                            Welcome Back
                        </h2>
                        <p className='text-gray-600 dark:text-gray-400 font-mono'>
                            {`{ status: "${isLoading ? 'authenticating...' : 'ready_to_code'}" }`}
                        </p>
                    </div>
                    <div className='relative w-24 h-24'>
                        <div className={`absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 dark:from-cyan-500 dark:via-blue-500 dark:to-purple-500 rounded-full ${isLoading ? 'animate-pulse' : ''}`}></div>
                        <div className='absolute inset-[2px] rounded-full bg-white/95 dark:bg-gray-900/95 flex items-center justify-center backdrop-blur-sm'>
                            <div className='w-16 h-16 flex items-center justify-center'>
                                <Logo 
                                    width='100%'
                                    className={`text-gray-800 dark:text-white`}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {error && (
                    <p className='text-red-500 mt-8 text-center font-mono text-sm'>
                        {`// Error: ${error}`}
                    </p>
                )}

                <form onSubmit={handleSubmit(login)} className='mt-8 space-y-4'>
                    <div className='space-y-4'>
                        <div className='relative flex items-center'>
                            <div className='absolute left-3 flex items-center justify-center w-5 h-5'>
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </div>
                            <Input
                                label="Email"
                                placeholder="dev@example.com"
                                type="email"
                                className="w-full pl-10 text-sm h-11"
                                disabled={isLoading}
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPattern: (value) =>
                                            /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "// Invalid email syntax",
                                    }
                                })}
                            />
                        </div>
                        <div className='relative flex items-center'>
                            <div className='absolute left-3 flex items-center justify-center w-5 h-5'>
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                className="w-full pl-10 text-sm h-11"
                                disabled={isLoading}
                                {...register("password", { required: true })}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 dark:from-cyan-500 dark:via-purple-500 dark:to-pink-500 text-white text-sm rounded-lg transition-all duration-200 font-medium ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:opacity-95'}`}
                    >
                        <span className="flex items-center justify-center gap-2">
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    Login to Console
                                </>
                            )}
                        </span>
                    </Button>

                    <p className='text-center text-gray-600 dark:text-gray-400 font-mono text-xs sm:text-sm pt-2'>
                        {`// Need an account? `}
                        <Link
                            to="/signup"
                            className={`text-violet-600 dark:text-cyan-400 hover:text-pink-500 dark:hover:text-purple-400 transition-colors duration-200 ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
                        >
                            Register Here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login