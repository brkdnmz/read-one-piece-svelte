<script>
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";
  import { useSearchParams } from "../hooks/use-search-params.svelte";
  import { appStore } from "../store/store.svelte";
  import { MangaLanguage } from "../types";

  const searchParams = useSearchParams();
  const { chapter } = $derived(searchParams);
  const isTR = $derived(appStore.mangaLanguage === MangaLanguage.TR);
</script>

<Button
  variant="outline"
  size="icon"
  onclick={() => (appStore.isColored = !appStore.isColored)}
  disabled={isTR}
  title="Switch between colored and black & white"
>
  <span
    class={cn(
      "icon-[noto--artist-palette] size-1/2 transition",
      ((!isTR && !appStore.isColored) || (isTR && chapter > 838)) &&
        "grayscale",
    )}
  ></span>
</Button>
