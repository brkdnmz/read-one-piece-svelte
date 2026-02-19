<script lang="ts">
  import {
    NativeSelect,
    NativeSelectOption,
  } from "$lib/components/ui/native-select";
  import { N_CHAPTERS } from "../constants";
  import { useSearchParams } from "../hooks/use-search-params.svelte";
  import GoToChapter from "./GoToChapter.svelte";

  const searchParams = useSearchParams();

  const options = Array.from({ length: N_CHAPTERS }).map((_, i) => ({
    value: i + 1,
    label: i + 1,
  }));
</script>

<div class="relative">
  <GoToChapter />

  <span
    class="pointer-events-none absolute top-1/2 left-1/2 z-1 -translate-1/2 text-sm transition"
  >
    {searchParams.chapter}
  </span>

  <NativeSelect
    value={searchParams.chapter}
    onchange={(e) => {
      const selectedChapter = Number(e.currentTarget.value);
      searchParams.chapter = selectedChapter;
      searchParams.page = 1;
    }}
    class="w-15 px-2 py-0 text-center text-transparent transition-[background-color,border-color]!"
    showArrow={false}
  >
    {#each options as { label, value } (value)}
      <NativeSelectOption {value}>{label}</NativeSelectOption>
    {/each}
  </NativeSelect>
</div>
