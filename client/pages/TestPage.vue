<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12 col-md-2">
          <b-button v-on:click="runQuery">RUN QUERY</b-button>
      </div>
      <div class="col-sm-12 col-md-10">
        <div class="row align-items-center">
          <b-alert variant="info" class="col-sm-12" show>
            Hapi Server Response Test
          </b-alert>
          <section class="col-sm-12">
            <h2 class="jumbotron">Json Response</h2>
          </section>
          <section class="container code">
            <code>
              <pre>
                {{ companies.companies }}
              </pre>
            </code>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'test',
  data () {
    return {
      config: {
        params: {
          perPage: 100,
          page: 1,
          sortBy: 'location_country',
          sortDir: 'desc'
        }
      }
    }
  },
  computed: {
    companies () {
      return this.$store.getters.companies
    }
  },
  created () {
  },
  methods: {
    runQuery () {
      this.getCompanies(this.config)
    },
    ...mapActions([
      'getCompanies'
    ])
  }
}
</script>

<style lang="sass" scoped>
  
</style>
