import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/Main.vue'),
    meta: {
      name: 'Главная страница'
    }
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('@/views/Orders.vue'),
    meta: {
      name: 'Заказы'
    }
  },
  {
    path: '/orders/create',
    name: 'ordersCreate',
    component: () => import('@/components/OrdersCreateComponent.vue'),
    meta: {
      name: 'Добавление заказа'
    }
  },
  {
    path: '/agents',
    name: 'agents',
    component: () => import('@/views/Agents.vue'),
    meta: {
      name: 'Торговые агенты'
    }
  },
  {
    path: '/agents/:id',
    name: 'agentsEdit',
    component: () => import('@/views/AgentEdit.vue'),
    meta: {
      name: 'Торговые агенты'
    }
  },
  {
    path: '/points',
    name: 'points',
    component: () => import('@/views/Points.vue'),
    meta: {
      name: 'Торговые точки'
    }
  },
  {
    path: '/goods',
    name: 'goods',
    component: () => import('@/views/Goods.vue'),
    meta: {
      name: 'Товары'
    }
  },
  {
    path: '/payment',
    name: 'payment',
    component: () => import('@/views/Payment.vue'),
    meta: {
      name: 'Оплаты'
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/Settings.vue'),
    meta: {
      name: 'Настройки'
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
