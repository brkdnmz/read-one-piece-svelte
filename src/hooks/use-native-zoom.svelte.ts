const ZOOM_THRESHOLD = 1.1;

export function useNativeZoom() {
  const isZoomedIn = $state({
    current: (window.visualViewport?.scale ?? 1) > ZOOM_THRESHOLD,
  });

  $effect.pre(() => {
    const onResize = () => {
      if (!window.visualViewport) return;
      const scale = window.visualViewport.scale;
      isZoomedIn.current = scale > ZOOM_THRESHOLD;
    };

    window.visualViewport?.addEventListener("resize", onResize);

    return () => {
      window.visualViewport?.removeEventListener("resize", onResize);
    };
  });

  return isZoomedIn;
}
