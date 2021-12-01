// import session from "../../api/session";

// export default {
//     state: {
//       points: [],
//     },
//     mutations: {
//       SET_POINTS(state, data) {
//         state.points = data;
//       },
//     },
//     actions: {
//       getPoints({ commit }) {
//         return session
//           .getPoints()
//           .then((res) => {
//             console.log(res);
//             // commit("SET_AGENTS", res.data.results);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       },
//     },
//     getters: {
//       getPointsList: (state) => {
//         return state.points;
//       },
//     },
//   };