import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
      <Toaster
        position="bottom-center"
        gutter={8}
        containerStyle={{ bottom: 24 }}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#FDFCFA',
            color: '#2C2C2A',
            border: '1px solid #E5D9C2',
            borderRadius: '4px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            boxShadow: '0 4px 16px rgba(44,44,42,0.1)',
          },
        }}
      />
    </HelmetProvider>
  </StrictMode>
)
