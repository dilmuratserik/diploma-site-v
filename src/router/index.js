import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import("@/views/Main.vue"),
    meta: {
      name: "Главная страница",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/orders",
    name: "orders",
    component: () => import("@/views/Orders.vue"),
    meta: {
      name: "Заказы",
    },
  },
  {
    path: "/orders/create",
    name: "ordersCreate",
    component: () => import("@/components/OrdersCreateComponent.vue"),
    meta: {
      name: "Добавление заказа",
    },
  },
  {
    path: "/agents",
    name: "agents",
    component: () => import("@/views/Agents.vue"),
    meta: {
      name: "Торговые агенты",
    },
  },
  {
    path: "/agents/add",
    name: "addAgent",
    component: () => import("@/views/AgentAdd.vue"),
  },
  {
    path: "/agents/:id",
    name: "agentsEdit",
    component: () => import("@/views/AgentEdit.vue"),
    meta: {
      name: "Торговые агенты",
    },
  },
  {
    path: "/points",
    name: "points",
    component: () => import("@/views/Points.vue"),
    meta: {
      name: "Торговые точки",
    },
  },
  {
    path: "/goods",
    name: "goods",
    component: () => import("@/views/Goods.vue"),
    meta: {
      name: "Товары",
    },
  },
  {
    path: "/visits",
    name: "visits",
    component: () => import("@/views/Visits.vue"),
    meta: {
      name: "Визиты",
    },
  },
  {
    path: "/payment",
    name: "payment",
    component: () => import("@/views/Payment.vue"),
    meta: {
      name: "Оплаты",
    },
  },
  {
    path: "/messages",
    name: "messages",
    component: () => import("@/views/Messages.vue"),
    meta: {
      name: "Сообщение",
    },
  },
  {
    path: "/directory",
    name: "directory",
    component: () => import("@/views/Directory.vue"),
    meta: {
      name: "Справочники",
    },
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/Settings.vue"),
    meta: {
      name: "Настройки",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
