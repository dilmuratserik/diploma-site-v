import Vue from "vue";
import Vuex from "vuex";
import Login from "./modules/auth";
import Agents from "./modules/agents";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Login,
    Agents,
  },
});
