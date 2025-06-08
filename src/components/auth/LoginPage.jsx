import React, { useState } from 'react'
import { Music, Headphones, Settings, Zap } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'

const LoginPage = () => {
  const { loginWithSpotify } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      await loginWithSpotify()
    } catch (error) {
      console.error('Login failed:', error)
      setIsLoading(false)
    }
  }

  const features = [
    {
      icon: <Settings className="w-5 h-5" />,
      text: "Set your preferences once"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      text: "AI finds perfect episodes"
    },
    {
      icon: <Headphones className="w-5 h-5" />,
      text: "Auto-added to your queue"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-spotify-green to-emerald-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-spotify-green bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Music className="w-8 h-8 text-spotify-green" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Podcast Agent
          </h1>
          <p className="text-gray-600 text-lg">
            Your personal podcast curator
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 text-gray-700">
              <div className="bg-spotify-green bg-opacity-10 p-2 rounded-full">
                {feature.icon}
              </div>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="bg-gray-50 p-4 rounded-xl mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 text-center">How it works</h3>
          <ol className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start">
              <span className="bg-spotify-green text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
              Connect your Spotify account safely
            </li>
            <li className="flex items-start">
              <span className="bg-spotify-green text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
              Tell us your podcast preferences
            </li>
            <li className="flex items-start">
              <span className="bg-spotify-green text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
              Get perfect episodes automatically
            </li>
          </ol>
        </div>

        {/* Login Button */}
        <Button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-spotify-green hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-3 text-lg transition-all duration-200 transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Connecting...
            </>
          ) : (
            <>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Continue with Spotify
            </>
          )}
        </Button>

        {/* Privacy Note */}
        <p className="text-xs text-gray-500 mt-4 text-center leading-relaxed">
          We only access your Spotify queue to add episodes. 
          <br />
          No personal data is stored or shared.
        </p>
      </div>
    </div>
  )
}

export default LoginPage