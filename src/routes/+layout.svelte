<script lang="ts">
  import { browser, dev } from "$app/environment";
  import favicon from "$lib/assets/straw-hats-jolly-roger.png";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import { ModeWatcher } from "mode-watcher";
  import { register } from "swiper/element/bundle";
  import Footer from "../components/Footer.svelte";
  import FullScreenManager from "../components/FullScreenManager.svelte";
  import Header from "../components/Header.svelte";
  import Settings from "../components/Settings.svelte";
  import Subheader from "../components/Subheader.svelte";
  import SwipingBlocked from "../components/SwipingBlocked.svelte";
  import { useSearchParams } from "../hooks/use-search-params.svelte";
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

  const { chapter } = $derived(useSearchParams());
</script>

<svelte:head>
  <title>Read One Piece{dev ? " (Dev)" : ""} | Ch. {chapter}</title>
  <link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher disableTransitions={false} />

<!-- https://github.com/sveltejs/kit/discussions/6564 -->
{#if browser}
  <QueryClientProvider client={queryClient}>
    <div class="flex h-svh flex-col gap-3">
      <Header />
      <Subheader />
      <main class="flex-1">
        {@render children()}
      </main>
      <Footer />
    </div>
    <Settings />
    <SwipingBlocked />
    <FullScreenManager />
  </QueryClientProvider>
{/if}
