import { AVAILABLE_ZOOM_LEVELS } from "../constants";
import { MangaLanguage } from "../types";

type AppStore = {
  mangaLanguage: MangaLanguage;
  isZoomedIn: boolean;
  isFullScreen: boolean;
  preferredZoomLevelIndex: number;
};

export const appStore: AppStore = $state({
  mangaLanguage: MangaLanguage.EN,
  isZoomedIn: false, // not native zoom, but the page zoom
  isFullScreen: false,
  preferredZoomLevelIndex: 1, // defaults to 2x
});

export function getPreferredZoomLevel() {
  return AVAILABLE_ZOOM_LEVELS[appStore.preferredZoomLevelIndex];
}
