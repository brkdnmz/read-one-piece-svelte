<script lang="ts">
  import { cn } from "$lib/utils";
  import { DragGesture } from "@use-gesture/vanilla";
  import { getChapterPageUrl } from "../api/util";
  import { getPreferredZoomLevel } from "../store/store.svelte";
  import type { MangaLanguage } from "../types";

  const DOUBLE_TAP_THRESHOLD = 300;

  type Props = {
    chapter: number;
    page: number;
    lang: MangaLanguage;
    onZoomChange?: (isZoomedIn: boolean) => void;
  };

  const { chapter, page, lang, onZoomChange }: Props = $props();

  let isZoomedIn = $state(false);
  let doubleTapPos = $state<[x: number, y: number]>([0, 0]);
  let scale = $state({ width: 1, height: 1 });

  let imgContainer = $state<HTMLDivElement>();
  let imgElement = $state<HTMLImageElement>();
  let lastTap = 0;

  const zoomLevel = $derived(getPreferredZoomLevel());

  const onClickImage = (event: MouseEvent) => {
    const now = Date.now();
    if (now - lastTap < DOUBLE_TAP_THRESHOLD) {
      isZoomedIn = !isZoomedIn;
      onZoomChange?.(isZoomedIn);
      doubleTapPos = [event.clientX, event.clientY];
      lastTap = 0; // Triple tap should not equal zoom in + out
    } else {
      lastTap = now;
    }
  };

  $effect(() => {
    if (isZoomedIn) {
      if (!imgContainer) return;
      if (scale.width === 1 && scale.height === 1) return;

      const imgContainerRect = imgContainer.getBoundingClientRect();

      const prevImgHeight = imgContainer.scrollHeight / zoomLevel;
      const prevImgWidth = imgContainer.scrollWidth / zoomLevel;

      const leftDiff = (imgContainerRect.width - prevImgWidth) / 2;
      const topDiff = (imgContainerRect.height - prevImgHeight) / 2;

      imgContainer.scrollTo({
        left:
          (doubleTapPos[0] - imgContainerRect.left) * (scale.width - 1) -
          leftDiff,
        top:
          (doubleTapPos[1] - (imgContainerRect.top + topDiff)) *
            (zoomLevel - 1) -
          topDiff,
        behavior: "instant",
      });
    }
  });

  $effect(() => {
    if (!isZoomedIn) return;

    const updateScale = () => {
      if (!imgElement || !imgContainer) return;

      const imgRealRatio = imgElement.naturalWidth / imgElement.naturalHeight;
      const containerRatio =
        imgContainer.clientWidth / imgContainer.clientHeight;

      scale = {
        width: zoomLevel / Math.max(1, containerRatio / imgRealRatio),
        height: zoomLevel / Math.max(1, imgRealRatio / containerRatio),
      };
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(imgContainer!);
    return () => {
      observer.disconnect();
    };
  });

  $effect(() => {
    const gesture = new DragGesture(
      imgContainer!,
      ({ delta: [dx, dy] }) => {
        imgContainer?.scrollBy({
          left: -dx,
          top: -dy,
          behavior: "instant",
        });
      },
      {
        enabled: isZoomedIn,
      },
    );

    return () => {
      gesture.destroy();
    };
  });
</script>

<div class="flex h-full w-full items-center justify-center select-none">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    bind:this={imgContainer}
    class={cn(
      "flex h-full w-full overflow-auto",
      isZoomedIn && "cursor-move overscroll-none", // disable pull-to-refresh when zoomed in
    )}
    onclick={onClickImage}
  >
    {#key `chapter-${chapter}-page-${page}-${lang}`}
      <img
        bind:this={imgElement}
        src={getChapterPageUrl(chapter, page, lang)}
        alt={`Chapter ${chapter} Page ${page}`}
        class="m-auto h-0 min-h-full object-contain"
        style:min-height={isZoomedIn ? `${scale.height * 100}%` : undefined}
        style:min-width={isZoomedIn ? `${scale.width * 100}%` : undefined}
        loading="lazy"
        draggable={false}
      />
    {/key}
  </div>
</div>
