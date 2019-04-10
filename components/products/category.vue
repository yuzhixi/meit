<template>
  <div class="m-product-categroy">
    <dl class="classic">
      <dt>分类</dt>
      <dt>全部</dt>
      <dd
        v-for="(item,index) in types"
        :key="index"
      >
        <iSelect/>
      </dd>
    </dl>
    <dl class="classic">
      <dt>区域</dt>
      <dt>全部</dt>
      <dd
        v-for="(item,index) in areas"
        :key="index"
      >
        <iSelect/>
      </dd>
    </dl>
  </div>
</template>
<script>
import ISelect from '@/components/changeCity/iselect'
export default {
  components: {
    ISelect
  },
  props: {
    types: {
      type: Array,
      default(){
        return []
      }
    },
    areas: {
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

