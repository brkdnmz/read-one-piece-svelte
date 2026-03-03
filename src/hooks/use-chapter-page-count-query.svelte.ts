import { createQuery } from "@tanstack/svelte-query";
import { getChapterPageCount } from "../api/api";
import { MangaLanguage } from "../types";

export function useChapterPageCounQuery(chapter: number) {
  return createQuery(() => ({
    queryKey: ["chapter-page-count", chapter],
    queryFn: async () => {
      const counts: Record<MangaLanguage, number> = {
        [MangaLanguage.EN]: await getChapterPageCount(
          chapter,
          MangaLanguage.EN,
        ),
        [MangaLanguage.TR]: await getChapterPageCount(
          chapter,
          MangaLanguage.TR,
        ),
      };
      return counts;
    },
    staleTime: Infinity,
  }));
}
