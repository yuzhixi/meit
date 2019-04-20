//passport是所有node程序可以用的，koa-passport是koa进行封装适配的
import passport from 'koa-passport'
//本地策略包
import LocalStrategy from 'passport-local'
//获取用户表模型
import UserModel from '../../dbs/models/users'

//LocalStrategy策略，用于匹配本地环境的用户名和密码，可以扩展这个策略，通过数据库的方式进行匹配,https://www.kancloud.cn/digest/passport-js-note/64048,https://github.com/jawil/blog/issues/19，验证回调需要返回验证结果，这是由done()来完成的
passport.use(new LocalStrategy(async function(username,password,done){
    let result = await UserModel.findOne({username})
    if(result!=null){
        if(result.password===password){
            return done(null,result)
        }else{
            return done(null,false,'密码错误')
        }
    }else{
        return done(null,false,'用户不存在')
    }
}))

//让用户每次登陆都通过session验证
//序列化，查询到用户后将用户存储到session中，保存user对象
//在ctx.login(id)函数调用时触发，其中的参数会传给serializeUser函数作为其第一个参数
//
passport.serializeUser(function(user,done){
    done(null,user)
})

//反序列化,每次请求时在session中读取用户对象，删除user对象
//会自动解析用户请求中session的信息，并作为回调函数的第一个参数
//如果在serializeUser函数中将ID信息存入session，则在这一步回调函数的第一个参数就是ID，在此时可以根据ID查询数据库从而获取用户的更多信息
passport.deserializeUser(function(user,done){
    done(null,user)
})

export default passport
