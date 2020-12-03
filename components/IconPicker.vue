<!-- <svg-icon
      v-if="value"
      :icon-class="value"
      class="icon icon-current"
    ></svg-icon>
    <el-select
      class="icon-select"
      filterable
      clearable
      popper-class="custom-popper"
      v-model="value"
    >
      <el-option
        style="height:auto;line-height:auto;float:left;padding:20px;margin:10px 0"
        v-for="(item, idx) of icons"
        :value="item"
        :key="idx"
      >
        <div :title="item" style="text-align:center">
          <svg-icon :icon-class="item" class="icon"></svg-icon>
          <div class="text">{{ item }}</div>
        </div>
      </el-option>
    </el-select> -->

<script>
export default {
  data() {
    return {
      icons: [],
    };
  },
  props: {
    filterable: {
      type: Boolean,
      default: false
    },
    value:{
      type: String
    }
  },
  computed:{
    value_:{
      get(){
        return this.value
      },
      set(val){
        this.$emit('input',val)
      }
    }
  },
  render(h, context) {
    let showCurrent = this.value ? (
      <svg-icon icon-class={this.value} class="icon icon-current"></svg-icon>
    ) : (
      ""
    );
    let options = this.icons.map((item, index) => {
      return (
        <el-option
          style="height:auto;line-height:auto;padding:20px;margin:10px 0;"
          value={item}
          {...{on :{'update:value':val => this.value = val}}}
          key={index}
        >
          <div title={item} style="text-align:center">
            <svg-icon icon-class={item} class="icon"></svg-icon>
            <div class="text">{item}</div>
          </div>
        </el-option>
      );
    });
    return (
      <div class="icon-select-wrapper ">
        {showCurrent}
        <el-select
          className="icon-select"
          popper-append-to-body
          clearable
          filterable
          onClear={() => this.handleClear()}
          popper-class="custom-popper"
          style="width:100%"
          value={this.value_}
          onChange={e => {
            this.$emit('input',e)
          }}
          {...this.props}
          // vModel={ this.value }   //vue-cli4支持了vModel语法糖
        >
          {options}
        </el-select>
      </div>
    );
  },
  methods: {
    handleClear() {
      console.log("clea..........r");
    }
  },
  created() {
    let modules = require.context("@/assets/icons/svg", false, /\.svg$/);
    this.icons = modules.keys().map(i => modules(i)?.default?.id.slice(5));
  }
};
</script>

<style lang="scss" scoped>
::v-deep input.el-input__inner {
  padding-right: 60px !important;
}
.icon-select-wrapper {
  display: inline-block;
  position: relative;
  .icon-current {
    position: absolute;
    top: 8px;
    right: 34px;
    z-index: 888;
  }
}
::v-deep .el-select-dropdown__wrap .el-scrollbar__wrap {
  width: 700px;
}
.icon {
  width: 24px;
  height: 24px;
}
.text {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
