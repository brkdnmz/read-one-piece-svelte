<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";
  import { fly } from "svelte/transition";
  import { appStore } from "../store/store.svelte";

  /* Will decide about this later */
  // $effect(() => {
  //   if (!document.fullscreenEnabled) return;

  //   if (appStore.isFullScreen) {
  //     document.body.requestFullscreen?.();
  //   } else {
  //     document.exitFullscreen?.();
  //   }
  // });

  // $effect(() => {
  //   const onFullScreenChange = () => {
  //     if (!document.fullscreenElement) {
  //       appStore.isFullScreen = false;
  //     }
  //   };

  //   window.addEventListener("fullscreenchange", onFullScreenChange);
  //   return () =>
  //     window.removeEventListener("fullscreenchange", onFullScreenChange);
  // });
</script>

<!-- leading-0 for removing extra height -->
<div
  class="fixed right-2.5 bottom-2.5 z-100 leading-0"
  transition:fly={{ x: "100%", y: "100%" }}
>
  <Button
    size="icon"
    variant="outline"
    onclick={(e) => {
      appStore.isFullScreen = !appStore.isFullScreen;
      e.stopPropagation();
    }}
    title={!appStore.isFullScreen ? "Enter full screen" : "Exit full screen"}
    class="bg-background/50! transition duration-100 *:size-1/2 active:scale-85"
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
</div>
