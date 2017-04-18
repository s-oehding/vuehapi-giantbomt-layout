import axios from 'axios'
const state = {
  loading: true,
  ready: false,
  error: {},
  data: []
}

const getters = {
  data: state => {
    return state
  }
}

const mutations = {
  SET_DATA (state, response) {
    state.data = response.data
  }
}

const actions = {
  getData: ({commit}, config) => {
    axios.get('/api/test').then(
      response => {
        commit('SET_DATA', response)
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
