<script lang="ts">
  import LuffyRunningAnimation from "$lib/assets/luffy-running-animation.webp";
  import { cn } from "$lib/utils";
  import { DragGesture } from "@use-gesture/vanilla";
  import { isMobile } from "mobile-device-detect";
  import { getChapterPageUrl } from "../api/util";
  import { DOUBLE_TAP_THRESHOLD_MS } from "../constants";
  import { getPreferredZoomLevel } from "../store/store.svelte";
  import type { MangaLanguage } from "../types";

  type Props = {
    chapter: number;
    page: number;
    lang: MangaLanguage;
    isZoomedIn?: boolean;
  };

  let { chapter, page, lang, isZoomedIn = $bindable() }: Props = $props();

  const preferredZoomLevel = $derived(getPreferredZoomLevel());
  const zoomLevel = $derived(isZoomedIn ? preferredZoomLevel : 1);

  // this stuff was a bit hard not gonna lie, took some time, i hope at least one person cares about it :pray:
  // i mean the final calculations seem pretty clean, but you should also take a look at the kitchen:D
  let imgContainer = $state<HTMLDivElement>();
  let imgElement = $state<HTMLImageElement>();
  let imgLoaded = $state(false);
  let lastTap = 0;
  let zoomOriginPos: [xNorm: number, yNorm: number, x: number, y: number] = [
    0, 0, 0, 0,
  ];
  let isDragging = false;
  let isDragged = false;
  let scrollTimeout = 0;

  const onClickImage = (event: MouseEvent) => {
    // prevent overlay UI toggle
    if (isDragged) event.stopPropagation();

    const now = Date.now();
    if (now - lastTap < DOUBLE_TAP_THRESHOLD_MS) {
      onDoubleClickImage(event);
      lastTap = 0; // Triple tap should not equal zoom in + out
    } else {
      lastTap = now;
    }
  };

  const onDoubleClickImage = (event: MouseEvent) => {
    isZoomedIn = !isZoomedIn;
    if (!imgElement) return;
    const imgRect = imgElement.getBoundingClientRect();
    zoomOriginPos = [
      (event.clientX - imgRect.left) / imgRect.width,
      (event.clientY - imgRect.top) / imgRect.height,
      event.clientX,
      event.clientY,
    ];
  };

  const recalculateZoomOriginPos = () => {
    if (!isZoomedIn) return;
    if (!imgElement) return;
    if (!imgContainer) return;

    const imgRect = imgElement.getBoundingClientRect();
    const containerRect = imgContainer.getBoundingClientRect();

    const xNorm =
      (containerRect.left + containerRect.width / 2 - imgRect.left) /
      imgRect.width;
    const yNorm =
      (containerRect.top + containerRect.height / 2 - imgRect.top) /
      imgRect.height;
    const x = xNorm * imgRect.width + imgRect.left;
    const y = yNorm * imgRect.height + imgRect.top;

    zoomOriginPos = [xNorm, yNorm, x, y];
  };

  $effect(() => {
    const scrollAfterScale = () => {
      if (!imgContainer) return;
      if (!imgElement) return;

      const imgRect = imgElement.getBoundingClientRect();

      imgContainer.scrollLeft +=
        imgRect.left + zoomOriginPos[0] * imgRect.width - zoomOriginPos[2];
      imgContainer.scrollTop +=
        imgRect.top + zoomOriginPos[1] * imgRect.height - zoomOriginPos[3];

      recalculateZoomOriginPos();
    };

    const updateScale = () => {
      if (!imgElement || !imgContainer) return;
      if (isDragging) return;

      const imgRealRatio = imgElement.naturalWidth / imgElement.naturalHeight;
      const containerRatio =
        imgContainer.clientWidth / imgContainer.clientHeight;

      imgElement.style.minWidth = `${(zoomLevel / Math.max(1, containerRatio / imgRealRatio)) * 100}%`;
      imgElement.style.minHeight = `${(zoomLevel / Math.max(1, imgRealRatio / containerRatio)) * 100}%`;

      scrollAfterScale();
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(imgContainer!);

    imgElement?.addEventListener("load", updateScale);
    return () => {
      observer.disconnect();
      imgElement?.removeEventListener("load", updateScale);
    };
  });

  $effect(() => {
    const gesture = new DragGesture(
      imgContainer!,
      ({ delta: [dx, dy], tap, last }) => {
        if (!imgContainer) return;

        // stopPropagation won't work here because of Svelte's event system: https://svelte.dev/docs/svelte/basic-markup#Events-Event-delegation
        // so I have to manually check if dragged, and then handle it in onClickImage above
        isDragged = !tap;
        isDragging = !tap && !last;

        imgContainer.scrollLeft -= dx;
        imgContainer.scrollTop -= dy;
        recalculateZoomOriginPos();
      },
      {
        enabled: !isMobile && isZoomedIn,
        filterTaps: true,
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
  <!-- onscrollend over onscroll for better performance -->
  <div
    bind:this={imgContainer}
    class={cn(
      "relative flex h-full w-full overflow-auto",
      isZoomedIn && "cursor-move",
    )}
    onclick={onClickImage}
    onscroll={() => {
      // onScrollEnd is not that supported yet
      // I found this workaround here, ironic but useful: https://developer.chrome.com/blog/scrollend-a-new-javascript-event
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(recalculateZoomOriginPos, 100);
    }}
  >
    {#key `chapter-${chapter}-page-${page}-${lang}`}
      <img
        bind:this={imgElement}
        src={getChapterPageUrl(chapter, page, lang)}
        alt={`Chapter ${chapter} Page ${page}`}
        class="m-auto h-0 min-h-full object-contain"
        loading="lazy"
        draggable={false}
        onload={() => (imgLoaded = true)}
        onerror={() => (imgLoaded = true)}
      />
    {/key}

    {#if !imgLoaded}
      <!-- https://custom-progressbar.com/ru/collection/one-piece/onepiece-monkey-d-luffy-run -->
      <img
        src={LuffyRunningAnimation}
        alt="Loading..."
        class="absolute top-1/2 left-1/2 h-16 -translate-1/2"
      />
    {/if}
  </div>
</div>
