<script lang="ts">
  import OnePieceGun from "$lib/assets/one-piece-gun.png";
  import { getMaxPagesForChapter } from "$lib/utils";
  import type { SwiperContainer } from "swiper/element";
  import type { Swiper } from "swiper/types";
  import { useCanSwipe } from "../hooks/use-can-swipe.svelte";
  import { useChapterPageCounQuery } from "../hooks/use-chapter-page-count-query.svelte";
  import { appStore } from "../store/store.svelte";
  import type { MangaLanguage } from "../types";
  import ChapterPage from "./ChapterPage.svelte";

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

  let swiperEl: SwiperContainer | null = null;
  const pageCountQuery = $derived(useChapterPageCounQuery(chapter));
  const canSwipe = useCanSwipe();

  const pageCount = $derived(
    pageCountQuery.data ?? getMaxPagesForChapter(chapter),
  );

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
    const isLastPage = currentPage === pageCountQuery.data;

    if (!isLastPage) {
      swiperEl?.swiper.slideNext();
    } else {
      if (!swiperEl) return;

      onSlideNextLastPage?.(swiperEl.swiper);
    }
  };

  const onSlideChange = ({
    detail: [swiper],
  }: CustomEvent<[swiper: Swiper]>) => {
    swiperProps?.onSlideChange?.(swiper.activeIndex);
  };

  $effect(() => {
    if (!swiperEl) return;
    swiperEl.swiper.allowTouchMove = canSwipe.current;
  });

  $effect(() => {
    swiperEl?.swiper.slideTo(currentPage - 1);
  });
</script>

<div class="relative h-full">
  <swiper-container
    bind:this={swiperEl}
    initialSlide={currentPage - 1}
    keyboard
    lazyPreloadPrevNext="2"
    injectStyles={[
      `
    .swiper-wrapper {
      will-change: transform;
    }
    `,
    ]}
    class="h-full"
    onswiperslidechange={onSlideChange}
  >
    {#each { length: pageCount } as _, pageIndex (pageIndex)}
      <swiper-slide lazy>
        <ChapterPage
          {chapter}
          page={pageIndex + 1}
          {lang}
          onZoomChange={(isZoomedIn) => {
            appStore.isZoomedIn = isZoomedIn;
          }}
        />
      </swiper-slide>
    {/each}
  </swiper-container>

  <!-- Slide prev -->
  <button
    class="absolute inset-y-0 left-0 z-10 flex w-[10vw] items-center justify-center bg-foreground/5 opacity-0 transition-opacity select-none hover:opacity-100"
    onclick={onSlidePrevPage}
  >
    <img src={OnePieceGun} class="w-1/2" alt="Slide prev" />
  </button>

  <!-- Slide next -->
  <button
    class="absolute inset-y-0 right-0 z-10 flex w-[10vw] items-center justify-center bg-foreground/5 opacity-0 transition-opacity select-none hover:opacity-100"
    onclick={onSlideNextPage}
  >
    <img src={OnePieceGun} class="w-1/2 rotate-y-180" alt="Slide next" />
  </button>
</div>
