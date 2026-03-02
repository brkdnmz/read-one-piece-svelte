import { PersistedState } from "runed";
import { AVAILABLE_ZOOM_LEVELS } from "../constants";
import { MangaLanguage } from "../types";

type AppStore = {
  mangaLanguage: MangaLanguage;
  isZoomedIn: boolean;
  isFullScreen: boolean;
  preferredZoomLevelIndex: number;
  useFullscreenApi: PersistedState<boolean>;
  aboutReadBefore: PersistedState<boolean>;
};

export const appStore: AppStore = $state({
  mangaLanguage: MangaLanguage.EN,
  isZoomedIn: false, // not native zoom, but the page zoom
  isFullScreen: false,
  preferredZoomLevelIndex: 1, // defaults to 2x
  useFullscreenApi: new PersistedState("use-fullscreen-api", false), // browser's fullscreen API
  aboutReadBefore: new PersistedState("about-read-before", false), // whether the user has seen the about dialog before
});

export function getPreferredZoomLevel() {
  return AVAILABLE_ZOOM_LEVELS[appStore.preferredZoomLevelIndex];
}
