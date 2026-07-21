import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Required for SPA routing — serve index.html for any unmatched route
  preview: { port: 4173 },
  server: { historyApiFallback: true },
  base: "/Makewell-Agri-Equipments/",
});
