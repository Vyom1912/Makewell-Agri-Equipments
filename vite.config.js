import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// BASE_URL: "/" for Vercel, "/Makewell-Agri-Equipments/" for gh-pages
// Set VITE_BASE in the deployment environment, or leave unset for "/"
export default defineConfig({
  plugins: [react()],
  // preview: { port: 4173 },
  // server: { historyApiFallback: true },
  // base: process.env.VITE_BASE ?? "/",
  base: "/",
});
