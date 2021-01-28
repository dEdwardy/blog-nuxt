<template>
  <div class="tags-manage">
    tags list
    <div class="operations">
      <el-button
        type="primary"
        @click="handleNew"
      >
        <svg-icon
          icon-class="write-article"
          style="width:16px;height:16px;margin-right:4px"
        />新建标签
      </el-button>

    </div>
    <div class="tags-list">
      <el-table
        :data="tagList"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="名称"
        />
        <el-table-column
          prop="alias"
          label="别名"
        />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="handleUpdate(scope.row)"
              icon="el-icon-edit"
            >{{ $t('system.button.update') }}</el-button>
            <el-button
              type="danger"
              @click="handleDelete(scope.row)"
              icon="el-icon-delete"
            >{{ $t('system.button.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :title="isNew ? '新建标签' :'修改标签'"
      :visible.sync="dialogVisible"
    >
      <el-form
        ref="form"
        style="width:100%"
        :rules="rules"
        inline
        :model="form"
      >
        <el-form-item
          label="名称"
          prop="name"
        >
          <el-input
            style="width:100%"
            v-model="form.name"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="别名"
          prop="alias"
        >
          <el-input
            style="width:100%"
            v-model="form.alias"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleCancel">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSure"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getTags, addTag, updateTag, deleteTag } from '@/api'
export default {
  layout: 'admin',
  data () {
    return {
      isNew: true,
      tagList: [],
      dialogVisible: false,
      form: {
        id: '',
        name: '',
        alias: ''
      },
      rules: {
        name: [{ required: true, trigger: 'blur' }],
        alias: [{ required: true, trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleUpdate (row) {
      this.isNew = false;
      this.form = row;
      this.dialogVisible = true;
    },
    handleDelete (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => deleteTag(row.id).then(() => {
        this.getTags()
        this.$message({
          type: 'success',
          message: this.$t('system.operation.success')
        });
      }).catch(e => e)
      ).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('system.operation.cancel')
        });
      });
    },
    getTags () {
      return getTags().then(({ data }) => {
        this.tagList = data
      })
    },
    handleNew () {
      this.isNew = true
      this.$refs.form && this.$refs.form.resetFields()
      this.dialogVisible = true;
    },
    handleCancel () {
      this.dialogVisible = false;
    },
    handleSure () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.isNew) {
            let {id,...info } = this.form;
            //新建标签
            addTag(info).then(() => {
              this.getTags()
              this.dialogVisible = false
            })
          } else {
            //修改标签
            let { id, ...info } = this.form
            updateTag(id, info).then(() => {
              this.getTags()
              this.dialogVisible = false
            })
          }
        }
      })
    }
  },
  created () {
    this.getTags()
  }
}
</script>

<style lang="scss" scoped>
.tags-manage {
  .operations {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>