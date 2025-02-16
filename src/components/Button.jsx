import React from 'react'
//custom btn component to be used whenever we need buttons
function Button({
    children,
    type='button',
    bgColor='bg-blue-600',
    textColor='text-white',
    className='', //taaki hum khud input kr ske if need
    ...props //agar need hogi and aur props use krenge to uske liye 
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}{...props}>{children}
    </button>
  )
}

export default Button