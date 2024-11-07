import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.scss';
import '@/assets/styles/common-styles.scss';
import '@/assets/styles/tailwind.scss';
import App from '@/App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
