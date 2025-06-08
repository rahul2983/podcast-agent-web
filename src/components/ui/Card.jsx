// src/components/ui/Card.jsx
import React from 'react'
import clsx from 'clsx'

const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={clsx(
        'bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card