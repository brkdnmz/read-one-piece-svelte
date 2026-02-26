<script lang="ts">
  import {
    NativeSelect,
    NativeSelectOption,
  } from "$lib/components/ui/native-select";

  type Props = {
    currentPage: number;
    nPages: number;
    onChoosePage: (page: number) => void;
  };

  let { currentPage, nPages, onChoosePage }: Props = $props();
</script>

<!-- About "text-align-last: center": https://stackoverflow.com/questions/11182559/text-align-is-not-working-on-safari-select -->
<NativeSelect
  bind:value={currentPage}
  class="w-[calc(2ch+1rem)] px-2 py-0 text-center"
  style="text-align-last: center;"
  showArrow={false}
  onchange={(e) => onChoosePage(Number(e.currentTarget.value))}
>
  {#each { length: nPages } as _, i (i)}
    <NativeSelectOption value={i + 1}>
      {i + 1}
    </NativeSelectOption>
  {/each}
</NativeSelect>
