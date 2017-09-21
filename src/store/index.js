import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    favorites: []
  },
  mutations: {
    ADD_FAVORITE (state, payload) {
      state.favorites.push(payload)
      state.count++
    },
    REMOVE_FAVORITE (state, payload) {
      state.favorites.splice(state.favorites.indexOf(payload), 1)
      state.count--
    }
  },
  // Returns beers with alcohol greater than 8%
  getters: {
    strongAles (state) {
      return _.filter(state.favorites.__ob__.value, ale => ale.abv > 8)
    }
  }
})
