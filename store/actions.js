const actions =  {
    async nuxtServerInit({
        commit
    }, {req, app}) {
        const {status, data: {province, city}} = await app.$axios.get('/geo/getPosition')
        commit('geo/setPosition',status===200?{city,province}:{city:'',province:''})

        const {status: status2, data:{menu}} = await app.$axios.get('/geo/menu')
        commit('home/setMenu',status2===200?menu:[])

        const {status: status3, data:{result}} = await app.$axios.get('/search/hotPlace',{
          params:{
            city:'三亚市',
            type:'丽人'
        }})
        commit('home/setHotPlace', status3==200?result:[])

    }
}

export default actions
