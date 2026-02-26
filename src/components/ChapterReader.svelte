<script lang="ts">
  import OnePieceGun from "$lib/assets/one-piece-gun.png";
  import { cn, getMaxPagesForChapter } from "$lib/utils";
  import { fly } from "svelte/transition";
  import type { SwiperContainer } from "swiper/element";
  import type { Swiper } from "swiper/types";
  import { useCanSwipe } from "../hooks/use-can-swipe.svelte";
  import { useChapterPageCounQuery } from "../hooks/use-chapter-page-count-query.svelte";
  import { appStore } from "../store/store.svelte";
  import type { MangaLanguage } from "../types";
  import ChapterPage from "./ChapterPage.svelte";
  import FullScreenOverlay from "./FullScreenOverlay.svelte";
  import ZoomLevelChanger from "./ZoomLevelChanger.svelte";

  type Props = {
    chapter: number;
    currentPage?: number;
    lang: MangaLanguage;
    swiperProps?: { onSlideChange?: (newSlideIndex: number) => void };
    onSlidePrevFirstPage?: (swiper: Swiper) => void;
    onSlideNextLastPage?: (swiper: Swiper) => void;
  };

  let {
    chapter,
    currentPage = 1,
    lang,
    swiperProps,
    onSlidePrevFirstPage,
    onSlideNextLastPage,
  }: Props = $props();

  let swiperEl = $state<SwiperContainer>(); // should have been a state all this time
  const pageCountQuery = $derived(useChapterPageCounQuery(chapter));
  const canSwipe = useCanSwipe();

  const pageCount = $derived(
    pageCountQuery.data ?? getMaxPagesForChapter(chapter),
  );

  let isPageZoomedIn = $state<boolean[]>([]);

  $effect(() => {
    isPageZoomedIn = Array<boolean>(pageCount).fill(false);
  });

  const isAnyPageZoomedIn = $derived(isPageZoomedIn.some(Boolean));

  const resetZoom = () => {
    isPageZoomedIn = Array<boolean>(pageCount).fill(false);
  };

  const onSlidePrevPage = () => {
    if (currentPage > 1) {
      swiperEl?.swiper.slidePrev();
    } else {
      if (chapter === 1) return;
      if (!swiperEl) return;

      onSlidePrevFirstPage?.(swiperEl.swiper);
    }
  };

  const onSlideNextPage = () => {
    const isLastPage = currentPage === pageCount;

    if (!isLastPage) {
      swiperEl?.swiper.slideNext();
    } else {
      if (!swiperEl) return;

      onSlideNextLastPage?.(swiperEl.swiper);
    }
  };

  const onSlideChange = () => {
    resetZoom();
  };

  const onTransitionEnd = ({
    detail: [swiper],
  }: CustomEvent<[swiper: Swiper]>) => {
    swiperProps?.onSlideChange?.(swiper.activeIndex);
  };

  // onSlideChange already handles page change, only need to manually handle chapter change
  // onSlideChange is required, as page change occcurs AFTER transition end
  $effect(() => {
    chapter;
    resetZoom();
  });

  $effect(() => {
    appStore.isZoomedIn = isAnyPageZoomedIn;
  });

  $effect(() => {
    if (!swiperEl) return;
    swiperEl.swiper.allowTouchMove = canSwipe.current;
  });

  // Run before DOM rerender (Swiper) to prevent Swiper from interfering, when a chapter has fewer pages than the previous
  $effect.pre(() => {
    swiperEl?.swiper.slideTo(currentPage - 1);
  });
</script>

<div
  class={cn(
    "relative h-full overflow-hidden",
    appStore.isFullScreen && "absolute inset-0 z-100 bg-background",
  )}
>
  {#if appStore.isFullScreen}
    <FullScreenOverlay />
  {/if}

  {#if appStore.isZoomedIn}
    <div
      class="pointer-events-none absolute top-2.5 left-1/2 z-20 flex -translate-x-1/2 justify-center *:pointer-events-auto"
      transition:fly={{ y: "-100%", duration: 200 }}
    >
      <ZoomLevelChanger />
    </div>
  {/if}

  <!-- Swiper Element doesn't update virtual slides on props change, I checked the code -->
  <!-- So, I have to change the key to force remount -->
  {#key `${chapter}-${pageCount}`}
    <swiper-container
      bind:this={swiperEl}
      initialSlide={currentPage - 1}
      keyboard
      virtual={{
        // Virtual is a must for iOS apparently, otherwise the performance sucks
        enabled: true,
      }}
      injectStyles={[
        `
    .swiper-wrapper {
      will-change: transform;
    }
    `,
      ]}
      class="h-full"
      onswiperslidechange={onSlideChange}
      onswipertransitionend={onTransitionEnd}
    >
      {#each { length: pageCount } as _, pageIndex (pageIndex)}
        <!-- Lazy + virtual causes a silly bug (preloader gets stuck) -->
        <swiper-slide lazy={false}>
          <ChapterPage
            {chapter}
            page={pageIndex + 1}
            {lang}
            bind:isZoomedIn={isPageZoomedIn[pageIndex]}
          />
        </swiper-slide>
      {/each}
    </swiper-container>
  {/key}

  <!-- Slide prev -->
  <button
    class="absolute inset-y-0 left-0 z-10 flex w-[10vw] items-center justify-center bg-muted/50 opacity-0 transition-opacity select-none hover:opacity-100"
    onclick={onSlidePrevPage}
  >
    <img src={OnePieceGun} class="w-1/2" alt="Slide prev" />
  </button>

  <!-- Slide next -->
  <button
    class="absolute inset-y-0 right-0 z-10 flex w-[10vw] items-center justify-center bg-muted/50 opacity-0 transition-opacity select-none hover:opacity-100"
    onclick={onSlideNextPage}
  >
    <img src={OnePieceGun} class="w-1/2 rotate-y-180" alt="Slide next" />
  </button>
</div>
