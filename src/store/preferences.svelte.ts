import { PersistedState } from "runed";
import { MangaLanguage, type Orientation } from "../types";

type PreferencesStore = {
  preferredMangaLanguage: MangaLanguage;
  preferredOrientation: Orientation;
  useFullscreenApi: boolean;
};

export const preferencesStore = new PersistedState<PreferencesStore>(
  "preferences",
  {
    preferredMangaLanguage: MangaLanguage.EN,
    preferredOrientation: "horizontal",
    useFullscreenApi: false,
  },
);
