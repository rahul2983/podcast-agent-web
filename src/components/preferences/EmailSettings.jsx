import React from 'react'
import { Mail, Clock, Calendar, Bell } from 'lucide-react'

const EmailSettings = ({ value, onChange }) => {
  const updateEmail = (updates) => {
    onChange({ 
      ...value, 
      email: { ...value.email, ...updates }
    })
  }

  const notificationTypes = [
    {
      id: 'daily',
      name: 'Daily Summaries',
      description: 'Get a digest of new episodes found each day',
      icon: <Calendar className="w-5 h-5" />,
      frequency: 'Daily at 8:00 AM'
    },
    {
      id: 'weekly',
      name: 'Weekly Digest',
      description: 'Weekly roundup of all episodes and listening stats',
      icon: <Clock className="w-5 h-5" />,
      frequency: 'Sundays at 9:00 AM'
    },
    {
      id: 'instant',
      name: 'Instant Alerts',
      description: 'Get notified immediately when great episodes are found',
      icon: <Bell className="w-5 h-5" />,
      frequency: 'As they happen'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Enable/Disable Toggle */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium text-gray-900">Email Notifications</h3>
            <p className="text-sm text-gray-600">Stay updated on your podcast discoveries</p>
          </div>
          <button
            onClick={() => updateEmail({ enabled: !value.email.enabled })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-spotify-green focus:ring-offset-2 ${
              value.email.enabled ? 'bg-spotify-green' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                value.email.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Email Address */}
      {value.email.enabled && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              value={value.email.address}
              onChange={(e) => updateEmail({ address: e.target.value })}
              placeholder="your@email.com"
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spotify-green focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>
      )}

      {/* Notification Types */}
      {value.email.enabled && (
        <div>
          <h4 className="font-medium text-gray-900 mb-4">What would you like to receive?</h4>
          <div className="space-y-3">
            {notificationTypes.map(type => (
              <div key={type.id} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0 mt-1">
                  <div className="text-spotify-green">
                    {type.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-gray-900">{type.name}</h5>
                    <button
                      onClick={() => updateEmail({ 
                        [type.id]: !value.email[type.id] 
                      })}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        value.email[type.id] ? 'bg-spotify-green' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          value.email[type.id] ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{type.frequency}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview */}
      {value.email.enabled && value.email.address && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Email Preview</h4>
          <div className="bg-white border border-blue-200 rounded-lg p-4 text-sm">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 bg-spotify-green rounded-full flex items-center justify-center">
                <Mail className="w-3 h-3 text-white" />
              </div>
              <span className="font-medium">Podcast Agent</span>
            </div>
            <h5 className="font-semibold text-gray-900 mb-2">🎵 Your Daily Podcast Summary</h5>
            <p className="text-gray-600 mb-3">
              Hi there! We found 3 great episodes for you today:
            </p>
            <div className="space-y-2 text-xs text-gray-500 border-l-2 border-gray-200 pl-3">
              <div>• "AI Revolution in 2024" - The Tim Ferriss Show (45 min)</div>
              <div>• "Startup Funding Trends" - Pivot (32 min)</div>
              <div>• "Future of Work" - Lex Fridman Podcast (1h 20m)</div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Episodes have been added to your Spotify queue. Happy listening! 🎧
            </p>
          </div>
        </div>
      )}

      {/* Skip Option */}
      {!value.email.enabled && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="text-2xl">📱</div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                No problem! You can skip email notifications
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Episodes will still be automatically added to your Spotify queue. 
                You can always enable emails later in your settings.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Note */}
      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-xs text-green-800">
          🔒 <strong>Privacy:</strong> We only use your email for podcast notifications. 
          No spam, no selling to third parties, and you can unsubscribe anytime.
        </p>
      </div>
    </div>
  )
}

export default EmailSettings