<script lang="ts">
  import { fly } from "svelte/transition";
  import { useSearchParams } from "../hooks/use-search-params.svelte";
  import PageTracker from "./PageTracker.svelte";

  const searchParams = useSearchParams();
</script>

<svelte:body />

<!-- bottom-2.5 - (bottom padding) = bottom-2 -->
<div
  class="absolute bottom-2 left-1/2 z-100 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-background/50 px-1 py-0.5 font-[One_Piece] text-sm"
  in:fly={{ y: "100%" }}
>
  <div class="flex items-center gap-1">
    <span>Chapter {searchParams.chapter}</span>
  </div>
  <PageTracker />
</div>
