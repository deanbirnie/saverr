import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3175",
        secure: false,
      },
    },
  },
  plugins: [
    react({
      include: "src/**/*",
    }),
  ],
});
