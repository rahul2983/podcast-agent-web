import React, { useState, useEffect } from 'react'
import { Search, Plus, X, ExternalLink } from 'lucide-react'
import { api } from '../../services/api'

const ShowSelector = ({ value, onChange }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState('')

  // Popular/Featured shows
  const featuredShows = [
    { 
      id: 'joe-rogan', 
      name: 'The Joe Rogan Experience', 
      description: 'Long-form conversations',
      image: 'https://via.placeholder.com/64x64'
    },
    { 
      id: 'tim-ferriss', 
      name: 'The Tim Ferriss Show', 
      description: 'World-class performers',
      image: 'https://via.placeholder.com/64x64'
    },
    { 
      id: 'lex-fridman', 
      name: 'Lex Fridman Podcast', 
      description: 'AI, science, technology',
      image: 'https://via.placeholder.com/64x64'
    },
    { 
      id: 'huberman', 
      name: 'Huberman Lab', 
      description: 'Neuroscience & health',
      image: 'https://via.placeholder.com/64x64'
    },
    { 
      id: 'pivot', 
      name: 'Pivot', 
      description: 'Tech, business, politics',
      image: 'https://via.placeholder.com/64x64'
    },
    { 
      id: 'startup', 
      name: 'StartUp Podcast', 
      description: 'Business & entrepreneurship',
      image: 'https://via.placeholder.com/64x64'
    }
  ]

  // Search for shows (mock function for now)
  const searchShows = async (query) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    setSearchError('')

    try {
      // Mock search results for now - replace with actual API call
      const mockResults = [
        {
          id: 'search-1',
          name: `${query} Podcast`,
          description: 'Search result description',
          images: [{ url: 'https://via.placeholder.com/64x64' }],
          total_episodes: 100
        }
      ]
      setSearchResults(mockResults)
    } catch (error) {
      console.error('Search failed:', error)
      setSearchError('Failed to search shows. Please try again.')
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        searchShows(searchQuery)
      } else {
        setSearchResults([])
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const addShow = (show) => {
    if (!value.shows.some(s => s.id === show.id)) {
      onChange({ 
        ...value, 
        shows: [...value.shows, {
          id: show.id,
          name: show.name,
          description: show.description,
          image: show.images?.[0]?.url || show.image
        }] 
      })
    }
  }

  const removeShow = (showId) => {
    onChange({ 
      ...value, 
      shows: value.shows.filter(s => s.id !== showId)
    })
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h3 className="font-medium text-gray-900 mb-4">Search for Specific Shows</h3>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for podcast shows..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spotify-green focus:border-transparent outline-none transition-all"
          />
          {isSearching && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-spotify-green"></div>
            </div>
          )}
        </div>

        {searchError && (
          <p className="text-red-600 text-sm mt-2">{searchError}</p>
        )}
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Search Results</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {searchResults.map(show => (
              <div key={show.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <img 
                    src={show.images?.[0]?.url || 'https://via.placeholder.com/48x48'} 
                    alt={show.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-gray-900 truncate">{show.name}</h5>
                    <p className="text-sm text-gray-600 truncate">{show.description}</p>
                    <p className="text-xs text-gray-500">{show.total_episodes} episodes</p>
                  </div>
                </div>
                <button
                  onClick={() => addShow(show)}
                  disabled={value.shows.some(s => s.id === show.id)}
                  className="ml-3 p-2 bg-spotify-green text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Featured Shows */}
      {!searchQuery && (
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Popular Shows</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {featuredShows.map(show => (
              <button
                key={show.id}
                onClick={() => addShow(show)}
                disabled={value.shows.some(s => s.id === show.id)}
                className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-left"
              >
                <img 
                  src={show.image} 
                  alt={show.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium text-gray-900 truncate">{show.name}</h5>
                  <p className="text-sm text-gray-600 truncate">{show.description}</p>
                </div>
                {!value.shows.some(s => s.id === show.id) && (
                  <Plus className="w-5 h-5 text-gray-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Shows */}
      {value.shows.length > 0 && (
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Your Selected Shows</h3>
          <div className="space-y-2">
            {value.shows.map(show => (
              <div key={show.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <img 
                    src={show.image || 'https://via.placeholder.com/48x48'} 
                    alt={show.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-green-900 truncate">{show.name}</h5>
                    <p className="text-sm text-green-700 truncate">{show.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-3">
                  <button
                    onClick={() => window.open(`https://open.spotify.com/show/${show.id}`, '_blank')}
                    className="p-2 text-green-700 hover:bg-green-100 rounded-lg transition-colors"
                    title="Open in Spotify"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeShow(show.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    title="Remove show"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <p className="text-sm font-medium text-blue-800">
              Shows are optional
            </p>
            <p className="text-xs text-blue-600 mt-1">
              If you have favorite podcasts, add them here. We'll prioritize new episodes from these shows. 
              Otherwise, we'll discover great shows based on your topics.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowSelector
