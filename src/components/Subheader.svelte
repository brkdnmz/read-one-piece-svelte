<script lang="ts">
  import ChapterText from "$lib/assets/chapter-text-2.png";
  import PageText from "$lib/assets/page-text-2.png";
  import About from "./About.svelte";
  import ChapterNavigationButton from "./ChapterNavigationButton.svelte";
  import ChapterSelector from "./ChapterSelector.svelte";
  import LangSwitcher from "./LangSwitcher.svelte";
  import PageTracker from "./PageTracker.svelte";
  import ThemeSwitcher from "./ThemeSwitcher.svelte";
</script>

<!-- pb-5 for "Go to..." button -->
<div
  class="flex flex-wrap-reverse items-stretch justify-center gap-x-2 gap-y-1 pb-5 font-[One_Piece] select-none"
>
  <div class="flex items-stretch justify-center gap-2">
    <div class="flex items-center gap-1">
      <!-- "Chapter" text in One Piece style -->
      <img src={ChapterText} class="h-5" alt="Chapter" />

      <div class="flex">
        <ChapterNavigationButton direction="prev" />

        <ChapterSelector />

        <ChapterNavigationButton direction="next" />
      </div>
    </div>

    <div class="flex items-center gap-1">
      <!-- "Page" text in One Piece style -->
      <img src={PageText} class="-mb-px inline h-4.5" alt="Page" />

      <PageTracker />
    </div>
  </div>

  <div class="flex items-center gap-1">
    <ThemeSwitcher />
    <LangSwitcher />
    <About />
  </div>
</div>
