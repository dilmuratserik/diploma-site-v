<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      class="custom-navigation"
      color="#363740"
      app
    >
      <v-list dense>
        <div class="d-flex align-center py-4 px-4">
          <img width="50" height="50" src="@/assets/logo.svg" alt="" />
          <h4 class="text-lg-h5 white--text">Galleon Admin</h4>
        </div>
        <div class="menu">
          <router-link
            v-for="(item, i) in items"
            :key="i"
            class="menu__item"
            :class="{ 'menu__item-active': routepath.includes(item.path) }"
            tag="div"
            :to="item.path"
          >
            <v-icon color="#A4A6B3" v-text="item.icon"></v-icon>
            <span style="color: #a4a6b3" v-text="item.text"></span>
          </router-link>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-container fluid>
        <v-row>
          <v-col lg="1">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          </v-col>
          <v-col lg="3">
            <v-toolbar-title style="height: 100%; line-height: 48px">{{
              $route.meta.name
            }}</v-toolbar-title>
          </v-col>
          <v-col lg="8">
            <div class="profile__wrapper">
              <div class="profile">
                <h4 class="profile__title">Galleon</h4>
                <v-avatar class="avatar">
                  <img src="@/assets/logo.svg" alt="avatrt" />
                </v-avatar>
                <button @click="logout">
                  <v-icon>mdi-logout-variant</v-icon>
                </button>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
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
        { text: "Главная страница", icon: "mdi-chart-pie", path: "/dashboard" },
        { text: "Заказы", icon: "mdi-order-bool-ascending", path: "/orders" },
        { text: "Торговые агенты", icon: "mdi-account-tie", path: "/agents" },
        { text: "Торговые точки", icon: "mdi-map-marker", path: "/points" },
        { text: "Товары", icon: "mdi-file-document-edit", path: "/goods" },
        { text: "Оплаты", icon: "mdi-credit-card-outline", path: "/payment" },
        { text: "Визиты", icon: "mdi-clipboard-edit", path: "/visits" },
        { text: "Карта", icon: "mdi-map-check-outline", path: "/maps" },
        { text: "Сообщение", icon: "mdi-email", path: "/messages" },
        {
          text: "Справочники",
          icon: "mdi-format-list-bulleted",
          path: "/directory",
        },
        { text: "Настройки", icon: "mdi-cog-outline", path: "/settings" },
      ],
    };
  },
  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.push("/login");
    },
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
      background: #eceff1;
    }
    &-active {
      border-left: 3px solid #ffffff;
      background: rgba($color: #9fa2b4, $alpha: 0.4);
      span {
        color: #ffffff !important;
      }
      i {
        color: #ffffff !important;
      }
    }
  }
}

.profile__wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  .profile {
    display: flex;
    align-items: center;
    &__title {
      margin-right: 10px;
    }
  }
  .avatar {
    margin-right: 30px;
  }
}
</style>
