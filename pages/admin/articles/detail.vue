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
      <el-button @click="submit">发布</el-button>
      </div>
    </div>
    <el-row class="editor">
      <el-col :span="showPreview ? 12 :24">
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
        v-show="showPreview"
        :span="12"
      >
        <div class="ql-container preview ql-snow">
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
    transition: all 2s;
    .quill-editor {
      width: 100%;
      min-height: 410px;
      // flex: 1;
    }
    .preview {
      min-height: 500px;
    }
  }
}
</style>