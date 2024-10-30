import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/transcribe': {
        target: 'http://127.0.0.1:5000', // Replace with the port your Flask server is running on
        changeOrigin: true,
      },
    },
  },
});

