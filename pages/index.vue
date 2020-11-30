
  <!-- <div class="container"> -->
    <!-- <div class="icon-select-wrapper">
      <svg-icon v-if="value" :icon-class="value" class="icon icon-current"></svg-icon>
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
            <div class="text" >{{ item }}</div>
          </div>
        </el-option>
      </el-select>
    </div> -->
    <!-- <icon-picker></icon-picker> -->
  <!-- </div> -->


<script>
import iconPicker from '@/components/IconPicker'
export default {
  data() {
    return {
      icons: [],
      value: ""
    };
  },
  components:{
    iconPicker
  },
  render(h){
    return <icon-picker filterable={true}></icon-picker>
  },
  created() {
    let modules = require.context("@/assets/icons/svg", false, /\.svg$/);
    this.icons = modules.keys().map(i => modules(i)?.default?.id.slice(5));
  }
};
</script>

<style lang="scss" scoped>
// /deep/ .el-select-dropdown__wrap.el-scrollbar__wrap {
//   width: 700px;
// }
// .icon {
//   width: 24px;
//   height: 24px;
// }
// /deep/ .el-select-dropdown.el-popper custom-popper.custom-popper {
//   max-width: 700px !important;
//   left: 160px !important;
// }
// .icon-select-wrapper{
//   position:relative;
//   .icon-current{
//     position:absolute;
//     top:8px;
//     right:30px;
//     z-index:888;
//   }
// }
// .text{
//   width:80px;
//   overflow: hidden;
//   text-overflow: ellipsis;
// }
</style>
