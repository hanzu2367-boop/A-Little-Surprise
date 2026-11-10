import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/A-Little-Surprise/' : '/',
  server: {
    watch: {
      ignored: ['**/*.{mp3,m4a,gif,mp4,mov,wav}'],
    },
  },
});
