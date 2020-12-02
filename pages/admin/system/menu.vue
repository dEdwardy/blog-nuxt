<template>
  <div class="menu-wrapper">
    <div class="search-panel">
      <el-form :inline="true" :model="form" ref="form" label-width=" ">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="菜单状态">
          <el-select v-model="form.status" style="width: 200px">
            <el-option label="正常" value="on"></el-option>
            <el-option label="停用" value="off"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="buttons">
          <el-button type="primary" @click="onReset" icon="el-icon-refresh"
            >重置</el-button
          >
          <el-button type="primary" @click="onSubmit" icon="el-icon-search"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button type="primary" icon="el-icon-plus">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%; margin: 20px 0"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="菜单名称" sortable> </el-table-column>
      <el-table-column prop="icon" label="图标" sortable> </el-table-column>
      <el-table-column prop="sort" label="排序"> </el-table-column>
      <el-table-column prop="staus" label="状态"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
          icon="el-icon-edit"
            >修改</el-button
          >
          <el-button type="text" size="small" icon="el-icon-plus">新增</el-button>
          <el-button type="text" size="small" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "admin-system-menu",
  layout: "admin",
  data() {
    return {
      form: {
        name: "",
        staus: ""
      },
      tableData: [
        {
          id: 1,
          name: "王小虎",
          sort: "2016-05-04",
          icon: "上海市普陀区金沙江路 1518 弄",
          status: "on"
        },
        {
          id: 2,
          sort: "2016-05-04",
          name: "王小虎",
          icon: "上海市普陀区金沙江路 1517 弄",
          status: "on"
        },
        {
          id: 3,
          sort: "2016-05-01",
          name: "王小虎",
          icon: "上海市普陀区金沙江路 1519 弄",
          status: "on",
          children: [
            {
              id: 31,
              sort: "2016-05-01",
              name: "王小虎",
              icon: "上海市普陀区金沙江路 1519 弄",
              status: "on"
            },
            {
              id: 32,
              sort: "2016-05-01",
              name: "王小虎",
              icon: "上海市普陀区金沙江路 1519 弄",
              status: "on"
            }
          ]
        },
        {
          id: 4,
          sort: "2016-05-03",
          name: "王小虎",
          icon: "上海市普陀区金沙江路 1516 弄",
          status: "on"
        }
      ]
    };
  },
  methods: {
    onReset() {
      Object.keys(this.form).forEach(i => (this.form[i] = ""));
    },
    onSubmit() {
      this.$refs.form.valisort(valid => {
        if (valid) {
        }
      });
    },
    handleClick(row){
        console.log(row)
    }
  }
};
</script>

<style>
</style>