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
      <div style="height: 20px;display:flex;justify-content:flex-end;padding:0 20px">
        <svg-icon
          @click.native="isCollapse = !isCollapse"
          icon-class="collapse"
          style="color:#fff; cursor: pointer;"
        />
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
          v-for="item of [...routes,...others]"
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
            :to="{ path: '/admin/' + item.path + '/' + i.path }"
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
      <header class="header">
        <div>2</div>
        <div>{{ $t('home.title') }}</div>
        <el-dropdown @command="toggleLang">
          <span class="el-dropdown-link">
            {{ $t('header.lang') }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              :command="item"
              v-for="item of locales"
              :class="item == $store.state.localStorage.locale ? 'active':''"
              :key="item"
            >{{ $t(`header.${item}`) }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </header>
      <main :class="isCollapse ? 'main collapse' : 'main'">
        <Nuxt />
      </main>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data () {
    return {
      isCollapse: false,
      others: [
        {
          meta: {
            icon: 'article',
            title: "文章管理"
          },
          name: 'articles',
          path: 'articles',
          children: [
            {
              meta: {
                icon: "collapse",
                title: "文章列表"
              },
              name: "list",
              path: "list"
            },
            {
              meta: {
                icon: "write-article",
                title: "写文章"
              },
              name: "write",
              path: "detail"
            },

          ]
        },
        {
          meta: {
            icon: 'tag',
            title: "标签管理"
          },
          name: 'tags',
          path: 'tags',
          children: [
            {
              meta: {
                icon: "collapse",
                title: "标签列表"
              },
              name: "tag-list",
              path: "list"
            },
            {
              meta: {
                icon: "write-article",
                title: "新建标签"
              },
              name: "tag-detail",
              path: "detail"
            },

          ]
        }
      ],
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
    ...mapGetters(['routes', 'locales', 'locale']),
    toggleClass () {
      if (this.isCollapse) {
        return "min";
      } else {
        return "max";
      }
    }
  },
  methods: {
    toggleLang (locale) {
      // console.log(lang === this.locale)
      // console.log(this.$$store)
      // if (lang === this.locale) return
      if (locale == this.locale) return
      this.$store.commit('SET_LANG', locale)
      this.$store.commit('localStorage/SET_LANG', locale)
      this.$i18n.locale = locale;
    }
  },
  created () {
    let storage = this.$store.state.localStorage
    if (storage && storage.locale) {
      this.$store.commit('SET_LANG', storage.locale)
      this.$i18n.locale = storage.locale;
    }
  }
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
    width: 100%;
    .header {
      padding: 0 16px;
      height: $headerHeight;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      & div {
        margin-left: 20px;
      }
    }
    .main {
      padding: 20px;
      height: calc(100% - #{$headerHeight+40px});
      width: calc(100vw - 200px - 40px);
      overflow-y: scroll;
      &.collapse{
        width: calc(100vw - 60px - 40px);
      }
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
::v-deep li.el-dropdown-menu__item.active {
  color: #263445 !important;
  font-size: 18px;
  font-weight: bold;
}
::v-deep li.el-dropdown-menu__item.active::before {
  content: '>';
  color: #263445;
}
.svg-icon {
  width: 20px;
  height: 20px;
}
::v-deep .el-dropdown:foucs {
  outline: none !important;
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
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: #f5f5f5;

}
</style>
