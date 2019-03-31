<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col class="left" :span="3">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团">
      </el-col>
      <el-col class="center" :span="15">
        <div class="wrapper">
          <el-input v-model="search"
            @focus="focus"
            @blur="blur"
            @input="input"
            placeholder="搜索商家或地点"></el-input>
          <button class="el-button el-button--primary"><i class="el-icon-search"></i></button>
          <dl v-if="isHotPlace" class="hotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(x,index) in hotPlace" :key="index">{{x}}</dd>
          </dl>
          <dl v-if="isSearchList" class="searchList">
            <dd v-for="(x,index) in searchList" :key="index">{{x}}</dd>
            <dd>牛肉火锅</dd>
            <dd>羊肉火锅</dd>
            <dd>老火锅</dd>
          </dl>
        </div>
        <p class="suggest">
          <a href="#">故宫博物馆</a>
          <a href="#">颐和园</a>
          <a href="#">天安门</a>
        </p>
        <ul class="nav">
          <li><nuxt-link to="/" class="takeout">美团外卖</nuxt-link></li>
          <li><nuxt-link to="/" class="movie">猫眼电影</nuxt-link></li>
          <li><nuxt-link to="/" class="hotel">美团酒店</nuxt-link></li>
          <li><nuxt-link to="/" class="apartment">民宿公寓</nuxt-link></li>
          <li><nuxt-link to="/" class="business">商家入驻</nuxt-link></li>
        </ul>
      </el-col>
      <el-col class="right" :span="6">
        <ul class="security">
          <li><i class="refund"><p class="txt">随时退</p></i></li>
          <li><i class="single"><p class="txt">不满意免单</p></i></li>
          <li><i class="overdue"><p class="txt">过期退</p></i></li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data(){
    return {
      search:'',
      isFocus:false,
      hotPlace:['故宫博物馆','天安门','颐和园'],
      searchList:['重庆火锅','鱼火锅','牛肉火锅']

    }
  },
  computed:{
    isHotPlace:function(){
      return this.isFocus && !this.search
    },
    isSearchList:function(){
      return this.isFocus && this.search
    }
  },
  methods:{
    focus(){
      this.isFocus = true
    },
    blur(){
      let self = this
      setTimeout(() => {
        self.isFocus = false
      }, 200);
    },
    input(){

    }

  }
}
</script>

