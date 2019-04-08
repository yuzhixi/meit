<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <iSelect/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hots/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">3</el-col>
    </el-row>
  </div>
</template>

<script>
import iSelect from '@/components/changeCity/iselect'
import hots from '@/components/changeCity/hot'
export default {
  components: {
    iSelect,
    hots
  }
}
</script>
