import { defineConfig } from "vite";
import * as commonjs from "vite-plugin-commonjs";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), commonjs.default()],
});
