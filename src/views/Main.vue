<template>
  <div>
    <v-navigation-drawer v-model="drawer" class="custom-navigation" app>
      <v-list dense>
        <div class="py-4 px-4">
          <h4 class="text-lg-h5">Galleon Admin</h4>
        </div>
        <div class="menu">
          <router-link v-for="(item, i) in items" :key="i" class="menu__item" :class="{'menu__item-active' : routepath === item.path}" tag="div" :to="item.path">
            <v-icon v-text="item.icon"></v-icon>
            <span v-text="item.text"></span>
          </router-link>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ $route.meta.name }}</v-toolbar-title>
    </v-app-bar>

    <div class="container-custom">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      drawer: true,
      routepath: this.$route.path,
      items: [
        { text: "Главная страница", icon: "mdi-chart-pie", path: "/" },
        { text: "Заказы", icon: "mdi-order-bool-ascending", path: "/orders" },
        { text: "Торговые агенты", icon: "mdi-account-tie", path: "/agents" },
        { text: "Торговые точки", icon: "mdi-map-marker", path: "/points" },
        { text: "Товары", icon: "mdi-file-document-edit", path: "/goods" },
        { text: "Оплаты", icon: "mdi-credit-card-outline", path: "/payment" },
        { text: "Визиты", icon: "mdi-clipboard-edit", path: "/visits" },
        { text: "Карта", icon: "mdi-map-check-outline", path: "/map" },
        { text: "Сообщение", icon: "mdi-email", path: "/messages" },
        { text: "Настройки", icon: "mdi-cog-outline", path: "/settings" },
      ],
    };
  },
};
</script>

<style lang="scss">
.v-main__wrap {
  background: #eef3f1;
}
// .custom-navigation {
//   background: #363740!important;
// }

.menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0;
  width: 100%;
  .menu__item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 10px 30px;
    cursor: pointer;
    i {
      margin-right: 15px;
    }
    &:focus {
      background: #ECEFF1;
    }
    &-active {
      background: #1E88E5;
    }
  }
}
</style>
