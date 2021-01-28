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
         <el-table-column
          label="操作"
          >
          <template slot-scope="scope"> 
            <el-button @click="handleUpdate(scope.row)">修改</el-button>
            <el-button  @click="handleDelete(scope.row)">删除</el-button>
          </template>
         </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="新建标签"
      :visible.sync="dialogVisible"
    >
      <el-form
        ref="form"
        style="width:100%"
        :rules="rules"
        inline
        :model="form"
      >
        <el-form-item label="名称" prop="name">
          <el-input style="width:100%" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="别名" prop="alias">
          <el-input  style="width:100%" v-model="form.alias"></el-input>
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
import { getTags, addTag } from '@/api'
export default {
  layout: 'admin',
  data () {
    return {
      tagList: [],
      dialogVisible: false,
      form:{
        id:'',
        name:'',
        alias:''
      },
      rules:{
        name:[{ required:true, trigger: 'blur'}],
        alias:[{ required:true, trigger: 'blur'}]
      }
    }
  },
  methods: {
    handleUpdate(row){
      this.form = row;
      this.dialogVisible = true;
    },
    handleDelete(row){
      console.log(row)
    },
    getTags () {
      return getTags().then(({ data }) => {
        this.tagList = data
      })
    },
    handleNew () {
      this.$refs.form && this.$refs.form.resetFields()
      this.dialogVisible = true;
    },
    handleCancel(){
      this.dialogVisible = false;
    },
    handleSure(){
      this.$refs.form.validate(valid => {
        if(valid){
          addTag(this.form).then(res => {
            this.getTags()
            this.dialogVisible = false
          })
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