import axios from 'axios'
import Qs from 'qs'
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
    console.log('Games Config: ', {params: config})
    axios.get('/api/games', {
      params: config,
      paramsSerializer: function(params) {
        return Qs.stringify(config, {arrayFormat: 'repeat'})
      }
    }).then(
      response => {
        console.log(response)
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
