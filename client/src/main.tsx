import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';
import './index.css';
// Import our mock Electron API for browser development
import './mockElectronApi';

console.log('Starting application...');

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Failed to find the root element');
} else {
  try {
    console.log('Rendering application...');
    console.log('Root element:', rootElement);
    
    const root = ReactDOM.createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </QueryClientProvider>
        </ErrorBoundary>
      </React.StrictMode>
    );
    console.log('Application rendered successfully');
  } catch (error) {
    console.error('Error rendering application:', error);
  }
}
