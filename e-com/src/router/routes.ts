import { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
    {
        path: "",
        name: "home",
        component: () => import("../pages/Home.vue"),
    },
];
