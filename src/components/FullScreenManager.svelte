<script lang="ts">
  import { appStore } from "../store/store.svelte";

  $effect(() => {
    appStore.useFullscreenApi.current;
    appStore.isFullScreen;

    if (!document.fullscreenEnabled) return;

    if (appStore.useFullscreenApi.current) {
      if (appStore.isFullScreen) {
        document.body.requestFullscreen?.();
      }
    }

    if (!appStore.isFullScreen && document.fullscreenElement) {
      document.exitFullscreen?.();
    }
  });
</script>

<svelte:document
  onfullscreenchange={() =>
    (appStore.isFullScreen = !!document.fullscreenElement)}
/>
