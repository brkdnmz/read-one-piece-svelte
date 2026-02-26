<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";
  import { onMount } from "svelte";
  import { appStore } from "../store/store.svelte";

  onMount(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "f") {
        appStore.isFullScreen = !appStore.isFullScreen;
      }
      if (e.key === "Escape") {
        appStore.isFullScreen = false;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });
</script>

<Button
  size="icon"
  variant="outline"
  onclick={(e) => {
    appStore.isFullScreen = !appStore.isFullScreen;
    e.stopPropagation();
  }}
  class={cn(
    "absolute right-2.5 bottom-2.5 z-100 bg-background/50! text-muted-foreground *:size-1/2",
    appStore.isFullScreen && "opacity-100",
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
