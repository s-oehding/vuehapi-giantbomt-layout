<template>
  <time :datetime="data.original_release_date">{{ data.original_release_date | toDate }}</time>
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
