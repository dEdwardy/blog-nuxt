<template>
  <div class="user-contaienr">
    <div class="left">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText">
      </el-input>
      <el-tree
        ref="tree"
        class="tree"
        :data="data"
        :props="defaultProps"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
      ></el-tree>
    </div>
    <div class="right">
      <div class="search-panel">
        <el-form :inline="true" :model="form" ref="form" label-width="120px ">
          <el-form-item label="用户名称">
            <el-input v-model="form.username" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="form.phone" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" style="width:200px">
              <el-option label="正常" value="on"></el-option>
              <el-option label="停用" value="off"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="form.createdTime"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:200px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item class="buttons">
            <el-button type="primary" @click="onSubmit" icon="el-icon-refresh"
              >重置</el-button
            >
            <el-button type="primary" @click="onSubmit" icon="el-icon-search"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="content-panel">
        <el-table
          ref="table"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="日期" width="120">
            <template #default="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10,100, 200, 300, 400]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin-system-user",
  layout: "admin",
  data() {
    return {
      currentPage: 1,
      form: {
        username: "",
        phone: "",
        status: "",
        createdTime: ""
      },
      filterText: "",
      data: [
        {
          label: "一级 1",
          id: "1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: []
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted(){
    console.warn(process.env)
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    onSubmit() {},
    handleSelectionChange() {},
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>

<style lang="scss" scoped>
.user-contaienr {
  display: flex;
  .left {
    min-width: 200px;
    .tree{
        margin-top:20px;
    }
  }
  .right {
    flex: 1;
    .search-panel {
      margin: 0 10px 10px 10px;
      .buttons {
        margin-left: 52px;
        & button {
          margin-right: 12px;
        }
      }
    }
    .content-panel {
      .el-pagination {
        margin-top: 20px;
      }
    }
  }
}
</style>
