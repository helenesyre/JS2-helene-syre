import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/JS2-helene-syre/',
  plugins: [
    tailwindcss(),
  ],
});