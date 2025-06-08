# Spotify Podcast Agent Web App

A lightweight web app for setting podcast preferences. Users configure their interests once, and the AI agent automatically curates and adds perfect episodes to their Spotify queue.

## Features

- 🎯 **One-time setup** - Set preferences and forget
- 🤖 **AI curation** - Smart episode discovery
- 📱 **Mobile-first** - Works great on phones
- 🎵 **Spotify integration** - Auto-adds to queue
- 📧 **Email summaries** - Optional notifications

## Quick Start

1. **Install dependencies**
```bash
npm install
```

2. **Set environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

## Environment Variables

```
VITE_API_URL=http://localhost:8000              # Your backend API URL
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id   # Spotify app client ID
VITE_APP_URL=http://localhost:3000              # This apps URL
```

## Deployment

### Vercel (Recommended)
```bash
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## Project Structure

```
src/
├── components/
│   ├── auth/           # Login & authentication
│   ├── preferences/    # Preference wizard
│   ├── status/         # Dashboard & status
│   └── ui/            # Reusable UI components
├── hooks/             # React hooks
├── services/          # API & auth services  
└── utils/             # Utilities
```

## User Flow

1. **Login** → Spotify OAuth
2. **Preferences** → 4-step wizard (topics, shows, duration, email)
3. **Success** → "Your agent is running!" 
4. **Spotify** → Episodes automatically added to queue
5. **Optional** → Return to adjust preferences

## Backend Integration

This frontend connects to your existing MCP-based Spotify Podcast Agent backend. You need these additional API endpoints:

```python
# Add to your existing FastAPI server
@app.post("/api/web/preferences")
async def save_web_preferences(preferences: dict):
    # Save user preferences
    pass

@app.get("/api/web/status") 
async def get_web_status():
    # Return agent status & stats
    pass

@app.get("/api/auth/spotify/url")
async def get_spotify_auth_url():
    # Return Spotify OAuth URL
    pass
```

## Tech Stack

- **React 18** + Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Lucide React** for icons
- **Headless UI** for components

## License

MIT License
