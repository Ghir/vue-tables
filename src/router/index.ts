import { createRouter, createWebHistory } from "vue-router";

import { useTablesStore } from "@/stores/table-state";

const routes = [
  {
    path: "/",
    name: "TablesPage",
    component: () => import("@/views/TablesPage.vue"),
    beforeEnter: () => useTablesStore().loadData(),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
