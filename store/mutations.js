export const mutations = () => ({
  SET_USER_INFO(state, { user }) {
    state.user = user || {};
  },
  SET_ROUTES(state, { rotues }) {
    state.rotues = rotues || [];
  }
});
