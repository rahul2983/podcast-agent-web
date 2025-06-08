// src/components/ui/LoadingSpinner.jsx
import React from 'react'
import clsx from 'clsx'

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={clsx('animate-spin rounded-full border-2 border-gray-200 border-t-spotify-green', sizes[size], className)} />
  )
}

export default LoadingSpinner