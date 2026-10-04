import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// "base" must match your GitHub repository name so that
// the site works at https://<username>.github.io/Job-Application-Tracker/
export default defineConfig({
  plugins: [react()],
  base: '/Job-Application-Tracker/',
});
