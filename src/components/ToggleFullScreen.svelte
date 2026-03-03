<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";
  import { fly } from "svelte/transition";
  import { appStore } from "../store/store.svelte";
</script>

<!-- leading-0 for removing extra height -->
<div
  class="fixed right-0 bottom-0 z-100 leading-0"
  transition:fly={{ x: "100%", y: "100%" }}
>
  <div class="relative p-2.5">
    <Button
      size="icon"
      variant="outline"
      title={!appStore.isFullScreen ? "Enter full screen" : "Exit full screen"}
      onclick={(e) => {
        appStore.isFullScreen = !appStore.isFullScreen;
        e.stopPropagation();
      }}
      class="bg-background/50! *:size-1/2 after:absolute after:inset-0"
    >
      <div class="relative">
        <span
          class={cn(
            "absolute inset-0 icon-[bi--fullscreen] size-full transition duration-200",
            appStore.isFullScreen && "opacity-0",
          )}
        ></span>
        <span
          class={cn(
            "absolute inset-0 icon-[bi--fullscreen-exit] size-full transition duration-200",
            !appStore.isFullScreen && "opacity-0",
          )}
        ></span>
      </div>
    </Button>
  </div>
</div>
