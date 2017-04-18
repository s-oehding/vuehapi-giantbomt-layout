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
    state.companies = response.data
    if (state.companies.length === response.data.length) {
      state.loading = false
      state.ready = true
    }
  }
}

const actions = {
  getCompanies: ({commit}) => {
    axios.get('/api/companies').then(
      response => {
        commit('SET_COMPANIES', response)
      },
      error => {
        console.log('ERROR', error)
      })
  }
}

export default {
  state, mutations, getters, actions
}
