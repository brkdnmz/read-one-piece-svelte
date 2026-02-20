<script lang="ts">
  import MoonMoonFruit from "$lib/assets/moon-moon-fruit.webp";
  import SunPiratesJollyRoger from "$lib/assets/sun-pirates-jolly-roger.svg";
  import { Button } from "$lib/components/ui/button";
  import { mode, toggleMode } from "mode-watcher";
  import { Spring } from "svelte/motion";

  const u = $derived(mode.current === "light" ? 0 : 1);
  const spring = Spring.of(() => u, { stiffness: 0.1, damping: 0.25 });

  const sunScale = $derived(0.7 + 0.3 * (1 - spring.current));
  const sunOpacity = $derived(1 - spring.current);
  const moonScale = $derived(0.7 + 0.3 * spring.current);
  const moonOpacity = $derived(spring.current);
</script>

<Button variant="outline" size="icon" onclick={toggleMode} title="Switch theme">
  <img
    src={SunPiratesJollyRoger}
    class="absolute h-5"
    style="transform: scale({sunScale}); opacity: {sunOpacity};"
    alt="Switch to dark theme"
  />
  <img
    src={MoonMoonFruit}
    class="absolute h-5"
    style="transform: scale({moonScale}); opacity: {moonOpacity};"
    alt="Switch to light theme"
  />
</Button>
