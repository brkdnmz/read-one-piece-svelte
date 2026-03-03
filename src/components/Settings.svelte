<script>
  import ShipWheel from "$lib/assets/ship-wheel.png";
  import { Button } from "$lib/components/ui/button";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import {
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "$lib/components/ui/dialog";
  import Dialog from "$lib/components/ui/dialog/dialog.svelte";
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import { appStore } from "../store/store.svelte";

  const uid = $props.id();
</script>

<Dialog>
  <DialogTrigger>
    {#snippet child({ props })}
      <div class="fixed top-0 left-0 p-2.5 leading-0">
        <Button
          {...props}
          variant="outline"
          size="icon"
          class="group p-0.5 text-muted-foreground after:absolute after:inset-0"
          title="Settings"
        >
          <img
            src={ShipWheel}
            alt="Ship Wheel"
            class="transition group-active:-rotate-z-360 group-active:transition-none"
          />
        </Button>
      </div>
    {/snippet}
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle class="text-center font-[Anime_Ace]">Settings</DialogTitle>
    </DialogHeader>

    <div class="max-h-[50vh] overflow-y-auto">
      <Field orientation="horizontal">
        <Checkbox
          id="{uid}-use-fullscreen-api"
          bind:checked={appStore.useFullscreenApi.current}
          disabled={!document.fullscreenEnabled}
        />
        <FieldLabel for="{uid}-use-fullscreen-api" class="block">
          Enable browser's full screen mode
          {#if !document.fullscreenEnabled}
            <div class="text-muted-foreground italic">
              (Not supported in your browser)
            </div>
          {/if}
        </FieldLabel>
      </Field>
    </div>

    <DialogFooter>
      <DialogClose>
        {#snippet child({ props })}
          <Button {...props} class="font-[Anime_Ace] text-2xs font-bold">
            I'm done!
          </Button>
        {/snippet}
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
