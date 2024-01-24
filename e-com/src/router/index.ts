import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { userModule } from "@/store";

const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach(async () => {
    userModule().initializeCurrentUser();
});
export { router };
