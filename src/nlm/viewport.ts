let viewportListenersAttached = false;

function readViewportWidth(): number {
  return Math.round(window.visualViewport?.width ?? window.innerWidth);
}

export function initViewportWidth(): void {
  const apply = () => {
    document.documentElement.style.setProperty(
      '--browser-inner-width',
      `${readViewportWidth()}px`
    );
  };
  apply();
  if (!viewportListenersAttached) {
    viewportListenersAttached = true;
    window.addEventListener('resize', apply);
    window.visualViewport?.addEventListener('resize', apply);
  }
}
