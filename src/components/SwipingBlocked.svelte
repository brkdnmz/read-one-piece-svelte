<script lang="ts">
  import { fly } from "svelte/transition";
  import { useCanSwipe } from "../hooks/use-can-swipe.svelte";
  import IwwaSwipe from "./icons/IwwaSwipe.svelte";

  const SIZE = 36;
  const MARGIN = 10;
  const PADDING = 4;
  const BORDER_WIDTH = 1.5;

  const canSwipe = useCanSwipe();

  let divEl = $state<HTMLDivElement>();
  let svgEl = $state<SVGElement>();

  $effect(() => {
    const onVisualViewportChange = () => {
      if (!window) return;
      const vv = window.visualViewport;
      if (!vv) return;
      if (!divEl) return;
      if (!svgEl) return;

      const scaledSize = SIZE / vv.scale;
      const scaledMargin = MARGIN / vv.scale;
      const scaledBorder = BORDER_WIDTH / vv.scale;
      const scaledInnerPadding = PADDING / vv.scale;
      const scaledStrokeWidth = BORDER_WIDTH / vv.scale;

      divEl.style.margin = `${scaledMargin}px`;
      divEl.style.left = `${vv.offsetLeft + vv.width - scaledSize - 2 * scaledMargin}px`;
      divEl.style.top = `${vv.offsetTop}px`;
      divEl.style.width = `${scaledSize}px`;
      divEl.style.height = `${scaledSize}px`;
      divEl.style.borderWidth = `${scaledBorder}px`;
      divEl.style.padding = `${scaledInnerPadding}px`;
      svgEl.style.strokeWidth = `${scaledStrokeWidth}px`;
    };

    onVisualViewportChange();

    window.visualViewport?.addEventListener("resize", onVisualViewportChange);
    window.visualViewport?.addEventListener("scroll", onVisualViewportChange);

    return () => {
      window.visualViewport?.removeEventListener(
        "resize",
        onVisualViewportChange,
      );
      window.visualViewport?.removeEventListener(
        "scroll",
        onVisualViewportChange,
      );
    };
  });
</script>

{#if !canSwipe.current}
  <div
    bind:this={divEl}
    class="pointer-events-none fixed z-1000 overflow-hidden rounded-full border-rose-600 bg-background/50 transition"
    transition:fly={{ x: "100%", y: "-100%", duration: 200 }}
  >
    <svg
      bind:this={svgEl}
      class="absolute inset-0 h-full w-full stroke-rose-600"
      viewBox="0 0 1 1"
    >
      <!-- Thanks ChatGPT for vector-effect property, there were other solutions but this is the most beautiful I think -->
      <line
        x1="0"
        y1="100%"
        x2="100%"
        y2="0"
        vector-effect="non-scaling-stroke"
      />
    </svg>

    <IwwaSwipe class="h-full w-full transition" />
  </div>
{/if}
