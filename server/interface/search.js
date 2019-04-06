import Router from 'koa-router'
// import mongoose from 'mongoose'
import Poi from '../dbs/models/poi'

// mongoose.connect('mongodb://127.0.0.1:27017/student')
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
    let city = ctx.store.state.geo.position.city
    try {
        let place = await Poi.find({
            city,
            type: ctx.query.type || '景点'
        }).limit(10)
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

export default router