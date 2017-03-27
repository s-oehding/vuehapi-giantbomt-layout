<template>
  <timeline :data="games" :ready="$parent.ready"></timeline>
</template>

<script>
import Timeline from '../components/Timeline'
export default {
  components: {
    Timeline
  },
  data () {
    return {
    }
  },
  computed: {
    games () {
      return this.$store.getters.games
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="sass" scoped>
  
</style>
