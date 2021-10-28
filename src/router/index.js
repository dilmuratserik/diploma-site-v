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
  },
  {
    path: '/orders/create',
    name: 'Добавление заказа',
    component: () => import('@/components/OrdersCreateComponent.vue')
  },
  {
    path: '/agents',
    name: 'Торговые агенты',
    component: () => import('@/views/Agents.vue')
  },
  {
    path: '/agents/:id',
    name: 'Edit Agent',
    component: () => import('@/views/AgentEdit.vue')
  },
  {
    path: '/points',
    name: 'Торговые точки',
    component: () => import('@/views/Points.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
