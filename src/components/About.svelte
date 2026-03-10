<script>
  import FrankySuper from "$lib/assets/franky-super.png";
  import RobinChopper from "$lib/assets/robin-chopper.webp";
  import ThousandSunny from "$lib/assets/thousand-sunny.webp";
  import { Button } from "$lib/components/ui/button";
  import {
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "$lib/components/ui/dialog";
  import DialogDescription from "$lib/components/ui/dialog/dialog-description.svelte";
  import Dialog from "$lib/components/ui/dialog/dialog.svelte";
  import { Kbd, KbdGroup } from "$lib/components/ui/kbd";
  import { cn } from "$lib/utils";
  import { appStore } from "../store/store.svelte";
  import IwwaSwipe from "./icons/IwwaSwipe.svelte";
</script>

<Dialog
  onOpenChange={(open) => {
    if (open) {
      appStore.aboutReadBefore.current = true;
    }
  }}
>
  <DialogTrigger>
    {#snippet child({ props })}
      <Button
        {...props}
        variant="outline"
        size="icon"
        class="group p-0.5 text-muted-foreground"
        title="About"
      >
        <img
          src={ThousandSunny}
          alt="Thousand Sunny Logo"
          class={cn(
            "transition group-active:scale-85 group-active:transition-none",
            !appStore.aboutReadBefore.current && "about-not-read",
          )}
        />
      </Button>
    {/snippet}
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle class="text-center font-[Anime_Ace]">About</DialogTitle>
      <DialogDescription class="italic">
        Hope you have <span class="font-[Anime_Ace]">SUUUUPER</span>
        <img
          src={FrankySuper}
          alt="Franky Super Pose"
          class="inline h-6 align-baseline"
        />
        fun!
      </DialogDescription>
    </DialogHeader>

    <img
      src={RobinChopper}
      alt="Robin Chopper"
      class="m-auto h-40 rounded-lg"
    />

    <ul class="text-sm">
      <li>
        Press on the manga page to toggle the overlay UI. <span
          class="text-muted-foreground italic"
          >(The interaction is a bit delayed because of the double tap
          interaction.)</span
        >
      </li>
      <li>
        To navigate pages:
        <ul>
          <li>
            Swipe left/right
            <IwwaSwipe class="inline size-4 stroke-muted-foreground" /> (up/down in
            vertical mode)
          </li>
          <li>Press the buttons on both sides</li>
          <li>
            Press the arrow keys
            <KbdGroup>
              <Kbd>←</Kbd>
              <Kbd>→</Kbd>
            </KbdGroup>
            (<KbdGroup>
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
            </KbdGroup> in vertical mode)
          </li>
        </ul>
      </li>
      <li>The top bar explains itself enough:)</li>
      <li>
        Double tap to toggle zoom. Swipe navigation is disabled when zoomed in;
        an indicator will appear on the top right corner.
      </li>
      <li>
        Press the icon on the bottom right corner or <Kbd>F</Kbd> to toggle full screen.
        You can also press <Kbd>Esc</Kbd> to exit full screen.
      </li>
    </ul>

    <DialogFooter>
      <DialogClose>
        {#snippet child({ props })}
          <Button {...props} class="font-[Anime_Ace] font-bold">Gotcha!</Button>
        {/snippet}
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

<style>
  .about-not-read {
    animation: scale 1s ease-in-out infinite;
    filter: drop-shadow(0 0 10px yellow);
  }

  @keyframes scale {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }
</style>
