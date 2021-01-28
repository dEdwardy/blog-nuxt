<template>
  <div class="article-detail">
    article detail
    <div class="buttons">
      <div>
        <el-switch
        v-model="showPreview"
        @change="toggle"
        active-text="开启预览"
        inactive-text="关闭预览"
      >
      </el-switch>
      </div>
      <!-- <el-button @click="preview">预览</el-button> -->
      <div>
      <el-button @click="save">保存</el-button>
      <el-button @click="submit">发布</el-button>
      </div>
    </div>
    <el-row class="editor">
      <el-col class="left" :span="showPreview ? 12 :24">
        <div
          class="quill-editor"
          :content="content"
          @change="onEditorChange($event)"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
          v-quill:myQuillEditor="editorOption"
        >
        </div>
      </el-col>
      <el-col
        class="right"
        v-show="showPreview"
        :span="12"
      >
        <div class="ql-container ql-snow preview">
          <div
            class="ql-editor"
            v-html="content"
          >
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  layout: 'admin',
  data () {
    return {
      content: '',
      showPreview: false,
      editorOption: {
        placeholder:'请输入'
      },
    }
  },
  methods: {
    toggle(value){
      this.showPreview = value
    },
    preview () {
      this.showPreview = !this.showPreview
    },
    save () {
      if(!this.content)return;
    },
    submit () {
      if(!this.content)return;
    },
    onEditorBlur (editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus (editor) {
      editor.focus()
      console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange ({ html, text }) {
      console.log('editor change!', html, text)
      this.content = html
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
.article-detail {
  width: 100%;
  .buttons{
    display: flex;
    justify-content: flex-end;
    align-items:center;
    padding: 10px 0;
    & > div{
      margin-left:20px;
    }
  }
  .editor {
      overflow: hidden;
    width: 100%;
    transition: all 2s;
    .quill-editor {
      width: 100%;
      flex: 1;
      overflow: hidden;
    }
    .preview {
      height: 100%;
      flex:1;
      overflow: hidden;
    }
  }
}
.left,.right{
  min-height: 500px;
  display: flex;
  flex-direction: column;
}
</style>