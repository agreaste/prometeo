import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import babel from "@rollup/plugin-babel";

export default [{
    input: "src/index.ts",
    output: [
        {
            file: "dist/index.cjs.js",
            format: "cjs",
            sourcemap: true,
            preserveModules: false
        },
        {
            file: "dist/index.esm.js",
            format: "esm",
            sourcemap: true,
        },
        {
            file: "dist/index.umd.js",
            name: "nyx-react",
            format: "umd",
            sourcemap: true,
            preserveModules: false,
            globals: {
                react: "react"
            }
        }
    ],
    plugins: [
        babel({
            babelHelpers: "bundled"
        }),
        commonjs({extensions: [".js", ".ts", ".tsx", ".jsx"]}),
        resolve(),
        typescript({
            tsconfig: "tsconfig.json"
        }),
        terser()
    ],
    external: ["react"],
}, {
    input: "dist/index.d.ts",
    output: {
        file: "dist/types/index.d.ts",
        format: "esm",
        sourcemap: true
    },
    plugins: [dts()]
}];