import { useSearchParams as _useSearchParams } from "runed/kit";
import z from "zod";

export function useSearchParams() {
  return _useSearchParams(
    z.object({
      chapter: z.number().min(1).catch(1),
      page: z.number().min(1).catch(1),
    }),
    { showDefaults: true, pushHistory: false },
  );
}
