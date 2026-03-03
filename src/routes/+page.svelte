<script lang="ts">
  import type { ComponentProps } from "svelte";
  import ChapterReader from "../components/ChapterReader.svelte";
  import { useSearchParams } from "../hooks/use-search-params.svelte";
  import { appStore } from "../store/store.svelte";

  // Applied this patch in node_modules: https://github.com/svecosystem/runed/issues/385
  const searchParams = useSearchParams();

  // even accessing params from searchParams object directly caused unnecessary rerenders, so this is necessary I suppose
  const { chapter, page } = $derived(searchParams);

  const onSlideChange: NonNullable<
    ComponentProps<typeof ChapterReader>["swiperProps"]
  >["onSlideChange"] = (newSlideIndex) => {
    searchParams.page = newSlideIndex + 1;
  };
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key.toLowerCase() === "f") {
      appStore.isFullScreen = !appStore.isFullScreen;
    }
    if (e.key === "Escape") {
      appStore.isFullScreen = false;
    }
  }}
/>

<ChapterReader
  {chapter}
  currentPage={page}
  lang={appStore.mangaLanguage}
  swiperProps={{
    onSlideChange,
  }}
  onSlidePrevFirstPage={() => {
    if (window?.confirm("Go to previous chapter?")) {
      searchParams.chapter--;
      searchParams.page = 1;
    }
  }}
  onSlideNextLastPage={() => {
    if (window?.confirm("Go to next chapter?")) {
      searchParams.chapter++;
      searchParams.page = 1;
    }
  }}
/>
