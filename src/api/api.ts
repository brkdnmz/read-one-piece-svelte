import {
  ESTIMATED_CHAPTER_COUNT,
  FIRST_CHAPTER_PAGES,
  MAX_PAGES_PER_CHAPTER,
} from "../constants";
import { MangaLanguage } from "../types";
import { apiClient } from "./client";
import { getChapterPageUrl } from "./util";

export async function getChapterCount(): Promise<number> {
  return await apiClient
    .get("/chapter-count")
    .then((res) => res.data.count)
    .catch(() => ESTIMATED_CHAPTER_COUNT);
}

export async function getChapterPageCount(
  chapter: number,
  lang: MangaLanguage,
): Promise<number> {
  if (chapter === 1 && lang === MangaLanguage.EN) {
    return FIRST_CHAPTER_PAGES;
  }

  if (lang === MangaLanguage.EN) {
    return await apiClient
      .get("/page-count", {
        // I require the page param also, don't you dare question
        params: { chapter, page: 1 },
      })
      .then((res) => res.data.count)
      .catch(() => MAX_PAGES_PER_CHAPTER);
  }

  // lang === TR here
  async function pageExists(page: number): Promise<boolean> {
    const pageUrl = getChapterPageUrl(chapter, page, lang);

    return new Promise((resolve) => {
      const img = new Image();
      img.onerror = () => resolve(false);
      img.onload = () => resolve(true);
      img.src = pageUrl;
    });
  }

  let l = 1;
  let r = chapter === 1 ? FIRST_CHAPTER_PAGES : MAX_PAGES_PER_CHAPTER;

  while (l < r) {
    const mid = Math.floor((l + r + 1) / 2);
    if (!(await pageExists(mid))) {
      r = mid - 1;
    } else {
      l = mid;
    }
  }

  return l;
}
