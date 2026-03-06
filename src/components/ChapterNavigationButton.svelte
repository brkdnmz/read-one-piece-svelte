<script lang="ts">
  import OnePieceGun from "$lib/assets/one-piece-gun.webp";
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";
  import { useSearchParams } from "../hooks/use-search-params.svelte";

  type Props = {
    direction: "next" | "prev";
  };

  const { direction }: Props = $props();
  const searchParams = useSearchParams();
</script>

<Button
  variant="ghost"
  class="group px-1"
  title="{direction === 'next' ? 'Next' : 'Previous'} chapter"
  onclick={() => {
    searchParams.chapter += direction === "next" ? 1 : -1;
    searchParams.page = 1;
  }}
>
  <img
    src={OnePieceGun}
    class={cn(
      "h-3 origin-bottom-right transition duration-100 group-active:rotate-z-15",
      direction === "next" && "-translate-x-full rotate-y-180",
    )}
    alt="Go to {direction} chapter"
  />
</Button>
