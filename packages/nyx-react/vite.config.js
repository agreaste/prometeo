import {resolve} from "path";
import {defineConfig} from "rollup";

import {plugins} from "./rollup.config.js";

export default defineConfig({
    build: {
        sourcemap: true,
        outDir: "./dist",
        lib: {
            name: "react-nyx",
            entry: resolve(__dirname, "src/index.ts"),
            formats: ["cjs", "es", "umd"],
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            plugins,
            external: ["react", "react-dom"],
        }
    }
});