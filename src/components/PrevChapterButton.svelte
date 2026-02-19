<script lang="ts">
  import OnePieceGun from "$lib/assets/one-piece-gun.png";
  import { Button } from "$lib/components/ui/button";
  import { useSearchParams } from "../hooks/use-search-params.svelte";

  const searchParams = useSearchParams();
</script>

<Button
  variant="ghost"
  class="px-1"
  title="Next chapter"
  onclick={() => {
    searchParams.chapter--;
    searchParams.page = 1;
  }}
>
  <img src={OnePieceGun} class="h-3" alt="Go to next chapter" />
</Button>
