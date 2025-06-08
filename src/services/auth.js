// src/services/auth.js
import { api } from './api'

class AuthService {
  constructor() {
    this.user = null
    this.token = localStorage.getItem('podcast_agent_token')
    
    // Set axios default header if token exists
    if (this.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    }
  }

  async loginWithSpotify() {
    try {
      // Step 1: Get Spotify auth URL from backend
      const authResponse = await api.get('/api/auth/spotify/url')
      const authUrl = authResponse.data.authUrl
      
      // Step 2: Redirect to Spotify OAuth
      window.location.href = authUrl
      
      // Note: The actual token exchange happens in the callback
      // This method won't return normally due to redirect
    } catch (error) {
      console.error('Failed to get Spotify auth URL:', error)
      throw new Error('Failed to initiate Spotify login')
    }
  }

  async handleSpotifyCallback(code, state) {
    try {
      // Exchange code for tokens
      const response = await api.post('/api/auth/spotify/callback', {
        code,
        state
      })

      const { token, user } = response.data
      
      // Store token
      this.token = token
      localStorage.setItem('podcast_agent_token', token)
      
      // Set default header for future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      // Store user
      this.user = user
      
      return { user, token }
    } catch (error) {
      console.error('Spotify callback failed:', error)
      throw new Error('Failed to complete Spotify authentication')
    }
  }

  async getCurrentUser() {
    if (!this.token) {
      return null
    }

    try {
      if (this.user) {
        return this.user
      }

      // Fetch user from backend if we have token but no user data
      const response = await api.get('/api/auth/me')
      this.user = response.data.user
      return this.user
    } catch (error) {
      console.error('Failed to get current user:', error)
      // Token might be expired
      this.logout()
      return null
    }
  }

  async logout() {
    try {
      // Call backend logout endpoint
      if (this.token) {
        await api.post('/api/auth/logout')
      }
    } catch (error) {
      console.error('Logout API call failed:', error)
    } finally {
      // Clear local storage and state regardless of API call success
      this.token = null
      this.user = null
      localStorage.removeItem('podcast_agent_token')
      delete api.defaults.headers.common['Authorization']
    }
  }

  isAuthenticated() {
    return !!this.token
  }

  getToken() {
    return this.token
  }

  getUser() {
    return this.user
  }
}

export const authService = new AuthService()

// Handle OAuth callback on page load
if (window.location.pathname === '/auth/callback') {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  const state = urlParams.get('state')
  const error = urlParams.get('error')

  if (error) {
    console.error('Spotify OAuth error:', error)
    window.location.href = '/login?error=' + encodeURIComponent(error)
  } else if (code) {
    // Handle successful callback
    authService.handleSpotifyCallback(code, state)
      .then(() => {
        // Redirect to preferences or dashboard
        window.location.href = '/'
      })
      .catch((error) => {
        console.error('Callback handling failed:', error)
        window.location.href = '/login?error=callback_failed'
      })
  }
}