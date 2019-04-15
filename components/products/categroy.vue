<template>
  <div class="m-product-categroy">
    <dl class="classic">
      <dt>分类</dt>
      <dt>全部</dt>
      <dd
        v-for="(item,index) in types"
        :key="index"
      >
        <ISelect :name='item.type' :list='item.module'/>
      </dd>
    </dl>
    <dl class="classic">
      <dt>区域</dt>
      <dt>全部</dt>
      <dd
        v-for="(item,index) in areas"
        :key="index"
      >
        <ISelect :name='item.type' :list='item.module'/>
      </dd>
    </dl>
  </div>
</template>
<script>
import ISelect from './iselect'
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
  },
  mounted(){
  }
}
</script>

