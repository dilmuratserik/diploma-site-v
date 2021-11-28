import session from "../../api/session";

export default {
  actions: {
    login({ commit }, data) {
      console.log(commit, data);
      return session.login(data)
    }
  }
}