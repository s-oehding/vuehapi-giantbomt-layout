<template>
<b-navbar toggleable fixed="top" type="inverse" variant="inverse">

  <b-nav-toggle target="nav_collapse"></b-nav-toggle>
  <b-link class="navbar-brand" to="/">
    <span><img src="../assets/logo.png" alt="game-lounge" style="max-height: 40px;"> GameLounge</span>
  </b-link>

  <b-collapse is-nav id="nav_collapse">
    
    <b-nav is-nav-bar>
      <b-nav-item to="/" class="nav-link" linkActiveClass="active" exact>Home</b-nav-item>
      <b-nav-item to="/facts" class="nav-link" linkActiveClass="active" exact>Facts</b-nav-item>
      <b-nav-item to="/map" class="nav-link" linkActiveClass="active" exact>Map</b-nav-item>
      <b-nav-item to="/search" class="nav-link" linkActiveClass="active" exact>Search</b-nav-item>
      <b-nav-item to="/platforms" class="nav-link" linkActiveClass="active" exact>Platforms</b-nav-item>
      <b-nav-item to="/test" class="nav-link" linkActiveClass="active" exact>API Test</b-nav-item>
      <!-- <b-nav-item to="/timeline" class="nav-link" linkActiveClass="active" exact>Timeline</b-nav-item> -->
    </b-nav>
  </b-collapse>
</b-navbar>
</template>

<script>
export default {
  name: 'navbar',
  props: [],
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="sass">
 .navbar {
  .navbar-brand {
    color: turquoise;
  }
  .nav-link {
    &.active {
      color: turquoise !important;
    }
  }
 }
</style>
