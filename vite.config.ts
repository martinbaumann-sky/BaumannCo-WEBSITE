import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables de entorno según el modo (development/production)
  // El tercer parámetro '' permite cargar todas las variables, no solo las que empiezan con VITE_
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Esto reemplaza 'process.env.API_KEY' en tu código por el valor real durante el build
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})