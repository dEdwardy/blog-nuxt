<template>
  <div class="container">
    <aside class="aside">
      <div
        style="display:flex;justify-content:center;align-items:center;padding:20px 10px;cursor:pointer"
      >
        <svg-icon
          icon-class="add"
          style="width:20px;height:20px;color:red"
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
        @open="handleOpen"
        unique-opened
      >
        <el-submenu
          v-for="(item, index) of mockRoutes"
          :key="index"
          :index="item.path"
        >
          <template slot="title">
            <svg-icon :icon-class="item.icon"></svg-icon>
            {{ item.name }}
          </template>
          <el-menu-item
            v-for="(i, idx) of item.children"
            :key="idx"
            :index="i.path"
            >{{ i.name }}</el-menu-item
          >
        </el-submenu>

        <!-- <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i></template>
          <el-menu-item-group>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu> -->
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
          icon: "add",
          name: "",
          path: "1-0",
          children: [
            {
              icon: "add",
              name: "1-1",
              path: "1-1"
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
  methods: {
    handleOpen(e) {
      console.log(e);
    }
  }
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
  max-width:400px;
  & ul {
    display: flex !important;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap !important;
    li{
      width:33.3%;
    }
  }
}
</style>
