import axios from 'axios'
const state = {
  loading: true,
  ready: false,
  games: [],
  gameDetail: [],
  apiSearch: {
    search: ''
  }
}

const getters = {
  games: state => {
    return state
  },
  gameDetail: state => {
    return state.gameDetail
  }
}

const mutations = {
  SET_GAMES (state, response) {
    state.games = state.games.concat(response.data.results)
    if (state.games.length === 100) {
      state.loading = false
      state.ready = true
    }
  },
  SET_GAME (state, response) {
    state.gameDetail = response.data.results
    state.loading = false
    state.ready = true
  },
  CLEAR_GAME (state) {
    state.gameDetail = []
    state.loading = true
    state.ready = false
  }
}

const actions = {
  getGames: ({commit}, config) => {
    console.log('Games Config: ', {params: config})
    axios.get('/api/games', {
      params: {
        page: 1,
        perPage: config.perPage,
        fields: config.fields,
        filters: config.filters,
        sortBy: config.sortBy,
        sortDir: config.sortDir
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
  },
  getGame: ({commit}, id) => {
    commit('CLEAR_GAME')
    axios.get('/api/game/' + id).then(
      response => {
        commit('SET_GAME', response)
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
