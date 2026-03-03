<script lang="ts">
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

  // this stuff was a bit hard not gonna lie, took some time, i hope at least one person cares about it :pray:
  // i mean the final calculations seem pretty clean, but you should also take a look at the kitchen:D
  let zoomOriginPos = $state<
    [xNorm: number, yNorm: number, x: number, y: number]
  >([0, 0, 0, 0]);
  let scale = $state({ width: 1, height: 1 });

  let imgContainer = $state<HTMLDivElement>();
  let imgElement = $state<HTMLImageElement>();
  let lastTap = 0;
  let dragged = false;

  const zoomLevel = $derived(getPreferredZoomLevel());

  const onClickImage = (event: MouseEvent) => {
    // prevent overlay UI toggle
    if (dragged) event.stopPropagation();

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

    const normX = (containerRect.width / 2 - imgRect.left) / imgRect.width;
    const normY = (containerRect.height / 2 - imgRect.top) / imgRect.height;
    const x = normX * imgRect.width + imgRect.left;
    const y = normY * imgRect.height + imgRect.top;

    // don't directly assign to prevent infinite rerenders
    zoomOriginPos[0] = normX;
    zoomOriginPos[1] = normY;
    zoomOriginPos[2] = x;
    zoomOriginPos[3] = y;
  };

  $effect(() => {
    if (!isZoomedIn) return;
    if (!imgContainer) return;
    if (!imgElement) return;
    if (scale.width === 1 && scale.height === 1) return;

    const imgRect = imgElement.getBoundingClientRect();
    imgContainer.scrollBy({
      left: imgRect.left + zoomOriginPos[0] * imgRect.width - zoomOriginPos[2],
      top: imgRect.top + zoomOriginPos[1] * imgRect.height - zoomOriginPos[3],
      behavior: "instant",
    });
    recalculateZoomOriginPos();
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

      // it's better without it I think
      // recalculateZoomOriginPos();
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
      ({ delta: [dx, dy], tap }) => {
        // stopPropagation won't work here because of Svelte's event system: https://svelte.dev/docs/svelte/basic-markup#Events-Event-delegation
        // so I have to manually check if dragged, and then handle it in onClickImage above
        dragged = !tap;
        imgContainer?.scrollBy({
          left: -dx,
          top: -dy,
          behavior: "instant",
        });
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
    class={cn("flex h-full w-full overflow-auto", isZoomedIn && "cursor-move")}
    onclick={onClickImage}
    onscrollend={recalculateZoomOriginPos}
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
