import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRoutes } from './nlm/AppRoutes';
import { initViewportWidth } from './nlm/viewport';
import './styles/nlmcoaching.css';

initViewportWidth();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
);
