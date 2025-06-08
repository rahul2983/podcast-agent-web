import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import TopicSelector from './TopicSelector'
import ShowSelector from './ShowSelector'
import DurationSelector from './DurationSelector'
import EmailSettings from './EmailSettings'
import Button from '../ui/Button'
import { api } from '../../services/api'

const PreferencesWizard = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [preferences, setPreferences] = useState({
    topics: [],
    shows: [],
    duration: { min: 15, max: 120 },
    email: { enabled: false, address: user?.email || '' }
  })

  const steps = [
    {
      id: 1,
      title: "Topics",
      subtitle: "What interests you?",
      component: TopicSelector
    },
    {
      id: 2,
      title: "Shows",
      subtitle: "Any favorite podcasts?",
      component: ShowSelector
    },
    {
      id: 3,
      title: "Duration",
      subtitle: "How long should episodes be?",
      component: DurationSelector
    },
    {
      id: 4,
      title: "Notifications",
      subtitle: "Stay updated with email?",
      component: EmailSettings
    }
  ]

  const currentStep = steps.find(s => s.id === step)
  const isLastStep = step === steps.length
  const isFirstStep = step === 1

  const canProceed = () => {
    switch (step) {
      case 1:
        return preferences.topics.length > 0
      case 2:
        return true // Shows are optional
      case 3:
        return preferences.duration.min && preferences.duration.max
      case 4:
        return true // Email is optional
      default:
        return false
    }
  }

  const handleNext = () => {
    if (canProceed() && !isLastStep) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (!isFirstStep) {
      setStep(step - 1)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Save preferences to backend
      await api.post('/api/web/preferences', {
        userId: user.id,
        preferences: {
          topics: preferences.topics,
          shows: preferences.shows,
          minDuration: preferences.duration.min,
          maxDuration: preferences.duration.max,
          emailEnabled: preferences.email.enabled,
          emailAddress: preferences.email.address
        }
      })

      // Navigate to success page
      navigate('/dashboard')
    } catch (error) {
      console.error('Failed to save preferences:', error)
      alert('Failed to save preferences. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const updatePreferences = (updates) => {
    setPreferences(prev => ({ ...prev, ...updates }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Set Your Preferences
          </h1>
          <p className="text-gray-600">
            Help us find the perfect podcasts for you
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">
              Step {step} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((step / steps.length) * 100)}% complete
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-spotify-green h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / steps.length) * 100}%` }}
            />
          </div>

          {/* Step indicators */}
          <div className="flex justify-between mt-3">
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                  s.id < step ? 'bg-spotify-green text-white' :
                  s.id === step ? 'bg-spotify-green text-white' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {s.id < step ? <Check className="w-4 h-4" /> : s.id}
                </div>
                <span className="text-xs text-gray-500 mt-1 hidden sm:block">
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              {currentStep.title}
            </h2>
            <p className="text-gray-600">
              {currentStep.subtitle}
            </p>
          </div>

          <div className="animate-fade-in">
            {React.createElement(currentStep.component, {
              value: preferences,
              onChange: updatePreferences
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={isFirstStep}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="flex items-center gap-2">
            {!isLastStep ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2 bg-spotify-green hover:bg-green-700"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSave}
                disabled={!canProceed() || isLoading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-8"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Start My Agent
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Progress Summary */}
        {step > 1 && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="text-sm text-green-800">
              <p className="font-medium mb-1">Your selections so far:</p>
              <ul className="space-y-1">
                {preferences.topics.length > 0 && (
                  <li>• {preferences.topics.length} topics selected</li>
                )}
                {preferences.shows.length > 0 && (
                  <li>• {preferences.shows.length} favorite shows</li>
                )}
                {step > 3 && (
                  <li>• Episodes: {preferences.duration.min}-{preferences.duration.max} minutes</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PreferencesWizard