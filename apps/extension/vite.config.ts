
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import webExtension from "vite-plugin-web-extension";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),

    // react(),
    !process.env.VITEST && webExtension({
      manifest: "public/manifest.json",
      watchFilePaths: ["package.json", "manifest.json"],
      disableAutoLaunch: true,
    }),
  ],
  test: {
    setupFiles: ['./src/setupTests.ts'],
    alias: [
      { find: /.*\.css$/, replacement: path.resolve('src/__mocks__/styleMock.ts') },
    ]
  },
} as any)
