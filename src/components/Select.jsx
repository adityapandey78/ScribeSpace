import React, { useId } from 'react'

function Select({
    options,
    label,
    className,
    ...props}
,ref) {
    const id= useId()
  return (
   <div className='w-full'>
    {label && (
        <label 
            htmlFor={id} 
            className='block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300'
        >
            {label}
        </label>
    )}
    <select {...props}
    id={id}
    ref={ref}
    className={`px-4 py-3 rounded-lg bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-purple-500 focus:border-transparent duration-200 border border-gray-200 dark:border-gray-700 w-full backdrop-blur-sm ${className}`}>
        {options?.map((option)=>(
            <option key={option} value={option} className='bg-white dark:bg-gray-800'>{option}</option>
        ))}
    </select>
   </div>
  )
}

export default React.forwardRef(Select)