<script lang="ts">
  import { getMaxPagesForChapter } from "$lib/utils";
  import { useChapterPageCounQuery } from "../hooks/use-chapter-page-count-query.svelte";
  import { useSearchParams } from "../hooks/use-search-params.svelte";
  import PageSelector from "./PageSelector.svelte";

  const searchParams = useSearchParams();
  const pageCount = $derived(useChapterPageCounQuery(searchParams.chapter));
</script>

<div class="flex items-center text-sm transition">
  <PageSelector
    currentPage={searchParams.page}
    nPages={pageCount.data ?? getMaxPagesForChapter(searchParams.chapter)}
    onChoosePage={(page) => (searchParams.page = page)}
  />
  /
  <span class="w-[2ch]">
    {#if pageCount.data}
      {pageCount.data}
    {:else}
      <span class="animate-pulse text-slate-400">...</span>
    {/if}
  </span>
</div>
