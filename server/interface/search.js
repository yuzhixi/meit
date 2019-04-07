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
    console.log('city', ctx.store, ctx.query)
    let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
    try {
        let place = await Poi.find({
            city,
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

} )

export default router