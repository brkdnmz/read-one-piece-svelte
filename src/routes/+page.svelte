<script lang="ts">
  import type { ComponentProps } from "svelte";
  import ChapterReader from "../components/ChapterReader.svelte";
  import { useSearchParams } from "../hooks/use-search-params.svelte";
  import { appStore } from "../store/store.svelte";

  // Applied this patch in node_modules: https://github.com/svecosystem/runed/issues/385
  const searchParams = useSearchParams();

  const onSlideChange: NonNullable<
    ComponentProps<typeof ChapterReader>["swiperProps"]
  >["onSlideChange"] = (newSlideIndex) => {
    searchParams.page = newSlideIndex + 1;
  };
</script>

<ChapterReader
  chapter={searchParams.chapter}
  currentPage={searchParams.page}
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
