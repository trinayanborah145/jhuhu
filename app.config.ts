import { defineConfig } from "@tanstack/react-start/config";

export default defineConfig({
  server: {
    preset: "static",
    prerender: {
      routes: ["/"],
      crawlLinks: true,
      shouldPrerender: (path: string) => !/\.(?:png|jpe?g|gif|svg|pdf|zip|mp4|webp|ico)$/i.test(path),
    }
  }
});
