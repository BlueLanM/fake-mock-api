import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	base: "/json-test/",
	// GitHub Pages 需要设置为仓库名
	build: {
		outDir: "docs"
	},
	plugins: [react()]
});