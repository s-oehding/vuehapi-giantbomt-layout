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
    state.platforms = state.platforms.concat(response.data.results)
    if (state.platforms.length === response.data.number_of_total_results) {
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
  getPlatforms: ({commit}, config) => {
    axios.get('/api/platforms', {params: {perPage: config.perPage}}).then(
      response => {
        // console.log('Meta response: ', response)
        // console.log('TotalPages: ', response.data.number_of_total_pages)
        for (var i = 1; i <= response.data.number_of_total_pages; i++) {
          axios.get('/api/platforms', {
            params: {
              page: i,
              perPage: config.perPage,
              fields: config.fields,
              filters: config.filters,
              sortBy: config.sortBy,
              sortDir: config.sortDir
            }
          }).then(
            response => {
              console.log('Platforms page: ' + response.config.params.page, response)
              commit('SET_PLATFORMS', response)
            },
            error => {
              console.log('ERROR', error)
            })
        }
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
