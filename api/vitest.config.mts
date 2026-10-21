import { defineConfig } from "vitest/config";

// Keeps vitest from picking up the legacy site-level vite.config.ts in the repo root.
export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
  },
});
