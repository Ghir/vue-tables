import { createRouter, createWebHistory } from "vue-router";

import { usePatientsStore } from "@/stores/patients";

const routes = [
  {
    path: "/",
    name: "Patients",
    component: () => import("@/views/Patients.vue"),
    beforeEnter: () => usePatientsStore().loadData(),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
