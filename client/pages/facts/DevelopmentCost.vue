<template>
<div class="row align-items-center">
  <div class="col-md-6">
    <h1>Entwicklungskosten damals und heute</h1>
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
  </div>
  <div class="col-md-6">
    <chart chart-id="cost-chart" :data="this.data" :options="this.options"></chart>
  </div>
</div>
</template>

<script>
import Chart from '../../components/charts/barChart'

let string = `<%= value + ' $' %>`
export default {
  name: 'development-cost',
  components: {
    Chart
  },
  data () {
    return {
      data: {
        labels: ['Pong 1972', 'Pac-Man 1980', 'GTA 5 2013', 'Destiny 2014'],
        datasets: [{
          data: [500, 1000, 230000000, 435000000],
          backgroundColor: ['#FF6384', 'cyan', '#FFCE56', 'turquoise'],
          label: 'Entwicklungskosten'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        multiTooltipTemplate: string,
        scales: {
          xAxes: [{
            position: 'bottom'
          }],
          yAxes: [{
            position: 'left',
            scaleLabel: function (valuePayload) {
              return Number.parseInt(valuePayload)
            },
            type: 'logarithmic',
            ticks: {
              min: 1,
              max: 450000000
            }
          }]
        }
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
