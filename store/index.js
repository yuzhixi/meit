import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'
import actions from './actions'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    geo,
    home
  },
  actions:actions
})

export default store
