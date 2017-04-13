<template>
  <div class="row">
    <aside class="search-aside">
      <b-form-fieldset
      description="Search Games"
      label="Search games by name"
      :label-size="1"
      >
        <b-form-input v-model="params.searchQuery" placeholder="name"></b-form-input>
      </b-form-fieldset>

      <b-form-fieldset
      description="Filter"
      :label-size="1">
        <label>Filter by Platform</label>
        <b-form-select v-model="params.config.filters[1].value[0]" :options="platformsSelect"></b-form-select>
        <label>Filter by Genre</label><br>
        <b-form-select v-model="params.config.filters[2].value[0]" :options="genresSelect"></b-form-select>
      </b-form-fieldset>
      
      <b-form-fieldset
      label="Filter by Releasedate"
      description="Released between"
      :label-size="1">
        <label>Startdate</label>
        <datepicker v-model="params.config.filters[0].start" name="dateFrom" input-class="form-control"></datepicker>
        <label>Enddate</label>
        <datepicker v-model="params.config.filters[0].end" name="dateTo" input-class="form-control"></datepicker>
      </b-form-fieldset>
      <b-button v-on:click="searchNow">SEARCH</b-button>
    </aside>
    <div class="search-results">
      <v-client-table v-if="this.status === 'ready'" :data.sync="search.searchResults" :columns.sync="columns" :options="options" name="searchResults"></v-client-table>
      <preloader v-else-if="this.status === 'loading'">Loading...</preloader>
      <b-jumbotron v-else-if="this.status === 'waiting'" 
        header="Search Games"
        lead="Search the Games Database" >
        <p class="await">Waiting for searchquery</p>
      </b-jumbotron>

    </div>
  </div>
</template>

<script>
import Image from '../components/data-table/Image'
import Platforms from '../components/data-table/Platforms'
import Link from '../components/data-table/Link'
// import Releasedate from '../components/data-table/Releasedate'
import Datepicker from 'vuejs-datepicker'
import { mapActions } from 'vuex'
export default {
  name: 'search-page',
  components: {
    Datepicker
  },
  data () {
    return {
      columns: ['Image', 'Link', 'deck', 'Platforms', 'original_release_date'],
      options: {
        templates: {
          Image, Link, Platforms
        }
      },
      params: {
        searchQuery: '',
        config: {
          perPage: 100,
          fields: ['id', 'name', 'deck', 'image', 'platforms', 'original_release_date'],
          sortBy: 'original_release_date',
          sortDir: 'asc',
          filters: [
            {
              field: 'original_release_date',
              start: new Date('1950-01-01'),
              end: new Date()
            },
            {
              field: 'platform',
              value: ['1']
            },
            {
              field: 'genre',
              value: ['1']
            }
          ]
        }
      }
    }
  },
  mounted () {
  },
  computed: {
    search () {
      return this.$store.getters.search
    },
    genres () {
      return this.$store.getters.genres
    },
    platforms () {
      return this.$store.getters.platforms
    },
    genresSelect () {
      let options = [{text: 'Filter by Genre', value: ''}]
      this.genres.genres.forEach(function (element, index) {
        options.push({text: element.name, value: element.id})
      })
      return options
    },
    platformsSelect () {
      let options = [{text: 'Filter by Platform', value: ''}]
      this.platforms.platforms.forEach(function (element, index) {
        options.push({text: element.name, value: element.id})
      })
      return options
    },
    status () {
      if (this.search.ready && !this.search.loading) {
        return 'ready'
      } else if (!this.search.ready && this.search.loading) {
        return 'loading'
      } else if (!this.search.ready && !this.search.loading) {
        return 'waiting'
      }
    }
  },
  methods: {
    searchNow () {
      this.searchGames(this.params)
    },
    ...mapActions([
      'searchGames'
    ])
  }
}
</script>

<style lang="sass" scoped>
  .VueTables  {
    width: 100%;
    padding: 2rem;
  }
  .search-aside {
    position: fixed;
    height: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    width: 375px;
    .custom-select {
      width:100%;
    }
    .datepicker {
      color: black;
    }
  }
  .search-results {
    margin-left: 375px;
    float: left;
    width: 100%;
  }
</style>
