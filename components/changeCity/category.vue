<template>
  <div class="">
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="item in list" :key="item">
        <a :href="'#city-'+item" >{{item}}</a>
      </dd>
    </dl>
    <dl v-for="item in block" :key="item.title+'1'" class="m-categroy-section">
      <dt :id="'city-'+item.title">{{item.title}}</dt>
      <dd>
        <span v-for="c in item.city" :key="c">{{c}}</span>
      </dd>
    </dl>
  </div>
</template>
<script>
import jspinyin from 'js-pinyin'
export default {
  data(){
    return {
      list:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      block:[]
    }
  },
  async mounted(){
    let {status,data:{city}} = await this.$axios.get('geo/city')
    let p = ''
    let c = 0
    let b = {}
    if(status == 200){
      city.forEach(item => {
        p = jspinyin.getFullChars(item.name).toLocaleUpperCase().slice(0,1)
        c = p.charCodeAt(0)
        if(c>64 && c<91){
          if(!b[p]){
            b[p] = []
          }
          b[p].push(item.name)
        }
      })
      for(let [key,value] of Object.entries(b)){
          this.block.push({
            title:key,
            city:value
          })
        }
    }
  }
}
</script>
<style lang="scss">

  @import "assets/css/changeCity/categroy.scss";
</style>

