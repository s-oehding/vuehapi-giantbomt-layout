import axios from 'axios'

const state = {
  ready: false,
  loading: false,
  searchResults: []
}

const getters = {
  search: state => {
    return state
  }
}

const mutations = {
  SET_SEARCHRESULTS (state, response) {
    state.searchResults = state.searchResults.concat(response.data.results)
    if (state.searchResults.length === response.data.number_of_total_results) {
      state.ready = true
      state.loading = false
    }
  },
  CLEAR_SEARCHRESULTS (state) {
    state.searchResults = []
    state.ready = false
    state.loading = true
  }
}

const actions = {
  searchGames: ({commit}, params) => {
    commit('CLEAR_SEARCHRESULTS')
    axios.get('/api/search/' + params.searchQuery, {params: params.config}).then(
      response => {
        console.log('Total SearchResults: ', response.data.number_of_total_results)
        console.log('Search Config: ', response.config.params)
        for (var i = 1; i <= response.data.number_of_total_pages; i++) {
          axios.get('/api/search/' + params.searchQuery, {
            params: {
              page: i,
              perPage: params.config.perPage,
              fields: params.config.fields,
              filters: params.config.filters,
              sortBy: params.config.sortBy,
              sortDir: params.config.sortDir
            }
          }).then(
            response => {
              console.log('Search Results page: ' + response.config.params.page, response)
              commit('SET_SEARCHRESULTS', response)
            },
            error => {
              console.log('ERROR', error)
            })
        }
      },
      error => {
        console.log('ERROR', error)
      })
  }
}

export default {
  state, mutations, getters, actions
}
