import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // ponytail: bind mount no Windows não propaga eventos de fs nativos pro container,
      // sem isso o Vite não recarrega sozinho quando o arquivo muda no host.
      usePolling: true,
    },
  },
})
