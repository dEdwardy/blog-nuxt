<template>
  <div class="menu-wrapper">
    <div class="search-panel">
      <el-form
        :inline="true"
        :model="form"
        ref="form"
        label-width=" "
      >
        <el-form-item label="菜单名称">
          <el-input
            v-model="form.name"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="菜单状态">
          <el-select
            v-model="form.status"
            style="width: 200px"
          >
            <el-option
              label="正常"
              value="on"
            ></el-option>
            <el-option
              label="停用"
              value="off"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="buttons">
          <el-button
            type="primary"
            @click="onReset"
            icon="el-icon-refresh"
          >重置</el-button>
          <el-button
            type="primary"
            @click="onSubmit"
            icon="el-icon-search"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="handleClick(null, 'add')"
      >新增</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%; margin: 20px 0"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        prop="name"
        label="菜单名称"
        sortable
      > </el-table-column>
      <el-table-column
        prop="icon"
        label="图标"
        sortable
      > </el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
      > </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        :formatter="
          (row, column, cellValue, index) => {
            return cellValue ? '正常' : '停用';
          }
        "
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            @click.stop="handleClick(scope.row, 'update')"
            type="text"
            size="small"
            icon="el-icon-edit"
          >修改</el-button>
          <el-button
            type="text"
            size="small"
            icon="el-icon-plus"
            @click.stop="handleClick(scope.row, 'add')"
          >新增</el-button>
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete"
            @click.stop="handleClick(scope.row, 'delete')"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      append-to-body
      width="60%"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-form
        :model="menuForm"
        :rules="menuRules"
        ref="menuForm"
        label-width="100px"
      >
        <el-form-item
          label="上级菜单"
          prop="parentId"
        >
          <treeselect
            v-model="menuForm.parentId"
            @input="validateParent"
            :options="options"
          />
        </el-form-item>
        <el-form-item
          label="菜单类型"
          prop="type"
        >
          <el-radio-group v-model="menuForm.type">
            <el-radio :label="0">目录</el-radio>
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          prop="icon"
        >
          <icon-picker
            style="width: 100%"
            v-model="menuForm.icon"
          ></icon-picker>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="菜单名称"
              prop="name"
            >
              <el-input v-model="menuForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="菜单排序"
              prop="sort"
            >
              <el-input-number
                style="width: 100%"
                v-model="menuForm.sort"
                controls-position="right"
                :min="0"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="是否外联"
              prop="link"
            >
              <el-radio-group v-model="menuForm.link">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="路由地址"
              prop="path"
            >
              <el-input v-model="menuForm.path"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="显示状态"
              prop="show"
            >
              <el-select
                v-model="menuForm.show"
                style="width: 100%"
              >
                <el-option
                  label="正常"
                  :value="true"
                ></el-option>
                <el-option
                  label="停用"
                  :value="false"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="菜单状态"
              prop="status"
            >
              <el-select
                v-model="menuForm.status"
                style="width: 100%"
              >
                <el-option
                  label="正常"
                  value="on"
                ></el-option>
                <el-option
                  label="停用"
                  value="off"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogCancel">取 消</el-button>
          <el-button
            type="primary"
            @click="dialogSure"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import iconPicker from "@/components/IconPicker";
import treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { getMenuTree } from "@/api/system";
export default {
  name: "admin-system-menu",
  layout: "admin",
  components: {
    treeselect,
    iconPicker
  },
  data () {
    return {
      dialogVisible: false,
      dialogTitle: "",
      options: [
        // {
        //   id: "a",
        //   label: "a",
        //   children: [
        //     {
        //       id: "aa",
        //       label: "aa"
        //     },
        //     {
        //       id: "ab",
        //       label: "ab"
        //     }
        //   ]
        // },
        // {
        //   id: "b",
        //   label: "b"
        // },
        // {
        //   id: "c",
        //   label: "c"
        // }
      ],
      form: {
        name: "",
        staus: ""
      },
      menuForm: {
        parentId: "", //上级菜单
        type: "", //菜单类型
        icon: "", //菜单图标
        name: "", //菜单名称
        sort: "", //菜单排序
        status: "", //菜单状态 on off
        show: "", //显示状态  T F
        path: "", //菜单路由
        link: "" //是否外联  Boolean
      },
      tableData: [
        // {
        //   id: 1,
        //   name: "王小虎",
        //   sort: "2016-05-04",
        //   icon: "上海市普陀区金沙江路 1518 弄",
        //   status: "on"
        // },
        // {
        //   id: 2,
        //   sort: "2016-05-04",
        //   name: "王小虎",
        //   icon: "上海市普陀区金沙江路 1517 弄",
        //   status: "on"
        // },
        // {
        //   id: 3,
        //   sort: "2016-05-01",
        //   name: "王小虎",
        //   icon: "上海市普陀区金沙江路 1519 弄",
        //   status: "on",
        //   children: [
        //     {
        //       id: 31,
        //       sort: "2016-05-01",
        //       name: "王小虎",
        //       icon: "上海市普陀区金沙江路 1519 弄",
        //       status: "on"
        //     },
        //     {
        //       id: 32,
        //       sort: "2016-05-01",
        //       name: "王小虎",
        //       icon: "上海市普陀区金沙江路 1519 弄",
        //       status: "on"
        //     }
        //   ]
        // },
        // {
        //   id: 4,
        //   sort: "2016-05-03",
        //   name: "王小虎",
        //   icon: "上海市普陀区金沙江路 1516 弄",
        //   status: "on"
        // }
      ]
    };
  },
  computed: {
    menuRules () {
      return {
        parentId: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择菜单类型", trigger: "change" }
        ],
        icon: [
          { required: true, message: "请选择菜单图标", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        sort: [{ required: true, message: "请选择排序", trigger: "blur" }],
        link: [
          { required: true, message: "请选择是否外链", trigger: "change" }
        ],
        path: [{ required: true, message: "请输入菜单路径", trigger: "blur" }],
        show: [
          { required: true, message: "请选择显示状态", trigger: "change" }
        ],
        status: [
          { required: true, message: "请选择菜单状态", trigger: "change" }
        ]
      };
    }
  },
  methods: {
    treeForeach (tree, func) {
      tree.forEach(data => {
        func(data);
        data.children && this.treeForeach(data.children, func);
      });
    },
    getMenuTree () {
      return getMenuTree().then(({ data }) => {
        this.tableData = data;
        let b = [{ name: "主类目", id: 0, children: data }]
        this.treeForeach(b, item => item.label = item.name);
        this.options = b
        console.log(b)
      });
    },
    validateParent () {
      this.$refs.menuForm && this.$refs.menuForm.validateField("parentId");
    },
    onReset () {
      Object.keys(this.form).forEach(i => (this.form[i] = ""));
    },
    onSubmit () {
      this.$refs.form.valisort(valid => {
        if (valid) {
        }
      });
    },
    handleClick (row, type) {
      if (row) {
        this.menuForm.parentId = row.id;
      }
      this.resetDialogForm();
      switch (type) {
        case "update":
          this.dialogTitle = "修改菜单";
          this.dialogVisible = true;

          break;
        case "add":
          this.dialogTitle = "添加菜单";
          this.dialogVisible = true;

          break;
        default:
          break;
      }
    },
    handleClose () {
      this.dialogVisible = false;
    },
    dialogSure () {
      console.log(this.menuForm);
      if (this.dialogTitle == "修改菜单") {
        //修改菜单
        this.$refs.menuForm.validate(valid => {
          if (valid) {
            this.dialogVisible = false;
          }
        });
      } else {
        //添加菜单
        this.$refs.menuForm.validate(valid => {
          if (valid) {
            this.dialogVisible = false;
          }
        });
      }
      //后续加了验证  使用form 的 clearFields()方法
      // Object.keys(this.menuForm).forEach( i => this.menuForm[i] = '')
    },
    dialogCancel () {
      console.log(this.menuForm);
      this.dialogVisible = false;
    },
    resetDialogForm () {
      this.$nextTick(() => {
        //后续加了验证  使用form 的 clearFields()方法
        this.$refs.menuForm && this.$refs.menuForm.resetFields();
        Object.keys(this.menuForm).forEach(i => (this.menuForm[i] = null));
      });
    }
  },
  mounted () {
    this.getMenuTree();
  }
};
</script>

<style></style>
