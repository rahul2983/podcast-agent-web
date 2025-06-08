import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'

const TopicSelector = ({ value, onChange }) => {
  const [customTopic, setCustomTopic] = useState('')

  const popularTopics = [
    { id: 'technology', name: 'Technology', emoji: '💻' },
    { id: 'business', name: 'Business', emoji: '💼' },
    { id: 'science', name: 'Science', emoji: '🔬' },
    { id: 'health', name: 'Health & Wellness', emoji: '🏃‍♂️' },
    { id: 'politics', name: 'Politics', emoji: '🏛️' },
    { id: 'comedy', name: 'Comedy', emoji: '😄' },
    { id: 'true-crime', name: 'True Crime', emoji: '🔍' },
    { id: 'history', name: 'History', emoji: '📚' },
    { id: 'sports', name: 'Sports', emoji: '⚽' },
    { id: 'education', name: 'Education', emoji: '🎓' },
    { id: 'startups', name: 'Startups', emoji: '🚀' },
    { id: 'ai-ml', name: 'AI & Machine Learning', emoji: '🤖' },
    { id: 'design', name: 'Design', emoji: '🎨' },
    { id: 'marketing', name: 'Marketing', emoji: '📈' },
    { id: 'finance', name: 'Finance & Investing', emoji: '💰' },
    { id: 'psychology', name: 'Psychology', emoji: '🧠' },
    { id: 'productivity', name: 'Productivity', emoji: '⚡' },
    { id: 'travel', name: 'Travel', emoji: '✈️' }
  ]

  const toggleTopic = (topicName) => {
    const newTopics = value.topics.includes(topicName)
      ? value.topics.filter(t => t !== topicName)
      : [...value.topics, topicName]
    
    onChange({ ...value, topics: newTopics })
  }

  const addCustomTopic = () => {
    const topic = customTopic.trim()
    if (topic && !value.topics.includes(topic)) {
      onChange({ ...value, topics: [...value.topics, topic] })
      setCustomTopic('')
    }
  }

  const removeCustomTopic = (topicToRemove) => {
    const newTopics = value.topics.filter(t => t !== topicToRemove)
    onChange({ ...value, topics: newTopics })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addCustomTopic()
    }
  }

  const customTopics = value.topics.filter(topic => 
    !popularTopics.some(popular => popular.name === topic)
  )

  return (
    <div className="space-y-6">
      {/* Popular Topics */}
      <div>
        <h3 className="font-medium text-gray-900 mb-4">Popular Topics</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {popularTopics.map(topic => (
            <button
              key={topic.id}
              onClick={() => toggleTopic(topic.name)}
              className={`group p-3 rounded-xl border-2 text-left transition-all duration-200 hover:scale-105 ${
                value.topics.includes(topic.name)
                  ? 'border-spotify-green bg-spotify-green bg-opacity-10 text-spotify-green'
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{topic.emoji}</span>
                <span className="text-sm font-medium truncate">{topic.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Topics */}
      <div>
        <h3 className="font-medium text-gray-900 mb-4">Add Custom Topics</h3>
        
        {/* Custom Topic Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., Cryptocurrency, Meditation, Cooking..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spotify-green focus:border-transparent outline-none transition-all"
          />
          <button
            onClick={addCustomTopic}
            disabled={!customTopic.trim()}
            className="px-4 py-3 bg-spotify-green text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Custom Topics List */}
        {customTopics.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Your custom topics:</p>
            <div className="flex flex-wrap gap-2">
              {customTopics.map(topic => (
                <span
                  key={topic}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {topic}
                  <button
                    onClick={() => removeCustomTopic(topic)}
                    className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Selected Topics Summary */}
      {value.topics.length > 0 && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">
                {value.topics.length} topic{value.topics.length !== 1 ? 's' : ''} selected
              </p>
              <p className="text-xs text-green-600 mt-1">
                We'll find podcasts about these topics for you
              </p>
            </div>
            <div className="text-2xl">✨</div>
          </div>
        </div>
      )}

      {/* Help Text */}
      {value.topics.length === 0 && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="text-2xl">💡</div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                Select at least one topic to get started
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Choose topics you're interested in, and we'll find relevant podcast episodes for you
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TopicSelector