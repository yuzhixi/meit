//passport是所有node程序可以用的，koa-passport是koa进行封装适配的
import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
//获取用户表模型
import UserModel from '../../dbs/models/users'

passport.use(new LocalStrategy(async function(username,password,done){
    let where = {
        username
    };
    let result = await UserModel.findOne(where)
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

//序列化，查询到用户后将用户存储到session中
passport.serializeUser(function(user,done){
    done(null,user)
})

//反序列化,每次请求时在session中读取用户对象
passport.deserializeUser(function(){
    done(null,user)
})

export default passport