<template>
  <img v-if="this.data.image.screen_url" :src="this.data.image.medium_url">
  <img v-else src="https://unsplash.it/90/90/?random">
</template>

<script>
  export default {
    props: ['data']
  }
</script>
