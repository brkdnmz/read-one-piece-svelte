<script>
  import { Button } from "$lib/components/ui/button";
  import { AVAILABLE_ZOOM_LEVELS } from "../constants";
  import { appStore, getPreferredZoomLevel } from "../store/store.svelte";
</script>

<Button
  variant="outline"
  class="aspect-square! rounded-full bg-background/50! p-0 text-2xs"
  onclick={() => {
    appStore.preferredZoomLevelIndex =
      (appStore.preferredZoomLevelIndex + 1) % AVAILABLE_ZOOM_LEVELS.length;
  }}
>
  {getPreferredZoomLevel()}×
</Button>
