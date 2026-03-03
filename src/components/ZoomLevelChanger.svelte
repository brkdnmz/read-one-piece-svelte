<script>
  import { Button } from "$lib/components/ui/button";
  import { fly } from "svelte/transition";
  import { AVAILABLE_ZOOM_LEVELS } from "../constants";
  import { appStore, getPreferredZoomLevel } from "../store/store.svelte";
</script>

<div
  class="absolute top-0 left-1/2 z-20 -translate-x-1/2"
  transition:fly={{ y: "-100%" }}
>
  <div class="relative p-2.5">
    <Button
      variant="outline"
      onclick={() => {
        appStore.preferredZoomLevelIndex =
          (appStore.preferredZoomLevelIndex + 1) % AVAILABLE_ZOOM_LEVELS.length;
      }}
      class="group aspect-square rounded-full bg-background/50! p-0 text-2xs after:absolute after:inset-0"
    >
      <span class="transition duration-100 group-active:scale-85"
        >{getPreferredZoomLevel()}×</span
      >
    </Button>
  </div>
</div>
