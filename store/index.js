const initialState = {
  user: {
    username: "Edw4rd",
    password: "123456",
    sex: "male",
    phone: "18183033451",
    token:''
  },
  routes: [
    {
      meta: {
        icon: "settings",
        title: "系统管理"
      },
      name: "system",
      path: "system",
      children: [
        {
          meta: {
            icon: "user",
            title: "用户管理"
          },
          name: "user",
          path: "user"
        },
        {
          meta: {
            icon: "users",
            title: "角色管理"
          },
          name: "role",
          path: "role"
        },
        {
          meta: {
            icon: "menu",
            title: "菜单管理"
          },
          name: "menu",
          path: "menu"
        }
      ]
    }
  ],
  locales: ["zh-CN", "en-US"],
  locale: "zh-CN"
};

export const state = () => initialState;

export const getters = {
  user: state => state.localStorage.user || state.user,
  token: state => state.localStorage.token || state.token,
  routes: state => state.localStorage.routes || state.routes,
  locales: state =>  state.localStorage.locales || state.locales,
  locale: state =>  state.locale,
};
export const mutations = {
  SET_USER_INFO(state, { user }) {
    state.user = user || {};
  },
  SET_ROUTES(state, { rotues }) {
    state.rotues = rotues || [];
  },
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  }
};
export const actions = {
  async setRotues({ commit }, routes) {
    commit("SET_ROUTES", routes);
  }
};
