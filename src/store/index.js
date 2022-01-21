import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tab
  },
  state:{
  administer_number:'1',
  password:'123456'
  }
})
