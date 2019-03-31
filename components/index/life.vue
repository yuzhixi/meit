<template>
    <div class="m-life">
        <el-row>
            <el-col :span="14">
                <slider/>
            </el-col>
            <el-col :span="4">
                <div class="m-life-pic">
                    <!-- <img src="http://p0.meituan.net/codeman/e473bb428f070321269b23370ff02ba956209.jpg" alt=""> -->
                </div>
            </el-col>
            <el-col :span="6">
                <div class="m-life-login">
                    <h4>
                        <img src="//s0.meituan.net/bs/fe-web-meituan/2d05c2b/img/avatar.jpg" alt="">
                    </h4>
                    <p class="m-life-login-name">Hi!你好</p>
                    <p>
                        <nuxt-link to="/register">
                            <el-button round size="medium">注册</el-button>
                        </nuxt-link>
                    </p>
                    <p>
                        <nuxt-link to="/login">
                            <el-button round size="medium">立即登录</el-button>
                        </nuxt-link>
                    </p>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="7">
                <div class="m-life-hotel">
                    <!-- <img src="http://p1.meituan.net/codeman/8cce56c467a17e04f3094d1e455462a0132772.png" alt=""> -->
                </div>
            </el-col>
            <el-col :span="7">
                <div class="m-life-music">
                    <!-- <img src="http://p1.meituan.net/codeman/16442c19da1f1c4544f794e29d99c92051716.jpg" alt=""> -->
                </div>
            </el-col>
            <el-col :span="4">
                <div class="m-life-coop">
                    <!-- <img src="http://p1.meituan.net/codeman/5b21cddb4bb1cbc3a9c3bce0f726c75940469.jpg" alt=""> -->
                </div>
            </el-col>
            <el-col :span="6">
                <div class="m-life-downapp">
                    <img src="//s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png" alt="下载APP">
                    <p>美团App手机版</p>
                    <h4><span class="red">1元起</span><em class="gary">吃喝玩乐</em></h4>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Slider from './slider'
export default {
    components:{
        Slider
    }
}
</script>

<style lang="scss">
    @import "assets/css/index/life.scss"
</style>

