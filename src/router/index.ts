import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("@/views/users/ListView.vue"),
  },
  {
    path: "/roles",
    name: "Roles",
    component: () => import("@/views/roles/ListView.vue"),
  },
  {
    path: "/roles_edit/:id",
    name: "RolesEdit",
    component: () => import("@/views/roles/EditView.vue"),
  },
  {
    path: "/permissions",
    name: "Permissions",
    component: () => import("@/views/permissions/ListView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
