export default {
    //设置数据库地址
    dbs:'mongodb://127.0.0.1:27017/student',
    redis:{
        //设置只读，主机和端口
        get host(){
            return '127.0.0.1'
        },
        get port(){
            return 6379
        }
    },
    smtp:{
        //使用腾讯邮箱发送验证码服务
        get host (){
            return 'smtp.qq.com'
        },
        get user(){
            return '****'
        },
        //生成授权码
        get pass(){
            return '*****'
        },
         //设置4位验证码
        get code(){
          return ()=>{
              return Math.random().toString(16).slice(2,6).toUpperCase()
          }
        },
        //设置验证码过期时间位1分钟
        get expire(){
            return ()=>{
                return new Date().getTime+60*60*1000
            }
        }
    },

}
