<template>
  <div class="m-iselect">
    <span class="name">按省份选择：</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="cvalue" placeholder="城市">
      <el-option
        v-for="item in city"
        :disabled="!city.length"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="拼音"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  data(){
    return {
      pvalue: '',
      province: [],
      cvalue: '',
      city: [],
      input:'',
      cities: []
    }
  },
  watch: {
    //监听省份来获取城市的数据
    pvalue: async function (newPvalue) {
      let self = this
      let {status, data:{city}} = await  this.$axios.get(`/geo/province/${newPvalue}`)
      if(status == 200){
        self.city = city.map(item =>{
          return {
            value:item.id,
            label:item.name
          }
        })
        self.cvalue = ''
      }
    }
  },
  mounted: async function(){
    //页面加载就需准备好省份的数据
    let self = this
    let {status,data:{province}} = await this.$axios.get('/geo/province')
    if(status == 200){
      this.province = province.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
  },
  methods: {
    querySearchAsync:_.debounce(async function(query,callback){
      let self = this
      if(self.cities.length){
        callback(self.cities.filter(item => item.value.indexOf(query)>-1))
      }else{
        let {status,data:{city}} = await self.$axios.get('/geo/city')
        if(status === 200){
          self.cities = city.map(item => {
            return {
              value: item.name
            }
          })
          callback(self.cities.filter(item => item.value.indexOf(query)>-1))
        }else{
          callback([])
        }
      }
    },200),
    handleSelect(item){
      console.log(item.value)
    }
  }
}
</script>
<style lang="scss">
  @import "assets/css/changeCity/iselect.scss";
</style>


