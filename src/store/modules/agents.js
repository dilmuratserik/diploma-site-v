import session from "../../api/session";

export default {
  state: {
    agents: [],
  },
  mutations: {
    SET_AGENTS(state, data) {
      state.agents = data;
    },
  },
  actions: {
    getAgents({ commit }) {
      return session
        .getAgents()
        .then((res) => {
          console.log(res.data.results);
          commit("SET_AGENTS", res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    getAgentsList: (state) => {
      return state.agents;
    },
  },
};
