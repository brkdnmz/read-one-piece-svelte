import { PersistedState } from "runed";
import { MangaLanguage } from "../types";

type PreferencesStore = {
  preferredMangaLanguage: MangaLanguage;
  useFullscreenApi: boolean;
};

export const preferencesStore = new PersistedState<PreferencesStore>(
  "preferences",
  {
    useFullscreenApi: false,
    preferredMangaLanguage: MangaLanguage.EN,
  },
);
