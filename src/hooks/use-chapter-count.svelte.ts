import { createQuery } from "@tanstack/svelte-query";
import { getChapterCount } from "../api/api";
import { ESTIMATED_CHAPTER_COUNT } from "../constants";

export function useChapterCount() {
  const query = createQuery(() => ({
    queryKey: ["chapter-count"],
    queryFn: getChapterCount,
    staleTime: Infinity,
  }));

  const chapterCount = $derived(query.data ?? ESTIMATED_CHAPTER_COUNT);

  return {
    get current() {
      return chapterCount;
    },
  };
}
