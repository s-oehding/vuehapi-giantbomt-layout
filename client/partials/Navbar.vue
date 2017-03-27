<template>
<nav class="nav">
  <div class="nav-left">
    <a class="nav-item">
      <img src="../assets/logo.png" alt="game-lounge">
    </a>
  </div>

  <div class="nav-center">

  </div>

  <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
  <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
  <span class="nav-toggle">
    <span></span>
    <span></span>
    <span></span>
  </span>

  <!-- This "nav-menu" is hidden on mobile -->
  <!-- Add the modifier "is-active" to display it on mobile -->
  <div class="nav-right nav-menu">
    <router-link class="nav-item is-tab" to="/map"><span class="icon"><i class="fa fa-map"></i></span> Map</router-link>
    <router-link class="nav-item is-tab" to="/search"><span class="icon"><i class="fa fa-search"></i></span> Search</router-link>
    <router-link class="nav-item is-tab" to="/platforms"><span class="icon"><i class="fa fa-search"></i></span> Platforms</router-link>
    <router-link class="nav-item is-tab" to="/timeline"><span class="icon"><i class="fa fa-time"></i></span> Timeline</router-link>
    <span class="nav-item">
      <input class="input" type="text" placeholder="Search Games" v-model="$parent.searchString">
      <router-link v-on:click.prevent="fetchGames" to="/search" class="button">Search</router-link>
    </span>
  </div>
</nav>
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
  .router-link-active {
    color: turquoise !important;
  }
 }
</style>
