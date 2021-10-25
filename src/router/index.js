import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Главная страница',
    component: () => import('@/views/Main.vue')
  },
  {
    path: '/orders',
    name: 'Заказы',
    component: () => import('@/views/Orders.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
