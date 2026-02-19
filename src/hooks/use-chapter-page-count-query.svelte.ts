import { createQuery } from "@tanstack/svelte-query";
import { getChapterPageCount } from "../api/api";

export function useChapterPageCounQuery(chapter: number) {
  return createQuery(() => ({
    queryKey: ["chapter-page-count", chapter],
    queryFn: async () => {
      const cnt = await getChapterPageCount(chapter);
      console.log(cnt);

      return cnt;
    },
    staleTime: Infinity,
  }));
}
