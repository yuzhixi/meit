import Router from 'koa-router';
import Cart from '../dbs/models/cart'
import md5 from 'crypto-js/md5'

let router = new Router({
  prefix:'/cart'
})

router.post('/create',async (ctx) => {
  if(!ctx.isAuthenticated()){
    ctx.body = {
      msg:'please login',
      code:-1
    }
  }else{
    let time = Date()
    let cartNo = md5(Math.random() * 1000 + time).toString()
    let {
      params: {
        id,
        detail
      }
    } = ctx.request.body
    let cart = new Cart({id, cartNo, time, user: ctx.session.passport.user, detail})
    let result = await cart.save()
    if(result){
      ctx.body = {
        msg:'',
        code:0,
        id:cartNo
      }
    }else {
      ctx.body = {
        msg:'fail',
        code:-1,
      }
    }
  }
})

router.post('/getCart', async (ctx) => {
  let {cartNo} = ctx.request.body
  let result = await Cart.findOne({cartNo})
  if(result){
    ctx.body = {
      code:0,
      data:result?result.detail[0]:{}
    }
  }else{
    ctx.body = {
      code:-1,
      msg:'not found'
    }
  }

})

export default router
