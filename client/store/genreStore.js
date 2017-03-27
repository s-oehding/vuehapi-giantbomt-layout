import axios from 'axios'

const state = {
  genres: []
}

const getters = {
  genres: state => {
    return state.genres
  }
}

const mutations = {
  SET_GENRES (state, response) {
    state.genres = response.data.results
  }
}

const actions = {
  getGenres: ({commit}) => {
    axios.get('/api/genres').then(
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
