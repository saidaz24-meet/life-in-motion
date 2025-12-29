import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/routes.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import { SoundProvider } from './app/providers/SoundProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <SoundProvider>
        <div className="noise-overlay" />
        <RouterProvider router={router} />
      </SoundProvider>
    </ErrorBoundary>
  </StrictMode>,
)
