<template>
<div class="row align-items-center">
  <div class="col-md-6">
    <h1>Entwicklungskosten damals und heute</h1>
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
  </div>
  <div class="col-md-6">
    <chart :data="this.data"></chart>
  </div>
</div>
</template>

<script>
import Chart from '../../components/charts/barChart'
export default {
  name: 'development-cost',
  components: {
    Chart
  },
  data () {
    return {
      data: {
        datasets: [{
          data: [
            5000,
            10000,
            2300000,
            4350000
          ],
          backgroundColor: [
            '#FF6384',
            'cyan',
            '#FFCE56',
            'turquoise'
          ],
          label: 'Entwicklungskosten'
        }],
        labels: [
          '"Pong" 1972',
          '"Pac-Man" 1980',
          '"GTA 5" 2013',
          '"Destiny" 2014'
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style>
  
</style>
