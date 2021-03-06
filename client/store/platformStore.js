import axios from 'axios'

const state = {
  loading: true,
  ready: false,
  platforms: [],
  platformDetail: []
}

const getters = {
  platforms: state => {
    return state
  },
  platformDetail: state => {
    return state.platformDetail
  }
}

const mutations = {
  SET_PLATFORMS (state, response) {
    state.platforms = response.data
    if (state.platforms.length === response.data.length) {
      state.loading = false
      state.ready = true
    }
  },
  SET_PLATFORM (state, response) {
    state.platformDetail = response.data.results
    state.loading = false
    state.ready = true
  },
  CLEAR_PLATFORM (state) {
    state.platformDetail = []
    state.loading = true
    state.ready = false
  }
}

const actions = {
  getPlatforms: ({commit}) => {
    axios.get('/api/platforms').then(
      response => {
        commit('SET_PLATFORMS', response)
      },
      error => {
        console.log('ERROR', error)
      })
  },

  getPlatform: ({commit}, id) => {
    commit('CLEAR_PLATFORM')
    axios.get('/api/platform/' + id).then(
      response => {
        commit('SET_PLATFORM', response)
      },
      error => {
        console.log(error)
        this.error = error
      })
  }
}

export default {
  state, mutations, getters, actions
}
