<script lang="ts">
  import LuffyRunningAnimation from "$lib/assets/luffy-running-animation.webp";
  import { getChapterPageUrl } from "../api/util";
  import type { MangaLanguage } from "../types";

  type Props = {
    ref?: HTMLImageElement;
    chapter: number;
    page: number;
    lang: MangaLanguage;
    isColored?: boolean;
  };

  let { ref = $bindable(), chapter, page, lang, isColored }: Props = $props();

  let imgLoaded = $state(false);
</script>

<img
  bind:this={ref}
  src={getChapterPageUrl(chapter, page, lang, isColored)}
  alt={`Chapter ${chapter} Page ${page}`}
  class="m-auto h-0 min-h-full object-contain"
  loading="lazy"
  draggable={false}
  onload={() => (imgLoaded = true)}
  onerror={() => (imgLoaded = true)}
/>

{#if !imgLoaded}
  <!-- https://custom-progressbar.com/ru/collection/one-piece/onepiece-monkey-d-luffy-run -->
  <img
    src={LuffyRunningAnimation}
    alt="Loading..."
    class="absolute top-1/2 left-1/2 h-16 -translate-1/2"
  />
{/if}
