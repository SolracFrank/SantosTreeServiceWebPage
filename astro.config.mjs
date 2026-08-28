import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [tailwind()],
  devToolbar: {
    enabled: false,
  },
  vite: {
    optimizeDeps: {
      entries: ["src/pages/index.astro"],
      noDiscovery: true,
      include: ["astro > cssesc", "astro > aria-query", "astro > axobject-query"],
    },
    server: {
      preTransformRequests: false,
      watch: {
        usePolling: true,
        interval: 500,
        ignored: ["**/node_modules/**", "**/dist/**", "**/.git/**", "**/.pnpm-store/**"],
      },
    },
  },
});
