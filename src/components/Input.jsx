import React,{useId} from 'react'

//* forward ref: https://react.dev/reference/react/forwardRef

//forward ref let us store the state of different component whereeever you need
//?coz is input ko hum as a component le rhe hain and we need its state to proper functiong of the form so, in this case the forward ref hook is used

//input ko simple fat arrow function me le liya for better look and ease of codebase

//inputko foreward ref me wrap kr diya
const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && (
                <label
                    className='block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300'
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`px-4 py-3 rounded-lg bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-purple-500 focus:border-transparent duration-200 border border-gray-200 dark:border-gray-700 w-full placeholder-gray-400 backdrop-blur-sm ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input