<template>
  <li class="timeline-item">
    <div class="timeline-dot primary"><i class="fa fa-star"></i></div>
    <div class="timeline-panel">
      <div class="img-wrapper">
        <!-- <img v-if="this.cover" :src="this.cover" :alt="name"> -->
        <img v-if="this.cover" v-lazy="this.cover"/>
        <img v-else src="https://placehold.it/250/250" :alt="name">
      </div>
      <div class="content-wrapper">
        <h6>{{ this.name }}</h6>
        <router-link :to="{ name: 'platform', params: { id: this.id }}" class="btn btn-success">View Details</router-link>
        <!-- <p v-if="this.developer.name" class="desc"><span class="text-muted">Developer: </span> {{ this.developer.name }}</p> -->
      </div>
    </div>
    <div class="timeline-date"><i class="fa fa-calendar" aria-hidden="true"></i> {{ this.releasedate }}</div>
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: 'timeline-item',
  props: ['id', 'cover', 'name', 'releasedate']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">

</style>
