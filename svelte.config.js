import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    runes: true,
  },
  kit: {
    adapter: adapter({ strict: false }),
    paths: {
      base: "/read-one-piece-svelte",
      relative: false,
    },
  },
};

export default config;
