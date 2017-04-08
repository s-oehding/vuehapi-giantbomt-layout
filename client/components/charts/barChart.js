
import { Bar } from 'vue-chartjs'

export default Bar.extend({
  props: ['data'],
  mounted () {
    this.renderChart(this.data)
  }
})
