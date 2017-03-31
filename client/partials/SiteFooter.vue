<template>
    <footer class="footer">
        <div class="container">
            <div class="row">
              <div class="col">
                <b-button-group>
                  <b-button><i class="fa fa-twitter"></i></b-button>
                  <b-button><i class="fa fa-facebook"></i></b-button>
                  <b-button><i class="fa fa-github"></i></b-button>
                </b-button-group>
              </div>
              <a href="#" title="">Impressum</a> <span>|</span> <a href="#" title="">Datenschutz</a>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
  name: 'site-footer',
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
$brand-primary: turquoise;
$gray-medium: #d2d2d2;
$gray-dark: #292b2c;

$sidebarWidth: 15%;
$header-height: 55px;
$footer-height: 45px;
.footer {
  background-color: $gray-dark;
  color: $brand-primary;
  a, span {
    color: $brand-primary;
  }
}
</style>