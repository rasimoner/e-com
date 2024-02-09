import { UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

const config: UserConfig = {
    plugins: [vue()],
    resolve: {
        alias: {
            "@api": resolve(__dirname, "src/api/"),
            "@assets": resolve(__dirname, "src/assets/"),
            "@components": resolve(__dirname, "src/components/"),
            "@primePreset": resolve(__dirname, "src/primePreset/"),
            "@router": resolve(__dirname, "src/router/"),
            "@store": resolve(__dirname, "src/store/"),
            "@interfaces": resolve(__dirname, "src/interfaces/"),
        },
    },
};

export default config;
