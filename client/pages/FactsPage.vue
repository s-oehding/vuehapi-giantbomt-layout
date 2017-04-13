<template>
<div id="facts" class="container">
  <system></system>
  <hr>
  <education></education>
  <hr>
  <development-cost></development-cost>
</div>
</template>

<script>
import System from './facts/System'
import Education from './facts/Education'
import DevelopmentCost from './facts/DevelopmentCost'
export default {
  name: 'facts-page',
  components: {
    System, Education, DevelopmentCost
  },
  data () {
    return {}
  },
  mounted () {
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style>
#facts {
  padding: 2rem 0;
}
</style>
