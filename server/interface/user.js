import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'

let router = new Router({
    prefix:'/users'
})

let Store = new Redis().client

//注册接口
router.post('/signup', async (ctx) => {
  const {username, password, email, code} = ctx.request.body;

  if (code) {
    //发送验证码时，已经在redis中保存了验证码和时间，此处则取出验证码和时间来做判断
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }
  let user = await User.find({username})
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '已被注册'
    }
    return
  }
  let nuser = await User.create({username, password, email})
  if (nuser) {
    let res = await axios.post('/users/signin', {username, password})
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

//登陆
router.post('/signin', async (ctx,next)=>{
  return Passport.authenticate('local',function(err,user,info,status){
    if(err){
      ctx.body = {
        code:-1,
        msg:err
      }
    }else{
      if(user){
        ctx.body = {
          code:0,
          msg:'login in success',
          user:user
        }
        return ctx.login(user)
      }else{
        ctx.body = {
          code:1,
          msg:info
        }
      }
    }
  })(ctx,next)
})

//验证
router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟内1次'
    }
    return false
  }
  let transporter = nodeMailer.createTransport({
    service: 'qq',
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  let mailOptions = {
    from: `"认证邮件" <${Email.smtp.user}>`,
    to: ko.email,
    subject: 'to 路星河',
    html: `路星河先生，恭喜您被选中成为耿耿粉丝团最幸运的明日之星，耿耿会赐予你力量，为你争取offer的路上保驾护航，带您成功领取offer之日，还有惊喜大礼包哦，凭邀请码领取，您的邀请码是${ko.code}`
  }
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    } else {
      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延时，有效期1分钟'
  }
})


//退出
router.get('/exit', async (ctx, next) => {
  //注销
  await ctx.logout()
  debugger
  //验证是否为 未登录状态
  //passport提供的api
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})


//获取用户信息
router.get('/getUser', async (ctx) => {
  if(ctx.isAuthenticated()){
    const { username, email} = ctx.session.passport.user
    ctx.body = {
      user:username,
      email:email
    }
  }else{
    ctx.body = {
      user:'',
      user:''
    }
  }
})

export default router




