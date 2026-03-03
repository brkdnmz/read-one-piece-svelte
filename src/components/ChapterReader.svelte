<script lang="ts">
  import { cn, getMaxPagesForChapter, preloadImage } from "$lib/utils";
  import type { SwiperContainer } from "swiper/element";
  import type { Swiper } from "swiper/types";
  import { useCanSwipe } from "../hooks/use-can-swipe.svelte";
  import { useChapterPageCounQuery } from "../hooks/use-chapter-page-count-query.svelte";
  import { useReaderGestures } from "../hooks/use-reader-gestures.svelte";
  import { appStore } from "../store/store.svelte";
  import { MangaLanguage } from "../types";
  import ChapterPage from "./ChapterPage.svelte";
  import FullScreenOverlay from "./FullScreenOverlay.svelte";
  import PageNavigationButton from "./PageNavigationButton.svelte";
  import ToggleFullScreen from "./ToggleFullScreen.svelte";
  import ZoomLevelChanger from "./ZoomLevelChanger.svelte";

  type Props = {
    chapter: number;
    currentPage?: number;
    lang: MangaLanguage;
    swiperProps?: { onSlideChange?: (newSlideIndex: number) => void };
    onSlidePrevFirstPage?: (swiper: Swiper) => void;
    onSlideNextLastPage?: (swiper: Swiper) => void;
  };

  const {
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
    pageCountQuery.data?.[lang] ?? getMaxPagesForChapter(chapter),
  );

  let isPageZoomedIn = $state<boolean[]>([]);
  let showOverlayUI = $state(true);

  $effect(() => {
    if (!swiperEl) return;
    useReaderGestures(swiperEl, {
      onTap: () => {
        showOverlayUI = !showOverlayUI;
      },
    });
  });

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

  // Image preloading, what Swiper fails at...
  $effect(() => {
    if (!swiperEl) return;
    chapter;
    pageCount;
    currentPage;

    swiperEl.querySelectorAll("swiper-slide").forEach((slideEl) => {
      const imgEl = slideEl.querySelector("img");
      const imgSrc = imgEl?.getAttribute("src");
      if (!imgSrc) return;
      preloadImage(imgSrc);
    });
  });
</script>

<div
  class={cn(
    "relative h-full overflow-hidden",
    appStore.isFullScreen && "absolute inset-0 z-100 bg-background",
  )}
>
  {#if appStore.isZoomedIn}
    <ZoomLevelChanger />
  {/if}

  <!-- When the conditions are in this order, the overlay's out animation doesn't happen, which is what I want -->
  {#if appStore.isFullScreen}
    {#if showOverlayUI}
      <FullScreenOverlay />
    {/if}
  {/if}

  {#if showOverlayUI}
    <PageNavigationButton
      direction="prev"
      onclick={onSlidePrevPage}
      class="peer/prev"
    />
    <PageNavigationButton
      direction="next"
      onclick={onSlideNextPage}
      class="peer/next"
    />
    <ToggleFullScreen />
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
        addSlidesAfter: 1,
        addSlidesBefore: 1,
      }}
      injectStyles={[
        `
    .swiper-wrapper {
      will-change: transform;
    }
    `,
      ]}
      class="h-full transition peer-hover/next:-translate-x-2 peer-hover/prev:translate-x-2"
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
</div>
