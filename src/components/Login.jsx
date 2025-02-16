import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from "react-hook-form"

function Login() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm() //useform is used like this
    //https://react-hook-form.com/
    const [error,setError]=useState("")
    //loginko async funcc bnaya hu , coz bahut saari chijein hongi
    const login=async(data)=>{
        setError("")
        try {
            console.log("trying logging in");
            
            const session =await authService.login(data)
            if(session){
                const userData=await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData))
                navigate("/")
            }
            
        }catch (error){
            setError(error.message)
            console.log("issue with login componeent");
            
        }
        console.log("Login is rendering")
    }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-violet-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4'>
        <div className='w-full max-w-lg backdrop-blur-lg bg-white/30 dark:bg-gray-800/50 rounded-2xl p-8 shadow-xl border border-violet-100 dark:border-gray-700/20'>
            <div className='mb-6 flex flex-col items-center'>
                <div className='mb-4 text-center space-y-2'>
                    <h2 className='text-3xl font-bold text-gray-800 dark:text-white'>
                        Welcome Back
                    </h2>
                    <p className='text-gray-600 dark:text-gray-400 font-mono'>
                        {`{ status: "ready_to_code" }`}
                    </p>
                </div>
                <div className='w-20 h-20 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 dark:from-cyan-500 dark:via-blue-500 dark:to-purple-500 rounded-full p-0.5 shadow-lg'>
                    <div className='w-full h-full rounded-full bg-white/95 dark:bg-gray-900/95 flex items-center justify-center p-4 backdrop-blur-sm'>
                        <Logo 
                            width='100%'
                            className="text-gray-800 dark:text-white"
                        />
                    </div>
                </div>
            </div>

            {error && (
                <p className='text-red-500 mt-8 text-center font-mono text-sm'>
                    {`// Error: ${error}`}
                </p>
            )}

            <form onSubmit={handleSubmit(login)} className='mt-8 space-y-4'>
                <div className='space-y-3'>
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none'>
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                        </div>
                        <Input
                            label="Email"
                            placeholder="dev@example.com"
                            type="email"
                            className="pl-8 text-sm py-2"
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
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none'>
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-8 text-sm py-2"
                            {...register("password", { required: true })}
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full py-2 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 dark:from-cyan-500 dark:via-purple-500 dark:to-pink-500 text-white text-sm rounded-lg hover:opacity-95 transition-all duration-200 font-medium"
                >
                    <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Login to Console
                    </span>
                </Button>

                <p className='text-center text-gray-600 dark:text-gray-400 font-mono text-xs sm:text-sm pt-2'>
                    {`// Need an account? `}
                    <Link
                        to="/signup"
                        className='text-violet-600 dark:text-cyan-400 hover:text-pink-500 dark:hover:text-purple-400 transition-colors duration-200'
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