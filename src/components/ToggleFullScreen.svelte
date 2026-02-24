<script>
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";
  import { appStore } from "../store/store.svelte";
</script>

<Button
  size="icon"
  variant="secondary"
  onclick={(e) => {
    appStore.isFullScreen = !appStore.isFullScreen;
    e.stopPropagation();
  }}
  class={cn(
    "absolute top-2.5 right-2.5 z-100 text-muted-foreground opacity-100 *:size-1/2",
    appStore.isFullScreen && "opacity-50",
  )}
  title={!appStore.isFullScreen ? "Enter full screen" : "Exit full screen"}
>
  <span
    class={cn(
      "absolute icon-[bi--fullscreen] transition duration-200",
      appStore.isFullScreen && "opacity-0",
    )}
  ></span>
  <span
    class={cn(
      "absolute icon-[bi--fullscreen-exit] transition duration-200",
      !appStore.isFullScreen && "opacity-0",
    )}
  ></span>
</Button>
