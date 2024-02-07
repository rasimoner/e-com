import { UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";

const resolvePath = (str: string) => resolve(__dirname, str);

const config: UserConfig = {
    build: {
        sourcemap: true,
        lib: {
            entry: resolvePath("src/index.ts"),
            name: "index",
            fileName: "index",
        },
    },
    plugins: [
        vue(),
        dts({
            insertTypesEntry: true,
            exclude: ["src/**/__tests__/*.ts"],
        }),
    ],
    resolve: {
        alias: {
            "@api/*": resolve(__dirname, "src/api/*"),
            "@assets/*": resolve(__dirname, "src/assets/*"),
            "@components/*": resolve(__dirname, "src/components/*"),
            "@primePreset/*": resolve(__dirname, "src/primePreset/*"),
            "@router/*": resolve(__dirname, "src/router/*"),
            "@store/*": resolve(__dirname, "src/store/*"),
            "@types/*": resolve(__dirname, "src/types/*"),
        },
    },
};

export default config;
