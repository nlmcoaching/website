import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        resize?: boolean;
      }) => void;
    };
  }
}

function parseCalendlyHeight(payload: unknown): number | null {
  if (!payload || typeof payload !== 'object') {
    return null;
  }
  const height = (payload as { height?: number | string }).height;
  if (typeof height === 'number' && Number.isFinite(height) && height >= 200) {
    return Math.round(height);
  }
  if (typeof height === 'string') {
    const parsed = parseInt(height.replace(/px/gi, '').trim(), 10);
    if (Number.isFinite(parsed) && parsed >= 200) {
      return parsed;
    }
  }
  return null;
}

type CalendlyInlineProps = {
  scheduleUrl: string;
  iframeTitle?: string;
  minHeight?: number;
  height?: number;
  className?: string;
};

export function CalendlyInline({
  scheduleUrl,
  iframeTitle,
  minHeight,
  height,
  className,
}: CalendlyInlineProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const defaultMinHeight = minHeight ?? height ?? 360;
  const [inlineHeight, setInlineHeight] = useState<number | null>(null);

  useEffect(() => {
    setInlineHeight(null);
  }, [scheduleUrl]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://calendly.com') {
        return;
      }
      const data = event.data;
      if (!data || typeof data !== 'object' || data.event !== 'calendly.page_height') {
        return;
      }
      const host = hostRef.current;
      if (!host?.isConnected) {
        return;
      }
      const iframe = host.querySelector('iframe');
      if (!iframe) {
        return;
      }
      const nextHeight = parseCalendlyHeight(data.payload);
      if (nextHeight != null) {
        iframe.style.height = `${nextHeight}px`;
        setInlineHeight(nextHeight);
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [scheduleUrl]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }
    const scriptSrc = 'https://assets.calendly.com/assets/external/widget.js';
    const setIframeTitle = (container: HTMLElement) => {
      if (!iframeTitle) {
        return;
      }
      const iframe = container.querySelector('iframe');
      if (iframe) {
        iframe.title = iframeTitle;
      }
    };
    const mountWidget = () => {
      const container = hostRef.current;
      if (!container || !window.Calendly) {
        return;
      }
      container.innerHTML = '';
      window.Calendly.initInlineWidget({
        url: scheduleUrl,
        parentElement: container,
        resize: true,
      });
      setIframeTitle(container);
    };
    if (window.Calendly) {
      mountWidget();
      return () => {
        host.innerHTML = '';
      };
    }
    let script = document.querySelector<HTMLScriptElement>(`script[src="${scriptSrc}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener('load', mountWidget);
    return () => {
      script?.removeEventListener('load', mountWidget);
      host.innerHTML = '';
    };
  }, [scheduleUrl, iframeTitle]);

  const classNames = [className, 'calendly-inline-widget'].filter(Boolean).join(' ');
  const style = inlineHeight
    ? { minWidth: 320, height: inlineHeight, minHeight: inlineHeight }
    : { minWidth: 320, minHeight: defaultMinHeight };

  return (
    <div
      ref={hostRef}
      className={classNames || 'calendly-inline-widget'}
      data-url={scheduleUrl}
      style={style}
      title={iframeTitle ?? 'Calendly scheduling'}
      aria-label={iframeTitle ?? 'Choose an appointment time in the embedded scheduler'}
    />
  );
}
