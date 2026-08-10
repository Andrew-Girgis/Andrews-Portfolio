import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";

export default defineConfig({
  output: "static",
  site: "https://girg.is",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  adapter: netlify(),
  vite: {
    resolve: {
      alias: {
        "@": new URL("./src", import.meta.url).pathname,
      },
    },
    build: {
      rollupOptions: {
        external: [/ASCII Scene/],
      },
    },
  },
});
