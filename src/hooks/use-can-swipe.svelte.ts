import { appStore } from "../store/store.svelte";
import { useNativeZoom } from "./use-native-zoom.svelte";

export function useCanSwipe() {
  const isNativeZoomedIn = useNativeZoom();

  const canSwipe = $derived(!isNativeZoomedIn.current && !appStore.isZoomedIn);

  return {
    get current() {
      return canSwipe;
    },
  };
}
