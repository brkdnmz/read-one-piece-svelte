<script lang="ts">
  import { browser } from "$app/environment";
  import favicon from "$lib/assets/straw-hats-jolly-roger.png";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import { ModeWatcher } from "mode-watcher";
  import { register } from "swiper/element/bundle";
  import Header from "../components/Header.svelte";
  import Subheader from "../components/Subheader.svelte";
  import SwipingBlocked from "../components/SwipingBlocked.svelte";
  import "../layout.css";

  let { children } = $props();

  register();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
      },
    },
  });
</script>

<svelte:head>
  <title>Read One Piece</title>
  <link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher disableTransitions={false} />

<!-- https://github.com/sveltejs/kit/discussions/6564 -->
{#if browser}
  <QueryClientProvider client={queryClient}>
    <!-- Patched to not set html style color-scheme -->
    <div class="flex h-svh flex-col gap-3">
      <Header />
      <Subheader />
      <main class="flex-1">
        {@render children()}
      </main>
    </div>
    <SwipingBlocked />
  </QueryClientProvider>
{/if}
