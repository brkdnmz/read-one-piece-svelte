<script lang="ts">
  import OnePieceGun from "$lib/assets/one-piece-gun.png";
  import { cn } from "$lib/utils";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { fly } from "svelte/transition";

  type Props = HTMLButtonAttributes & {
    direction: "prev" | "next";
  };

  let { class: className, direction, ...restProps }: Props = $props();
</script>

<button
  {...restProps}
  title="Slide {direction}"
  class={cn(
    "absolute top-1/2 z-10 -translate-y-1/2 border-none bg-transparent px-2.5 py-6 transition-[scale] duration-100 active:scale-85",
    direction === "next" ? "right-0" : "left-0",
    className,
  )}
  transition:fly={{ x: direction === "next" ? "100%" : "-100%" }}
>
  <div
    class={"flex aspect-square items-center justify-center rounded-full bg-slate-800/70!"}
  >
    <img
      src={OnePieceGun}
      class={cn("w-14 p-2", direction === "next" && "rotate-y-180")}
      alt="Slide {direction}"
    />
  </div>
</button>
