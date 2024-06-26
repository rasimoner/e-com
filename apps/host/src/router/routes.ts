import { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
    {
        path: "",
        name: "home",
        component: () => import("../views/Home.vue"),
    },
    {
        path: "/shop",
        name: "shop",
        component: () => import("../views/CategoryPage.vue"),
    },
    {
        path: "/product/:productId",
        name: "product",
        component: () => import("../views/ProductPage.vue"),
    },
];
