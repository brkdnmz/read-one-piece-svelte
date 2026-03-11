<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";
  import { appStore } from "../store/store.svelte";
</script>

<Button
  variant="outline"
  size="icon"
  onclick={() => {
    appStore.orientation =
      appStore.orientation === "horizontal" ? "vertical" : "horizontal";
  }}
  title="Change orientation"
>
  <span
    class={cn(
      "icon-[solar--posts-carousel-horizontal-line-duotone] size-1/2 transition-[background-color,transform]",
      appStore.orientation === "vertical" && "rotate-z-90",
    )}
  ></span>
</Button>
