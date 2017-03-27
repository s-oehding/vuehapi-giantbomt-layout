import axios from 'axios'

const state = {
  platforms: []
}

const getters = {
  platforms: state => {
    return state.platforms
  }
}

const mutations = {
  SET_PLATFORMS (state, response) {
    state.platforms = state.platforms.concat(response.data.results)
  }
}

const actions = {
  getPlatforms: ({commit}, config) => {
    axios.get('/api/platforms', config).then(
      response => {
        // console.log('Platforms config: ', config)
        console.log('Meta response: ')
        console.log('TotalPages', response.data.number_of_total_pages)
        let fields = config.fields
        let filters = config.filters
        let sortBy = config.sortBy
        let sortDir = config.sortDir
        for (var i = 1; i <= response.data.number_of_total_pages; i++) {
          axios.get('/api/platforms', {
            params: {
              page: i,
              fields,
              filters,
              sortBy,
              sortDir
            }
          }).then(
            response => {
              console.log('Platforms page: ', response)
              // console.log('Platforms response: ', response.data)
              commit('SET_PLATFORMS', response)
              return response
            },
            error => {
              console.log(error)
              this.error = error
            })
        }
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
