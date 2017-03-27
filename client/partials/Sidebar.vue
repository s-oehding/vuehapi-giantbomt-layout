<template>
  <div id="sidebar">
  <div class="logo">
    <img src="../assets/logo.png" alt="">
  </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
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
#sidebar {
  padding: 0 .5rem;

  .logo {
    display: block;
    padding: 2rem;
    text-align: center;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
