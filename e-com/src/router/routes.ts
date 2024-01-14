import { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
    {
        path: "",
        name: "home",
        component: () => import("../views/Home.vue"),
    },
    {
        path: "/signUp",
        name: "signUp",
        component: () => import("../views/SignUp.vue"),
    },
];
