import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    auth: {
      error: '',
      reserved: false,
      user: {}
    },
    ctrade: {
      graph: [],
      zse: [],
      market: [],
      list: []
    }
  },
  getters: {
  }
})

export default store
