<template>
  <div class="container">
    <aside class="aside">
      <div style="text-align: center">
        <svg-icon
          icon-class="logo-b"
          v-show="!isCollapse"
          style="width: 120px; height: 40px; padding: 10px"
        ></svg-icon>
        <svg-icon
          icon-class="logo-b"
          v-show="isCollapse"
          style="width: 40px; height: 40px; padding: 10px"
        ></svg-icon>
      </div>
      <div
        @click="isCollapse = !isCollapse"
        style="width: 20px; height: 20px; cursor: pointer"
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
        background-color="#263445"
        text-color="#fff"
        active-text-color="rgb(24,144,255)"
      >
        <el-submenu
          v-for="item of routes"
          :key="item.path"
          :index="'admin/' + item.path"
        >
          <template slot="title">
            <svg-icon
              :icon-class="item.meta.icon"
              style="position: relative; top: 2px"
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
                  :icon-class="i.meta.icon"
                  style="position: relative; top: 2px"
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isCollapse: false,
      mockRoutes: [
        {
          meta: {
            icon: "system",
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
  },
  computed: {
    ...mapGetters(["routes"]),
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
$asideWidth: 200px;
$asideBgColor: #fff;
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .aside {
    background-color: #263445;
    color: #fff;
    max-width: $asideWidth;
    & .max {
      width: 200px;
      min-width: 200px;
    }
    & .min {
      width: 60px;
      min-width: 60px;
    }
  }
  .right {
    flex: 1;
    .header {
      height: $headerHeight;
    }
    .main {
      padding: 20px;
      height: calc(100% - #{$headerHeight+40px});
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
  ul {
    // background-color:#aaa;
    li {
      // color: #fff;
      &:hover {
        // background-color: rgb(48, 65, 86);
      }
    }
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
