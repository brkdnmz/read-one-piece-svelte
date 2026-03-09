import { PersistedState } from "runed";
import { AVAILABLE_ZOOM_LEVELS } from "../constants";
import { MangaLanguage } from "../types";
import { preferencesStore } from "./preferences.svelte";

type AppStore = {
  mangaLanguage: MangaLanguage;
  orientation: "horizontal" | "vertical";
  isZoomedIn: boolean;
  isFullScreen: boolean;
  preferredZoomLevelIndex: number;
  aboutReadBefore: PersistedState<boolean>;
};

export const appStore: AppStore = $state({
  mangaLanguage: preferencesStore.current.preferredMangaLanguage,
  orientation: preferencesStore.current.preferredOrientation,
  isZoomedIn: false, // not native zoom, but the page zoom
  isFullScreen: false,
  preferredZoomLevelIndex: 1, // defaults to 2x
  aboutReadBefore: new PersistedState("about-read-before", false), // whether the user has seen the about dialog before
});

export function getPreferredZoomLevel() {
  return AVAILABLE_ZOOM_LEVELS[appStore.preferredZoomLevelIndex];
}
