<template>
  <div id="main">
      <navbar></navbar>
      <div id="content" class="content">
          <router-view></router-view>
      </div>
      <site-footer></site-footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      loading: true,
      ready: false
    }
  },
  mounted () {
    if (this.genres.genres.length === 0) {
      this.getGenres()
    }
    if (this.platforms.platforms.length === 0) {
      this.getPlatforms()
    }
    if (this.platforms.ready === true && this.genres.ready === true) {
      this.loading = false
      this.ready = true
    }
  },
  computed: {
    genres () {
      return this.$store.getters.genres
    },
    platforms () {
      return this.$store.getters.platforms
    }
  },
  methods: {
    ...mapActions([
      'getPlatforms',
      'getGenres'
    ])
  }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Electrolize');
@import "assets/scss/variables";

$brand-primary: turquoise !important;
$gray-medium: #d2d2d2;
$gray-dark: #292b2c;

$sidebarWidth: 15%;
$header-height: 55px;
$footer-height: 45px;

#app {
  font-family: Helvetica, 'OpenSans', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgba(255, 255, 255, 0.5);
}

/* Main styles
-------------------------------------------------- */
body, html {
  margin: 0;
  padding: 0;
  background: #8b8c8d;
}

h1, h2, h3, h4, h5, h6, a, button, .btn, input {
  font-family: 'Electrolize', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: bold;
}

#sidebar {
  background-color: $gray-dark;
  width: $sidebarWidth;
  display: inline-block;
}
#main {
  .nav {
    background-color: $gray-dark;
    border-radius: 0px;

    .nav-item {
      transition: all 0.25s ease-in-out;
      &:hover {
        color: $brand-primary;
        transition: all 0.25s ease-in-out;
      }
    }
  }

  #content {
    display: block;
    margin-top: 71px;
    margin-bottom: 50px;
    min-height: calc(100vh - 126px);
  }

  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 999;
    padding: .5rem 0;
  }
}
</style>
