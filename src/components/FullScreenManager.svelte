<script lang="ts">
  import { preferencesStore } from "../store/preferences.svelte";
  import { appStore } from "../store/store.svelte";

  $effect(() => {
    preferencesStore.current.useFullscreenApi;
    appStore.isFullScreen;

    if (!document.fullscreenEnabled) return;

    if (preferencesStore.current.useFullscreenApi) {
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
