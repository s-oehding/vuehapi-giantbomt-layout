import axios from 'axios'

const state = {
  genres: [],
  ready: false,
  loading: true
}

const getters = {
  genres: state => {
    return state
  }
}

const mutations = {
  SET_GENRES (state, response) {
    state.genres = response.data.results
    state.loading = false
    state.ready = true
  }
}

const actions = {
  getGenres: ({commit}, config) => {
    axios.get('/api/genres', {params: {perPage: config.perPage}}).then(
      response => {
        console.log('Genres response: ', response)
        commit('SET_GENRES', response)
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
