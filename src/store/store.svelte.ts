import { MangaLanguage } from "../types";

type AppStore = {
  mangaLanguage: MangaLanguage;
  isZoomedIn: boolean;
  isFullScreen: boolean;
};

export const appStore: AppStore = $state({
  mangaLanguage: MangaLanguage.EN,
  isZoomedIn: false, // not native zoom, but the page zoom
  isFullScreen: false,
});
