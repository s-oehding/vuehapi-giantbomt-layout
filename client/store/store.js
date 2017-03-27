import Vue from 'vue'
import Vuex from 'vuex'

import gameStore from './gameStore'
import genreStore from './genreStore'
import searchStore from './searchStore'
import platformStore from './platformStore'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    gameStore, genreStore, platformStore, searchStore
  },
  strict: debug
})
