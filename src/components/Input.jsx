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
                    className='inline-block mb-1.5 pl-1 text-gray-300 font-mono text-xs sm:text-sm'
                    htmlFor={id}
                >
                    {`// ${label}`}
                </label>
            )}
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white/70 dark:bg-[#1E293B] text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-violet-500/50 dark:focus:ring-cyan-500/50 duration-200 border border-violet-100 dark:border-gray-700/50 w-full placeholder-gray-500 text-sm backdrop-blur-sm ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input