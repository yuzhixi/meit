import Router from 'koa-router';
import Categroy from '../dbs/models/categroy'

let router = new Router({
  prefix:'/categroy'
})

router.get('/crumbs', async (ctx) => {
  let result = await Categroy.findOne({city: ctx.query.city.replace('市', '') || '宜昌'})
  console.log('999',ctx.query.city.replace('市', ''),result)
  if (result) {
    ctx.body = {
      areas: result.areas,
      types: result.types,
      msg: ''
    }
  } else {
    ctx.body = {
      areas: [],
      types: [],
      msg:'未取到对应城市'
    }
  }


  // let {status,data:{areas,types}} = await axios.get('http://cp-tools.cn/categroy/crumbs',{
  //   params:{
  //     city:ctx.query.city.replace('市','') || "北京",
  //     sign
  //   }
  // })
  // ctx.body={
  //   areas: status===200?areas:[],
  //   types: status===200?types:[]
  // }
})

export default router
