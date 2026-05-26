import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CustomerPortal from '../pages/Main-portal';
import { NlmCoachingPage } from './NlmCoachingPage';
import { Studio9dPage } from './Studio9dPage';
import { Virtual9dPage } from './Virtual9dPage';

const portalElement = (
  <div className="pmo-portal-root">
    <CustomerPortal />
  </div>
);

export function AppRoutes() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <Routes>
        <Route path="/" element={<Navigate to="/nlm-coaching" replace />} />
        <Route path="/nlm-coaching" element={<NlmCoachingPage />} />
        <Route path="/book/studio-9d" element={<Studio9dPage />} />
        <Route path="/book/virtual-9d" element={<Virtual9dPage />} />
        <Route path="/bom-creator" element={portalElement} />
        <Route path="/project-audit" element={portalElement} />
        <Route path="/pmo-report" element={portalElement} />
        <Route path="/pmo-dashboard-upgrade" element={portalElement} />
        <Route path="/billing-tab" element={portalElement} />
        <Route path="*" element={<Navigate to="/nlm-coaching" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
