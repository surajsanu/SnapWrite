import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-[#F4A261]',
    textColor = 'text-[#1E293B]',
    className= '',
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`} {...props}>
        {children}
    </button>
  )
}

export default Button
