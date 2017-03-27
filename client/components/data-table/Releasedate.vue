<template>
  <time :datetime="this.data.first_release_date">{{ this.data.first_release_date | toDate }}</time>
</template>

<script>
import { toDate } from '../../filters'
export default {
  props: ['data'],
  filters: {
    toDate
  }
}
</script>
