<template>
<ul class="platforms">
	<li class="platform" v-for="platform in data.platforms">
		<!-- <a :href="platform.site_detail_url" title="platform.name">{{ platform.name }}</a> -->
		<router-link :to="{ name: 'platform', params: { id: platform.id }}" class="btn">{{ platform.name }}</router-link>
	</li>
</ul>
</template>

<script>
  export default {
    props: ['data']
  }
</script>
