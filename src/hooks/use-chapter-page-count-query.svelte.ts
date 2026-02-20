import { createQuery } from "@tanstack/svelte-query";
import { getChapterPageCount } from "../api/api";

export function useChapterPageCounQuery(chapter: number) {
  return createQuery(() => ({
    queryKey: ["chapter-page-count", chapter],
    queryFn: async () => {
      const cnt = await getChapterPageCount(chapter);

      return cnt;
    },
    staleTime: Infinity,
  }));
}
