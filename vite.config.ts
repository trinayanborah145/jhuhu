import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    prerender: {
      enabled: true,
      routes: ["/"],
      crawlLinks: true,
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'public/*',
          dest: ''
        }
      ]
    })
  ]
});
