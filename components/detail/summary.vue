<template>
  <dl class="m-sum-card">
    <dt>
      <h1>{{ meta.name }}</h1>
      <!-- <el-rate
        v-model="rate"
        disabled /> -->
      <span>4分</span>
      <span>类型￥{{ meta.type }}</span>
      <ul>
        <li @click="openMap(meta.location)">地址：{{ meta.province }}{{ meta.city }}{{ meta.county }}{{ meta.area }}</li>
        <li>电话：{{ meta.tel }}</li>
      </ul>
    </dt>
    <!-- <dd>
      <el-carousel
        height="214px"
        indicator-position="none">
        <el-carousel-item
          v-for="(item,idx) in meta.photos"
          :key="idx">
          <h3><img
            :src="item.url"
            alt="item.title"
            width="100%"
            height="100%"></h3>
        </el-carousel-item>
      </el-carousel>
    </dd> -->
  </dl>
</template>

<script>
export default {
  props: {
    meta: {
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  data() {
    return {
      rate:'',
      sale: 70 + Math.floor(Math.random() * 300)
    }
  },

  methods: {
    openMap: function (location) {

    }
  },
  mounted(){
    console.log('00', this.meta)
  }
}
</script>
