import { createQuery, useQueryClient } from "@tanstack/svelte-query";
import { getChapterPageCount } from "../api/api";
import { MangaLanguage } from "../types";

export function useChapterPageCounQuery(chapter: number, lang: MangaLanguage) {
  const queryClient = useQueryClient();

  $effect(() => {
    Object.values(MangaLanguage).forEach((lang) => {
      queryClient.prefetchQuery({
        queryKey: ["chapter-page-count", chapter, lang],
        queryFn: async () => getChapterPageCount(chapter, lang),
        staleTime: Infinity,
      });
    });
  });

  return createQuery(() => ({
    queryKey: ["chapter-page-count", chapter, lang],
    queryFn: async () => getChapterPageCount(chapter, lang),
    staleTime: Infinity,
  }));
}
