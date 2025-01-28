import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/IDC_/", // Замініть на назву вашого репозиторію
});
