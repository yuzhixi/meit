import Router from 'koa-router'
import Poi from '../dbs/models/poi'

let router = new Router({
    prefix:'/search'
})

router.get('/top', async (ctx) => {
    try {
        let top = await Poi.find({
        'name': new RegExp(ctx.query.input),
        'city':ctx.query.city
        })
        ctx.body = {
        code: 0,
        top: top.map(item => {
            return {
            name: item.name,
            type: item.type
            }
        }),
        type: top.length ? top[0].type : ''
        }
    } catch (e) {
        ctx.body = {
        code: -1,
        top: []
        }
    }
})

router.get('/hotPlace', async (ctx) => {
    let city = ctx.store ? ctx.$store.state.geo.position.city : ctx.query.city
    try {
        let place = await Poi.find({
            city:city.replace('市',''),
            type: ctx.query.type || '丽人'
        }).limit(5)
        ctx.body = {
            code: 0,
            result: place.map(item => {
                return {
                    name: item.name,
                    type: item.type
                }
            })
        }
    } catch (e) {
        ctx.body = {
            code: -1,
            result: []
        }
    }

})

router.get('/resultsByKeywords', async (ctx) => {
  let result = await Poi.find({city: ctx.query.city.replace('市', '')})
  if (result) {
    ctx.body = {
      count: 10,
      pois: result
    }
  } else {
    ctx.body = {
      areas: [],
      types: []
    }
  }
} )

router.get('/products', async (ctx) => {
    let keyword = ctx.query.keyword || '水云阁水疗养生休闲会所'
    let location = ctx.query.location || ''
    let type = ctx.query.type || ''
    let list = [
      {
        name:'老北京火锅三人餐',
        biz_ext:{
          ticket_ordering:40,
          cost:'158'
        },
        deadline:'2019-12-31',
      },
      {
        name:'老北京火锅六人餐',
        biz_ext:{
          ticket_ordering:80,
          cost:'358'
        },
        deadline:'2019-12-31',
      },
      {
        name:'老北京火锅双人餐',
        biz_ext:{
          ticket_ordering:20,
          cost:'118'
        },
        deadline:'2019-12-31',
      },
      {
        name:'精品小火锅',
        biz_ext:{
          ticket_ordering:56,
          cost:'98'
        },
        deadline:'2019-12-31',
      },
    ]
    let product = await Poi.findOne({name:keyword,area:location,type:type})
    if (product) {
      ctx.body = {
        product,
        list: ctx.isAuthenticated() ? list: '',
        login: ctx.isAuthenticated()
      }
    }else{
      ctx.body = {
        product: {},
        list: ctx.isAuthenticated() ? list: '',
        login: ctx.isAuthenticated()
      }
    }
  })

export default router
