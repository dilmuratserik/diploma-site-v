import session from "../../api/session";

export default {
  actions: {
    login({  }, data) {
      return session.login(data);
    },
  },
};
