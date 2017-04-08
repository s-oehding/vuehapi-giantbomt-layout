
import { Line } from 'vue-chartjs'

export default Line.extend({
  props: ['data'],
  mounted () {
    this.renderChart(this.data)
  }
})
