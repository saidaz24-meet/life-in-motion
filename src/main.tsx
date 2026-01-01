import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/routes.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import { SoundProvider } from './app/providers/SoundProvider.tsx'

// Temporarily disabled StrictMode to verify if it causes blank story issue
// TODO: Re-enable after verifying StoryShell is idempotent
const USE_STRICT_MODE = false; // Set to true to re-enable

createRoot(document.getElementById('root')!).render(
  USE_STRICT_MODE ? (
    <StrictMode>
      <ErrorBoundary>
        <SoundProvider>
          <div className="noise-overlay" />
          <RouterProvider router={router} />
        </SoundProvider>
      </ErrorBoundary>
    </StrictMode>
  ) : (
    <ErrorBoundary>
      <SoundProvider>
        <div className="noise-overlay" />
        <RouterProvider router={router} />
      </SoundProvider>
    </ErrorBoundary>
  ),
)
