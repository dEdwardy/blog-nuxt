const initialState = {
  user: {
    username: "Edw4rd",
    password: "123456",
    sex: "male",
    phone: "18183033451"
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
  ]
};

export const state = () => initialState;

export const getters = {
  user: state => state.user,
  routes: state => state.routes
};

