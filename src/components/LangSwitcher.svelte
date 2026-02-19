<script>
  import { Button } from "$lib/components/ui/button";
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
  title="Switch theme"
>
  {appStore.mangaLanguage === MangaLanguage.EN ? "🇬🇧" : "🇹🇷"}
</Button>
