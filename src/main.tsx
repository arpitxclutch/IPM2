import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Fix for "Cannot set property fetch of #<Window> which has only a getter"
// This occurs when some libraries try to polyfill fetch in environments where it's read-only.
if (typeof window !== 'undefined') {
  try {
    if (window.fetch && Object.getOwnPropertyDescriptor(window, 'fetch')?.writable === false) {
      const fetch = window.fetch;
      Object.defineProperty(window, 'fetch', {
        value: fetch,
        writable: true,
        configurable: true,
        enumerable: true
      });
    }
  } catch (e) {
    // Ignore errors if we can't redefine fetch
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
