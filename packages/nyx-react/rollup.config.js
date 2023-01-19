import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import babel from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

import getFolders from "./tools/listFolder.mjs";

export const plugins = [
    babel({
        babelHelpers: "bundled"
    }),
    commonjs({extensions: [".js", ".ts", ".tsx", ".jsx"]}),
    resolve(),
    typescript({
        tsconfig: "tsconfig.json"
    }),
    terser()
];

const folderBuilds = (await getFolders("./src/components")).flatMap((folder) => {
    return [{
        input: `src/components/${folder}/index.ts`,
        output: [
            {
                file: `dist/esm/${folder}/index.js`,
                sourcemap: true,
                exports: "named",
                format: "esm",
            },
            {
                file: `dist/cjs/${folder}/index.js`,
                sourcemap: true,
                exports: "named",
                format: "cjs",
            }
        ],
        plugins: [...plugins, peerDepsExternal()],
        external: ["react", "react-dom"],
    }, {
        input: `dist/esm/${folder}/index.d.ts`,
        output: {
            file: `dist/types/${folder}/index.d.ts`,
            format: "esm",
            sourcemap: true
        },
        plugins: [dts()]
    }];
});

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: "dist/index.cjs.js",
                format: "cjs",
                sourcemap: true,
                exports: "named"
            },
            {
                file: "dist/index.esm.js",
                format: "esm",
                sourcemap: true,
                exports: "named"
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
        plugins,
        external: ["react", "react-dom"],
    },
    ...folderBuilds,
    {
        input: "dist/index.d.ts",
        output: {
            file: "dist/types/index.d.ts",
            format: "esm",
            sourcemap: true
        },
        plugins: [dts()]
    }
];