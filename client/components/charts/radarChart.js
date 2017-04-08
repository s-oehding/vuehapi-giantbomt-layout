
import { Radar } from 'vue-chartjs'

export default Radar.extend({
  props: ['data'],
  mounted () {
    this.renderChart(this.data)
  }
})
