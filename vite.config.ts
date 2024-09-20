import { defineConfig } from "vite";
import * as commonjs from "vite-plugin-commonjs";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), commonjs.default()],
  build: {
    outDir: path.join(__dirname, "build"),
  },
});
