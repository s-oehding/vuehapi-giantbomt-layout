<template>
  <div id="content-wrapper">
      <div id="content">
        <navbar></navbar>
        <div class="main container">
            <router-view></router-view>
        </div>
        <footer class="footer">
            <div class="col-sm-12">
                <a href="#" title="">Impressum</a> <span>|</span> <a href="#" title="">Datenschutz</a>
            </div>
        </footer>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      loading: true,
      ready: true,
      config: {
        sortBy: 'original_release_date',
        sortDir: 'asc',
        filters: [
          {
            field: 'original_release_date',
            start: new Date('2010-01-01'),
            end: new Date()
          }
        ]
      }
    }
  },
  mounted () {
    this.getGames(this.config)
    // this.getGenres()
    this.getPlatforms(this.config)
  },
  methods: {
    ...mapActions([
      'getGames',
      'getGenres',
      'getPlatforms'
    ])
  }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Electrolize');

$brand-primary: turquoise;
$gray-medium: #d2d2d2;
$gray-dark: #292b2c;

$sidebarWidth: 15%;
$header-height: 55px;
$footer-height: 45px;

#app {
  font-family: Helvetica, 'OpenSans', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

/* Main styles
-------------------------------------------------- */
body, html {
  margin: 0;
  padding: 0;
}

// section {
//   display: flex;
//   align-items:center;
//   height: 100%;
// }

h1, h2, h3, h4, h5, h6, a, button, .btn, input {
  font-family: 'Electrolize', sans-serif;
}

#content-wrapper {
  #sidebar {
    background-color: $gray-dark;
    width: $sidebarWidth;
    display: inline-block;
  }
  #content {
    .navbar {
      border-radius: 0px;
      position: fixed;
      height: $header-height;
      width: 100%;
      top:0;
      z-index:999;
    }
    background: $gray-medium;
    
    .main {
      margin-top: $header-height;
    }

    .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: $footer-height;
      background-color: $gray-dark;
      z-index: 99;
      color: $brand-primary;
      a, span {
        color: $brand-primary;
      }
    }
  }
}

</style>
