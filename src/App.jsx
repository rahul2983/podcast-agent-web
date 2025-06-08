import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import LoginPage from './components/auth/LoginPage'
import PreferencesWizard from './components/preferences/PreferencesWizard'
import AgentStatus from './components/status/AgentStatus'
import LoadingSpinner from './components/ui/LoadingSpinner'

function App() {
  const { user, loading, isAuthenticated } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
            } 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/preferences" 
            element={
              isAuthenticated ? <PreferencesWizard /> : <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? <AgentStatus /> : <Navigate to="/login" replace />
            } 
          />
          
          {/* Default Route */}
          <Route 
            path="/" 
            element={
              isAuthenticated ? 
                (user?.hasPreferences ? <Navigate to="/dashboard" replace /> : <Navigate to="/preferences" replace />) :
                <Navigate to="/login" replace />
            } 
          />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App