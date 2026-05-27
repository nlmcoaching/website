import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NlmCoachingPage } from './NlmCoachingPage';
import { Studio9dPage } from './Studio9dPage';
import { Virtual9dPage } from './Virtual9dPage';

export function AppRoutes() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <Routes>
        <Route path="/" element={<Navigate to="/nlm-coaching" replace />} />
        <Route path="/nlm-coaching" element={<NlmCoachingPage />} />
        <Route path="/book/studio-9d" element={<Studio9dPage />} />
        <Route path="/book/virtual-9d" element={<Virtual9dPage />} />
        <Route path="*" element={<Navigate to="/nlm-coaching" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
