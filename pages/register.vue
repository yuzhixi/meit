<template>
    <div class="page-register">
        <article class="header">
            <header>
                <a href="/" class="site-logo"></a>
                <span class="login">
                    <em class="bold">已有美团账号？</em>
                    <a href="/login">
                        <el-button
                            type="primary"
                            size="small"
                        >登录</el-button>
                    </a>

                </span>
            </header>
        </article>
        <section>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="昵称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                    <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
                    <span class="status">{{statusMsg}}</span>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                   <el-input v-model="form.code" maxlength="4"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                   <el-input v-model="form.pwd" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="cpwd">
                   <el-input v-model="form.cpwd" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="register">同意一下协议并注册</el-button>
                    <div class="error">{{error}}</div>
                </el-form-item>
                <el-form-item>
                    <a class="f1" href="http://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
                </el-form-item>

            </el-form>
        </section>

    </div>
</template>
<script>
import CryptoJS from 'crypto-js'  //加密包，有包含md5在内的多种加密方式
import { timeout } from 'q';
export default {
    layout:'blank',
    data(){
        return {
            statusMsg:'',
            error:'',
            form:{
                name:'',
                code:'',
                pwd:'',
                cpwd:'',
                email:''
            },
            rules:{
                name:[{
                    required:true,
                    type:'string',
                    message:'请输入昵称',
                    trigger:'blur'
                }],
                email:[{
                    required:true,
                    type:'email',
                    message:'请输入邮箱',
                    trigger:'blur',
                }],
                pwd:[{
                    required:true,
                    message:'创建密码',
                    trigger:'blur',
                },{
                    validator:(rule,value,callback)=>{
                        if(value===''){
                            callback(new Error('请再次输入密码'))
                        }else if(value!==this.form.pwd){
                            callback(new Error('两次输入密码不一致'))
                        }else{
                            callback()
                        }
                    },
                    trigger:'blur'
                }]
            }
        }
    },
    methods:{
        sendMsg(){
            const self = this
            let namePass;
            let emailPass;
            if (self.timerid) {
                console.log('验证码已发送',self.timerid)
                return false
            }
            // 有返回值，则说明校验未通过，errorMsg
            this.$refs['form'].validateField('name', (valid) => {
                debugger
                namePass = valid
            })
            self.statusMsg = ''
            if (namePass) {
                return false
            }
            this.$refs['form'].validateField('email', (valid) => {
                emailPass = valid
            })
            if (!namePass && !emailPass) {
                self.$axios.post('/users/verify', {
                    username: encodeURIComponent(self.form.name),   // 对中文进行编码
                    email: self.form.email
                }).then(({
                    status,
                    data
                }) => {
                    if (status === 200 && data && data.code === 0) {
                        let count = 60;
                        self.statusMsg = `验证码已发送,剩余${--count}秒`
                        clearInterval(self.timerid)
                        self.timerid = setInterval(function () {
                            self.statusMsg = `验证码已发送,剩余${--count}秒`
                            if (count === 0) {
                                self.statusMsg = ``
                                clearInterval(self.timerid)
                                clearInterval(self.timerid)
                                console.log('清除定时器')
                            }
                        }, 1000)
                    } else {
                        self.statusMsg = data.msg
                    }
                })
            }
        },
        register(){
            let self = this
            debugger
            this.$refs['form'].validate((valid)=>{
                if(valid){
                    self.$axios.post('/users/signup',{
                        username:window.encodeURIComponent(self.form.name),
                        //用md5加密，MD5（此处必须大写）处理后得到的是一个数组，需转换为字符串
                        password:CryptoJS.MD5(self.form.pwd).toString(),
                        email:self.form.email,
                        code:self.form.code
                    }).then(({status,data})=>{
                        if(status ===200){
                            if(data && data.code ===0){
                                location.href = '/login'
                            }else{
                                self.error = data.msg
                            }
                        }else{
                            self.error = `服务器出错，错误码：${status}`
                        }
                        setTimeout(function(){
                            self.error = ''
                        },1500)
                    })
                }
            })
        }
    },
    mounted(){

    }

}
</script>

<style lang="scss">
@import "assets/css/register/index.scss"
</style>


