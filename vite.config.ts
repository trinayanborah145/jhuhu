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
  vite: {
    server: {
      proxy: {
        '/api/nvidia': {
          target: 'https://integrate.api.nvidia.com',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api\/nvidia/, ''),
          secure: true,
        },
      },
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
