import axios from 'axios'

//创建实例，判断当前环境变量的主机，HOST不存在就取localhost，获取环境变量的端口号没有就取3000，设置超时和公共头部
const instance = axios.create({
    baseURL:`http://${process.env.HOST||'localhost'}:${process.env.PORT||3000}`,
    timeout:1000,
    headers:{

    }
})

export default instance