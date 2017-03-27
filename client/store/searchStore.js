import axios from 'axios'

const state = {
  searchResults: []
}

const getters = {
  searchResults: state => {
    return state.searchResults
  }
}

const mutations = {
  SET_SEARCHRESULTS (state, response) {
    state.searchResults = state.searchResults.concat(response.data.results)
  }
}

const actions = {
  search: ({commit}, config) => {
    console.log('searchConfig: ', config)
    axios.get('/api/search', config).then(
      response => {
        commit('SET_SEARCHRESULTS', response)
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
