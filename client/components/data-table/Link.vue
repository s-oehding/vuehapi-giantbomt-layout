<template>
  <router-link :to="{ name: 'game', params: { id: this.data.id }}">{{ this.data.name }}</router-link>
</template>

<script>
  export default {
    props: ['data']
  }
</script>
