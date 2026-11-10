import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    watch: {
      ignored: ['**/*.{mp3,m4a,gif,mp4,mov,wav}'],
    },
  },
});
