import { useCallback, useState } from 'react';
import { CalendlyInline } from './CalendlyInline';

type StudioCheckoutButtonProps = {
  formId: string;
  calendlyUrl: string;
};

export function StudioCheckoutButton({ formId, calendlyUrl }: StudioCheckoutButtonProps) {
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  const getForm = useCallback(() => {
    const form = document.getElementById(formId);
    return form instanceof HTMLFormElement ? form : null;
  }, [formId]);

  const openScheduler = useCallback(() => {
    const form = getForm();
    if (form?.reportValidity()) {
      setSchedulerOpen(true);
    }
  }, [getForm]);

  return (
    <div className="jb-studio-checkout-minimal">
      <button
        type="button"
        className="jb-stripe-widget-cta jb-studio-checkout-minimal-cta"
        disabled={schedulerOpen}
        onClick={openScheduler}
        aria-expanded={schedulerOpen}
      >
        {schedulerOpen ? 'Scheduler open below' : 'Continue to secure payment'}
      </button>
      {schedulerOpen ? (
        <div className="nlmc-calendly-host" aria-label="Embedded scheduling">
          <div className="jb-studio-calendly-frame-wrap">
            <CalendlyInline
              scheduleUrl={calendlyUrl}
              minHeight={700}
              iframeTitle="Select a Session — choose your 9D studio date and time"
              className="nlmc-calendly-inline"
            />
            <div className="jb-studio-calendly-step-overlay" aria-hidden="true">
              Select a Session
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
