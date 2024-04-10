import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
=======
  server: {
    proxy: {
      '/personal': 'http://localhost:5000'
    }
  }
>>>>>>> 41c900c353ee6437314a07e0f956d689500e99ca
})
