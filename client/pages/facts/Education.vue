<template>
<div class="row align-items-center">
  <div class="col-md-6">
    <chart :data="this.data"></chart>
  </div>
  <div class="col-md-6">
    <h1>Bildungshintergrund Deutscher Gamer (in Mio)</h1>
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
  </div>
</div>
</template>

<script>
import Chart from '../../components/charts/polarChart'
export default {
  name: 'education',
  components: {
    Chart
  },
  data () {
    return {
      data: {
        datasets: [
          {
            data: [7.2, 10.5, 6.1, 6.6],
            backgroundColor: ['#FF6384', 'cyan', '#FFCE56', 'turquoise'],
            label: 'Bildungshintergrund Deutscher Gamer (in Mio)' // for legend
          }
        ],
        labels: ['Hauptschulabschluss', 'Mittlere Reife', 'Abitur', 'Hochschulabschluss']
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
