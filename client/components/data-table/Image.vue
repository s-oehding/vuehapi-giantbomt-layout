<template>
  <img v-if="this.data.image.thumb_url" v-lazy="this.data.image.thumb_url">
  <img v-else src="https://unsplash.it/90/90/?random">
</template>

<script>
  export default {
    props: ['data']
  }
</script>
