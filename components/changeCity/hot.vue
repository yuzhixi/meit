<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市</dt>
      <dd v-for="item in list" :key="item">{{item.name === '市辖区' || item.name === '省直辖县级行政区划'
          ? item.province
          : item.name}}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list:[]
    }
  },
  async mounted(){
    let {status,data:{hots}} = await this.$axios.get('/geo/hotCity')
    if(status == 200){
      this.list = hots
    }
  }
}
</script>

<style lang="scss">
  @import "assets/css/changeCity/hot.scss";
</style>


