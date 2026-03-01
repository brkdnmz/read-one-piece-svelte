const DOUBLE_TAP_THRESHOLD_MS = 300;

export function useReaderGestures(
  readerContainer: HTMLElement,
  events: { onTap?: () => void; onDoubleTap?: () => void },
) {
  $effect(() => {
    let lastTap = 0;
    let tapTimeout = 0;

    const onClick = () => {
      const now = Date.now();
      if (now - lastTap < DOUBLE_TAP_THRESHOLD_MS) {
        clearTimeout(tapTimeout);
        events?.onDoubleTap?.();
        lastTap = 0; // triple tap should not equal two double taps
      } else {
        tapTimeout = window.setTimeout(() => {
          events?.onTap?.();
        }, DOUBLE_TAP_THRESHOLD_MS);
        lastTap = now;
      }
    };

    readerContainer.addEventListener("click", onClick);

    return () => {
      readerContainer.removeEventListener("click", onClick);
    };
  });
}
