<script lang="ts">
  import ChapterText from "$lib/assets/chapter-text-2.png";
  import PageText from "$lib/assets/page-text-2.png";
  import ChapterSelector from "./ChapterSelector.svelte";
  import Credits from "./Credits.svelte";
  import LangSwitcher from "./LangSwitcher.svelte";
  import NavigationDescription from "./NavigationDescription.svelte";
  import NextChapterButton from "./NextChapterButton.svelte";
  import PageTracker from "./PageTracker.svelte";
  import PrevChapterButton from "./PrevChapterButton.svelte";
  import ThemeSwitcher from "./ThemeSwitcher.svelte";
</script>

<!-- Gap for "Go to..." button -->
<div class="grid gap-8">
  <div
    class="flex items-stretch justify-center gap-3 font-[One_Piece] select-none"
  >
    <div class="flex items-center gap-2">
      <!-- "Chapter" text in One Piece style -->
      <img src={ChapterText} class="h-5" alt="Chapter" />

      <div class="flex">
        <PrevChapterButton />

        <ChapterSelector />

        <NextChapterButton />
      </div>
    </div>

    <div class="flex items-center gap-1">
      <!-- "Page" text in One Piece style -->
      <img src={PageText} class="-mb-0.5 inline h-4.5" alt="Page" />

      <PageTracker />
    </div>

    <div class="flex items-center gap-1">
      <ThemeSwitcher />

      <LangSwitcher />
    </div>
  </div>

  <div>
    <NavigationDescription />

    <Credits />
  </div>
</div>
