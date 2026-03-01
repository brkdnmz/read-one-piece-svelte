<script>
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";
  import { appStore } from "../store/store.svelte";
  import { MangaLanguage } from "../types";
</script>

<Button
  variant="outline"
  size="icon"
  onclick={() =>
    (appStore.mangaLanguage =
      appStore.mangaLanguage === MangaLanguage.EN
        ? MangaLanguage.TR
        : MangaLanguage.EN)}
  class="relative overflow-hidden"
  title="Switch theme"
>
  <span
    class={cn(
      "absolute transition",
      appStore.mangaLanguage === MangaLanguage.TR &&
        "-translate-y-full opacity-0",
    )}
  >
    🇺🇸
  </span>
  <span
    class={cn(
      "absolute transition",
      appStore.mangaLanguage === MangaLanguage.EN &&
        "translate-y-full opacity-0",
    )}
  >
    🇹🇷
  </span>
</Button>
