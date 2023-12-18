import "./assets/main.css";

import { createApp } from "vue";
import { defaultConfig, plugin } from "@formkit/vue";
import config from "../formkit.config";
import App from "./App.vue";

createApp(App).use(plugin, defaultConfig(config)).mount("#app");
