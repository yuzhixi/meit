<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword"/>
      <categroy
        :types="types"
        :areas="areas"/>
      <list :list="list"/>
    </el-col>
    <el-col :span="5">
      <!-- <amap
        v-if="point.length"
        :width="230"
        :height="290"
        :point="point"/> -->
    </el-col>
  </el-row>

</template>

<script>
import Crumbs from '@/components/products/crumbs.vue'
import Categroy from '@/components/products/categroy.vue'
import List from '@/components/products/list.vue'
import Amap from '@/components/public/map.vue'
export default {
  components:{
    Crumbs,
    Categroy,
    List,
    Amap
  },
  data(){
    return {
      // list:[],
      // types:[],
      // areas:[],
      // keyword:'',
      // point:[]
    }
  },
  async asyncData(ctx){
    let keyword = ctx.query.keyword
    let city = '三亚市'||ctx.store.state.geo.position.city
    let {status,data:{count,pois}} = await ctx.$axios.get('/search/resultsByKeywords',{
      params:{
        keyword,
        city
      }
    })
    console.log('888', count)
    let {status:status2,data:{areas,types}} = await ctx.$axios.get('/categroy/crumbs',{
      params:{
        city:'宜昌市'
      }
    })
    if(status===200&&count>0&&status2==200){
      console.log(111)
      return {
        list: pois.filter(item=>item.name).map(item=>{
          return {
            type: item.type,
            name: item.name,
            comment: Math.floor(Math.random()*100000),
            rate: Math.floor(Math.random()*1000),
            price: Math.floor(Math.random()*10000),
            scene: item.longtide,
            tel: item.tel,
            status: item.add,
            location: item.area,
            module: item.module
          }
        }),
        keyword,
        areas: areas.filter(item=>item.type!=='').slice(0,5),
        types: types.filter(item=>item.type!=='').slice(0,5),
        point: ['','']
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/products/index.scss";
</style>
