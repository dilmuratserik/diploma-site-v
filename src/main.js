import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import * as VueGoogleMaps from "vue2-google-maps";

if (sessionStorage.token) {
  axios.defaults.headers.common['Authorization'] = 'Token ' + sessionStorage.token
}

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBTq4UB_JzPmva_MUMtRcs37zUziNySK-Q',
    libraries: 'places',
  }
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
