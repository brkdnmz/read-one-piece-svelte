<script lang="ts">
  import OnePieceGun from "$lib/assets/one-piece-gun.png";
  import { Button } from "$lib/components/ui/button";
  import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
  } from "$lib/components/ui/dialog";
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
  } from "$lib/components/ui/input-group";
  import type { EventHandler } from "svelte/elements";
  import { useChapterCount } from "../hooks/use-chapter-count.svelte";
  import { useSearchParams } from "../hooks/use-search-params.svelte";

  const searchParams = useSearchParams();
  const chapterCount = useChapterCount();
  let isDialogOpen = $state(false);
  let newChapterInput = $state(searchParams.chapter.toString());

  $effect(() => {
    newChapterInput = newChapterInput.replace(/\s/g, "");
    newChapterInput = newChapterInput.replace(/[^0-9]/g, "");
  });

  const onSubmit: EventHandler<SubmitEvent> = (e) => {
    e.preventDefault();
    if (!newChapterInput) return;
    const newChapter = Number(newChapterInput);
    if (newChapter >= 1 && newChapter <= chapterCount.current) {
      searchParams.chapter = newChapter;
      searchParams.page = 1;
      isDialogOpen = false;
    }
  };
</script>

<Dialog
  open={isDialogOpen}
  onOpenChange={(open) => {
    newChapterInput = searchParams.chapter.toString();
    isDialogOpen = open;
  }}
>
  <DialogTrigger>
    {#snippet child({ props })}
      <Button
        {...props}
        class="absolute inset-x-0 top-full mt-1 h-fit py-1 text-center text-xs italic"
        variant="secondary"
        size="xs"
      >
        Go to...
      </Button>
    {/snippet}
  </DialogTrigger>
  <DialogContent aria-describedby={undefined}>
    <DialogTitle>Go to...</DialogTitle>
    <form onsubmit={onSubmit}>
      <Field>
        <FieldLabel for="new-chapter-input">
          Chapter (1 - {chapterCount.current})
        </FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="new-chapter-input"
            inputmode="numeric"
            bind:value={newChapterInput}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-sm" variant="ghost" type="submit">
              <img src={OnePieceGun} alt="Go" class="rotate-y-180" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </form>
  </DialogContent>
</Dialog>
