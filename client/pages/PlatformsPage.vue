<template>
  <timeline :data="platforms" :ready="true"></timeline>
</template>

<script>
import Timeline from '../components/Timeline'
export default {
  name: 'platforms-page',
  components: {
    Timeline
  },
  data () {
    return {
    }
  },
  computed: {
    platforms () {
      return this.$store.getters.platforms
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
