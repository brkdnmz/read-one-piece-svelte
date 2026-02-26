<script lang="ts">
  import MoonMoonFruit from "$lib/assets/moon-moon-fruit.webp";
  import SunPiratesJollyRoger from "$lib/assets/sun-pirates-jolly-roger.svg";
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";
  import { mode, toggleMode } from "mode-watcher";
</script>

<Button
  variant="outline"
  size="icon"
  onclick={toggleMode}
  title="Switch theme"
  class="relative overflow-hidden"
>
  <img
    src={SunPiratesJollyRoger}
    class={cn(
      "absolute h-5 transition",
      mode.current === "dark" && "-translate-y-full opacity-0",
    )}
    alt="Switch to dark theme"
  />
  <img
    src={MoonMoonFruit}
    class={cn(
      "absolute h-5 transition",
      mode.current === "light" && "translate-y-full opacity-0",
    )}
    alt="Switch to light theme"
  />
</Button>
