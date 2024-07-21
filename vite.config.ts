import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from 'vite-plugin-dts'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // @ts-ignore
      entry: path.resolve(__dirname, "src/index.vue"),
      name: "VLazyLoading",
      fileName: (format) => `vue-lazy-loading.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [
    vue(),
    dts({
      outDir: 'dist',
      cleanVueFileName: true
    }),
  ],
});
