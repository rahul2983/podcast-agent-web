import React from 'react'
import { Clock } from 'lucide-react'

const DurationSelector = ({ value, onChange }) => {
  const presets = [
    { name: 'Quick Listens', min: 5, max: 20, icon: '⚡', description: 'Perfect for commutes' },
    { name: 'Standard Episodes', min: 20, max: 60, icon: '🎧', description: 'Most popular length' },
    { name: 'Deep Dives', min: 60, max: 180, icon: '🔍', description: 'Long-form content' },
    { name: 'Any Length', min: 5, max: 300, icon: '🌍', description: 'No restrictions' }
  ]

  const updateDuration = (updates) => {
    onChange({ 
      ...value, 
      duration: { ...value.duration, ...updates }
    })
  }

  const selectPreset = (preset) => {
    updateDuration({ min: preset.min, max: preset.max })
  }

  const formatTime = (minutes) => {
    if (minutes < 60) {
      return `${minutes}m`
    } else {
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
    }
  }

  const currentPreset = presets.find(p => 
    p.min === value.duration.min && p.max === value.duration.max
  )

  return (
    <div className="space-y-6">
      {/* Quick Presets */}
      <div>
        <h3 className="font-medium text-gray-900 mb-4">Choose Your Preferred Length</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {presets.map(preset => (
            <button
              key={preset.name}
              onClick={() => selectPreset(preset)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 text-left ${
                currentPreset?.name === preset.name
                  ? 'border-spotify-green bg-spotify-green bg-opacity-10'
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">{preset.icon}</span>
                <h4 className="font-semibold text-gray-900">{preset.name}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-1">{preset.description}</p>
              <p className="text-xs text-gray-500">
                {formatTime(preset.min)} - {formatTime(preset.max)}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Range */}
      <div>
        <h3 className="font-medium text-gray-900 mb-4">Or Set Custom Range</h3>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          {/* Minimum Duration */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Minimum Duration: {formatTime(value.duration.min)}
            </label>
            <input
              type="range"
              min="5"
              max="180"
              step="5"
              value={value.duration.min}
              onChange={(e) => updateDuration({ min: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>5m</span>
              <span>3h</span>
            </div>
          </div>

          {/* Maximum Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Maximum Duration: {formatTime(value.duration.max)}
            </label>
            <input
              type="range"
              min="10"
              max="300"
              step="10"
              value={value.duration.max}
              onChange={(e) => updateDuration({ max: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10m</span>
              <span>5h</span>
            </div>
          </div>

          {/* Validation */}
          {value.duration.min >= value.duration.max && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">
                Minimum duration must be less than maximum duration
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Examples */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">5-20 min</span>
          </div>
          <p className="text-xs text-green-700">
            News updates, quick tips, daily briefings
          </p>
        </div>

        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">20-60 min</span>
          </div>
          <p className="text-xs text-blue-700">
            Interviews, storytelling, educational content
          </p>
        </div>

        <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">60+ min</span>
          </div>
          <p className="text-xs text-purple-700">
            Deep conversations, comprehensive analysis
          </p>
        </div>
      </div>

      {/* Current Selection Summary */}
      <div className="p-4 bg-spotify-green bg-opacity-10 border border-spotify-green border-opacity-30 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🎯</div>
          <div>
            <p className="text-sm font-medium text-spotify-green">
              Perfect! We'll find episodes between {formatTime(value.duration.min)} and {formatTime(value.duration.max)}
            </p>
            <p className="text-xs text-green-700 mt-1">
              This gives you flexibility while filtering out episodes that are too short or too long
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DurationSelector