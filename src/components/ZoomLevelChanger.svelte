<script>
  import { Button } from "$lib/components/ui/button";
  import { AVAILABLE_ZOOM_LEVELS } from "../constants";
  import { appStore, getPreferredZoomLevel } from "../store/store.svelte";
</script>

<Button
  variant="outline"
  class="aspect-square size-8! rounded-full border-slate-600! bg-background/40! p-2 text-2xs"
  onclick={() => {
    appStore.preferredZoomLevelIndex =
      (appStore.preferredZoomLevelIndex + 1) % AVAILABLE_ZOOM_LEVELS.length;
  }}
>
  {getPreferredZoomLevel()}×
</Button>
