import generatePackageJson from "rollup-plugin-generate-package-json";
import packageJson from "../package.json" assert {type: "json"};

const subPlugins = (plugins, folderName) => [
    ...plugins,
    generatePackageJson({
        outputFolder: `${folderName}`,
        baseContents: {
            name: `${packageJson.name}/${folderName}`,
            private: true,
            main: `../dist/cjs/${folderName}/index.js`,
            module: `../dist/esm/${folderName}/index.js`,
            types: `../dist/types/${folderName}/index.d.ts`,
            sideEffects: false,
        },
    }),
];

export default subPlugins;