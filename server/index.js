// const Koa = require('koa')
import Koa from 'koa'

const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

//导入中间件
import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import Redis from 'koa-redis'
import json from 'koa-json'
import dbConfig from './dbs/config'
import passport from './interface/utils/passport.js'

import user from './interface/user'
import geo from './interface/geo'
import search from './interface/search'
import categroy from './interface/categroy'

const app = new Koa()
//设置key，启用代理，使用插件
app.keys = ['mt', 'keyskeys']
app.proxy = true
app.use(session({key:'mt',prefix:'mt:uid',store:new Redis()}))
app.use(bodyParser({
  extendTypes:['json','form','text']
}))
app.use(json())
//连接数据库
mongoose.connect(dbConfig.dbs,{
  useNewUrlParser:true
})
//处理登录相关配置
app.use(passport.initialize())
app.use(passport.session())

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  //引入路由，注意代码插入位置
  app.use(user.routes()).use(user.allowedMethods())
  app.use(geo.routes()).use(geo.allowedMethods())
  app.use(search.routes()).use(search.allowedMethods())
  app.use(categroy.routes()).use(categroy.allowedMethods())

  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
