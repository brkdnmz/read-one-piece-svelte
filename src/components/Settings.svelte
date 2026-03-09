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
  import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
  } from "$lib/components/ui/field";
  import FieldSeparator from "$lib/components/ui/field/field-separator.svelte";
  import { NativeSelect } from "$lib/components/ui/native-select";
  import { preferencesStore } from "../store/preferences.svelte";
  import { appStore } from "../store/store.svelte";
  import { MangaLanguage } from "../types";

  const uid = $props.id();

  $effect(() => {
    appStore.orientation = preferencesStore.current.preferredOrientation;
  });
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
  <DialogContent
    onOpenAutoFocus={(e) => e.preventDefault()}
    class="max-h-full overflow-auto"
  >
    <DialogHeader>
      <DialogTitle class="text-center font-[Anime_Ace]">Settings</DialogTitle>
    </DialogHeader>

    <div>
      <FieldGroup>
        <Field>
          <FieldLabel>Preferred manga language</FieldLabel>
          <NativeSelect
            bind:value={preferencesStore.current.preferredMangaLanguage}
          >
            <option value={MangaLanguage.EN}>🇺🇸 English</option>
            <option value={MangaLanguage.TR}>🇹🇷 Türkçe</option>
          </NativeSelect>
          <FieldDescription>
            One Piece defaults to this language on your further visits.
            Currently selected language won't be affected.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel>Preferred orientation</FieldLabel>
          <NativeSelect
            bind:value={preferencesStore.current.preferredOrientation}
          >
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </NativeSelect>
        </Field>
        <FieldSeparator />
        <Field orientation="horizontal">
          <Checkbox
            id="{uid}-use-fullscreen-api"
            bind:checked={preferencesStore.current.useFullscreenApi}
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
      </FieldGroup>
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
