import axios from 'axios'

const state = {
  loading: true,
  ready: false,
  companies: []
}

const getters = {
  companies: state => {
    return state
  }
}

const mutations = {
  SET_COMPANIES (state, response) {
    state.companies = state.companies.concat(response.data.results)
    if (state.companies.length === response.data.number_of_total_results) {
      state.loading = false
      state.ready = true
    }
  }
}

const actions = {
  getCompanies: ({commit}, config) => {
    axios.get('/api/companies', config).then(
      response => {
        console.log('Companies response: ', response)
        console.log('TotalPages: ', response.data.number_of_total_pages)
        commit('SET_COMPANIES', response)
        for (var i = config.page + 1; i <= 3; i++) {
          axios.get('/api/companies', {
            params: {
              page: i,
              perPage: config.perPage,
              sortBy: config.sortBy,
              sortDir: config.sortDir
            }
          }).then(
            response => {
              console.log('Companies page: ' + response.config.params.page, response)
              commit('SET_COMPANIES', response)
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
