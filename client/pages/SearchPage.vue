<template>
  <div class="container-fluid">
    <div class="row">
      <h1>Search</h1>
      <hr>
    </div>
    <div class="row">
      <v-client-table :data.sync="games" :columns.sync="columns" :options="options" name="gameStore"></v-client-table>
      <!-- <v-server-table url="/games" :columns="columns" :options="options"></v-server-table> -->
    </div>
  </div>
</template>

<script>
import Image from '../components/data-table/Image'
// import Link from '../components/data-table/Link'
// import Releasedate from '../components/data-table/Releasedate'

export default {
  name: 'search-page',
  data () {
    return {
      columns: ['Image', 'id', 'name', 'deck', 'release_date'],
      options: {
        templates: {
          Image
        }
      }
    }
  },
  computed: {
    games () {
      return this.$store.getters.games
    }
  }
}
</script>

<style lang="sass" scoped>
  .VueTables  {
    width: 100%;
    padding: 2rem;
  }
</style>
