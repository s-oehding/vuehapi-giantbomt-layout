import axios from 'axios'

const state = {
  games: [],
  apiSearch: {
    search: ''
  }
}

const getters = {
  games: state => {
    return state.games
  }
}

const mutations = {
  SET_GAMES (state, response) {
    state.games = state.games.concat(response.data.results)
  }
}

const actions = {
  getGames: ({commit}, config) => {
    console.log(config)
    axios.get('/api/games', config).then(
      response => {
        commit('SET_GAMES', response)
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
