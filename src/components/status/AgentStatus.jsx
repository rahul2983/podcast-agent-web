import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  CheckCircle, 
  Clock, 
  Settings, 
  ExternalLink, 
  Play, 
  Edit3,
  LogOut,
  Sparkles,
  TrendingUp
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'
import { api } from '../../services/api'

const AgentStatus = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [status, setStatus] = useState(null)
  const [recentEpisodes, setRecentEpisodes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStatus()
  }, [])

  const fetchStatus = async () => {
    try {
      setIsLoading(true)
      const [statusResponse, episodesResponse] = await Promise.all([
        api.get('/api/web/status'),
        api.get('/api/web/recent-episodes?limit=5')
      ])
      
      setStatus(statusResponse.data)
      setRecentEpisodes(episodesResponse.data.episodes || [])
    } catch (error) {
      console.error('Failed to fetch status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const openSpotify = () => {
    window.open('https://open.spotify.com', '_blank')
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-spotify-green"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                🎉 You're all set, {user?.displayName || 'there'}!
              </h1>
              <p className="text-gray-600 mt-1">
                Your podcast agent is running automatically
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Agent Status</p>
                <p className="text-2xl font-bold text-green-600">Active</p>
                <p className="text-xs text-gray-500">Last run: {status?.lastRun || '2 hours ago'}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Episodes Found</p>
                <p className="text-2xl font-bold text-blue-600">{status?.episodesThisWeek || 12}</p>
                <p className="text-xs text-gray-500">This week</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Queue Time</p>
                <p className="text-2xl font-bold text-purple-600">{status?.queueDuration || '4h 25m'}</p>
                <p className="text-xs text-gray-500">Ready to listen</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Your Preferences */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Preferences</h2>
            <button
              onClick={() => navigate('/preferences')}
              className="flex items-center gap-2 text-spotify-green hover:text-green-700 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Topics */}
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {(status?.preferences?.topics || ['Technology', 'Business', 'AI']).map(topic => (
                  <span key={topic} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Shows */}
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Favorite Shows</h3>
              <div className="space-y-2">
                {(status?.preferences?.shows || [
                  { name: 'The Tim Ferriss Show' },
                  { name: 'Lex Fridman Podcast' }
                ]).map(show => (
                  <div key={show.name} className="text-sm text-gray-600">
                    {show.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Duration & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-100">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Episode Length</h3>
              <p className="text-sm text-gray-600">
                {status?.preferences?.minDuration || 15} - {status?.preferences?.maxDuration || 120} minutes
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Email Notifications</h3>
              <p className="text-sm text-gray-600">
                {status?.preferences?.emailEnabled ? '✅ Enabled' : '❌ Disabled'}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Finds */}
        {recentEpisodes.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <h2 className="text-xl font-semibold text-gray-900">Recent Finds</h2>
            </div>

            <div className="space-y-4">
              {recentEpisodes.map((episode, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <img 
                      src={episode.image || '/api/placeholder/48/48'} 
                      alt={episode.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{episode.name}</h4>
                      <p className="text-sm text-gray-600 truncate">{episode.showName}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span>{episode.duration}</span>
                        <span>Score: {episode.relevanceScore}/1.0</span>
                        <span>{episode.addedAt}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => window.open(episode.spotifyUrl, '_blank')}
                    className="ml-4 p-2 bg-spotify-green text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="bg-gradient-to-r from-spotify-green to-emerald-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">🎧 Ready to Listen?</h2>
          <p className="text-green-100 mb-6">
            Episodes are automatically added to your Spotify queue daily.
            <br />
            Open Spotify to start listening to your personalized podcast feed!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={openSpotify}
              className="bg-white text-spotify-green hover:bg-gray-100 font-semibold px-8 py-3 text-lg flex items-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              Open Spotify
            </Button>
            
            <button
              onClick={() => navigate('/preferences')}
              className="text-white hover:text-green-100 underline transition-colors"
            >
              Adjust My Preferences
            </button>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Daily Discovery</h3>
              <p className="text-sm text-gray-600">
                We scan thousands of podcasts every day to find episodes matching your interests
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">AI Curation</h3>
              <p className="text-sm text-gray-600">
                Our AI evaluates each episode for relevance to your topics and preferences
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎵</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Auto Queue</h3>
              <p className="text-sm text-gray-600">
                Perfect episodes are automatically added to your Spotify queue
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentStatus