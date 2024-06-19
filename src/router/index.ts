import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/PageHome.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "ErrorPage",
      component: () => import("@/views/ErrorPage.vue"),
    },
  ],
});

export default router;
