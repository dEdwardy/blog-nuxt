<template>
  <div class="container">
    <aside class="aside">
      <div
        style="display:flex;justify-content:center;align-items:center;cursor:pointer"
      >
        <svg-icon
          icon-class="add"
          style="width:20px;height:20px;color:red;padding: 10px"
        ></svg-icon>
      </div>
      <div
        @click="isCollapse = !isCollapse"
        style="width:20px;height:20px;cursor:pointer"
      >
        change
      </div>
      <el-menu
        ref="menu"
        :class="toggleClass"
        :default-openeds="['1', '3']"
        :collapse="isCollapse"
        scollapse-transition
        unique-opened
      >
        <el-submenu
          v-for="item of mockRoutes"
          :key="item.path"
          :index="'admin/' + item.path"
        >
          <template slot="title">
            <svg-icon
              :icon-class="item.meta.icon"
              style="position:relative;top:2px;"
            ></svg-icon>
            <span v-show="!isCollapse">{{ item.meta.title }}</span>
          </template>
          <nuxt-link
            v-for="i of item.children"
            :key="i.path"
            :to="{ name: 'admin-' + item.path + '-' + i.path }"
          >
            <el-menu-item :index="'admin/' + item.path + '/' + i.path">
              <template slot="title">
                <svg-icon
                  :icon-class="item.meta.icon"
                  style="position:relative;top:2px;"
                ></svg-icon>
                {{ i.meta.title }}
              </template>
            </el-menu-item>
          </nuxt-link>
        </el-submenu>
      </el-menu>
    </aside>
    <div class="right">
      <header class="header">header</header>
      <main class="main">
        <Nuxt />
      </main>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: false,
      mockRoutes: [
        {
          meta: {
            icon: "add",
            title: "系统管理"
          },
          name: "system",
          path: "system",
          children: [
            {
              meta: {
                icon: "add",
                title: "用户管理"
              },
              name: "user",
              path: "user"
            },
            {
              meta: {
                icon: "add",
                title: "角色管理"
              },
              name: "role",
              path: "role"
            },
            {
              meta: {
                icon: "add",
                title: "菜单管理"
              },
              name: "menu",
              path: "menu"
            }
          ]
        }
      ]
    };
  },
  computed: {
    toggleClass() {
      if (this.isCollapse) {
        return "min";
      } else {
        return "max";
      }
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
$headerHeight: 48px;
$headerBgColor: rgba(0, 0, 0, 0.4);
$asideWidth: 64px;
$asideBgColor: #fff;
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .aside {
    border-right: 1px solid #eee;
    min-width: $asideWidth;
    overflow: hidden;
    & .max {
      width: 200px;
    }
    & .min {
      width: 60px;
    }
  }
  .right {
    flex: 1;
    .header {
      height: $headerHeight;
    }
    .main {
      padding: 10px;
      height: calc(100% - #{$headerHeight+20px});
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
::v-deep .horizontal-collapse-transition {
  transition: 0s width ease-in-out, 0s padding-left ease-in-out,
    0s padding-right ease-in-out;
}
::v-deep .el-menu {
  border-right: none;
}
.svg-icon {
  width: 20px;
  height: 20px;
}
</style>
<style lang="scss">
.custom-popper {
  max-width: 400px;
  & ul {
    display: flex !important;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap !important;
  }
}
a {
  text-decoration: none;
}
 
.router-link-active {
  text-decoration: none;
}
</style>
