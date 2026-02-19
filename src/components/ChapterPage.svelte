<script lang="ts">
  import { cn } from "$lib/utils";
  import { DragGesture } from "@use-gesture/vanilla";
  import { getChapterPageUrl } from "../api/util";
  import type { MangaLanguage } from "../types";

  const DOUBLE_TAP_THRESHOLD = 300;
  const SCALE_FACTOR = 2;

  type Props = {
    chapter: number;
    page: number;
    lang: MangaLanguage;
    onZoomChange?: (isZoomedIn: boolean) => void;
  };

  const { chapter, page, lang, onZoomChange }: Props = $props();

  let isZoomedIn = $state(false);
  let doubleTapPos = $state<[x: number, y: number]>([0, 0]);

  let imgContainer: HTMLDivElement | null = null;
  let lastTap = 0;

  const onClickImage = (event: MouseEvent) => {
    const now = Date.now();
    if (now - lastTap < DOUBLE_TAP_THRESHOLD) {
      isZoomedIn = !isZoomedIn;
      doubleTapPos = [event.clientX, event.clientY];
      lastTap = 0; // Triple tap should not equal zoom in + out
    } else {
      lastTap = now;
    }
  };

  // Probably dont need effect for this but anyways
  $effect(() => {
    onZoomChange?.(isZoomedIn);
  });

  $effect(() => {
    if (!isZoomedIn) return;
    if (!imgContainer) return;

    const imgContainerRect = imgContainer.getBoundingClientRect();

    // Scroll to where the user double tapped
    imgContainer.scrollTo({
      left: doubleTapPos[0] - imgContainerRect.left,
      top: doubleTapPos[1] - imgContainerRect.top,
      behavior: "instant",
    });
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
      "h-full overflow-auto max-sm:w-full",
      isZoomedIn && "cursor-move overscroll-none", // disable pull-to-refresh when zoomed in
    )}
    onclick={onClickImage}
  >
    {#key `chapter-${chapter}-page-${page}-${lang}`}
      <img
        src={getChapterPageUrl(chapter, page, lang)}
        alt={`Chapter ${chapter} Page ${page}`}
        class="m-auto h-0 min-h-full object-contain"
        style:min-height={isZoomedIn ? `${SCALE_FACTOR * 100}%` : undefined}
        style:min-width={isZoomedIn ? `${SCALE_FACTOR * 100}%` : undefined}
        loading="lazy"
        draggable={false}
      />
    {/key}
  </div>
</div>
