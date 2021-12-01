<template>
  <div>
    <v-navigation-drawer class="custom-navigation" v-model="drawer" app>
      <v-list dense>
        <div class="py-4 px-4">
          <h4 class="text-lg-h5">Galleon Admin</h4>
        </div>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            @click="$router.push(item.path)"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
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
      drawer: null,
      selectedItem: 0,
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
</style>
