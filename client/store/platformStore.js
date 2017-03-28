import axios from 'axios'
import Qs from 'qs'
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
    axios.get('/api/platforms', {params: {perPage: 100}}).then(
      response => {
        // console.log('Meta response: ', response)
        // console.log('TotalPages: ', response.data.number_of_total_pages)
        // let fields = config.fields
        // let filters = config.filters
        // let sortBy = config.sortBy
        // let sortDir = config.sortDir
        for (var i = 1; i <= response.data.number_of_total_pages; i++) {
          axios.get('/api/platforms', {
            params: {
              page: i,
              perPage: 100,
              config
            },
            paramsSerializer: function(params) {
              return Qs.stringify(params, {arrayFormat: 'repeat'})
            }
          }).then(
            response => {
              // console.log('Platforms page: ' + response.config.params.page, response)
              commit('SET_PLATFORMS', response)
              return response
            },
            error => {
              console.error(error)
            })
        }
      },
      error => {
        console.error(error)
      })
  }
}

export default {
  state, mutations, getters, actions
}
