import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import i18n from './i18n'
import './index.css'
import App from './App.tsx'
import { FontProvider } from './contexts/FontContext'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  },
})


const renderApp = () => {
  const rootElement = document.getElementById('root')
  
  if (!rootElement) {
    throw new Error('Failed to find the root element')
  }
  
  const root = createRoot(rootElement)
  
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <FontProvider>
          <App />
        </FontProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}


i18n.on('initialized', renderApp)


if (i18n.isInitialized) {
  renderApp()
}
