<template>
<div class="row align-items-center">
  <div class="col-md-6">
    <h1>Anstieg der Systemanforderungen</h1>
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
  </div>
  <div class="col-md-6">
    <div class="row">
      <div class="col-md-6">
        <h4>CPU</h4>
        <chart :data="this.dataCPU"></chart>
      </div>
      <div class="col-md-6">
        <h4>RAM</h4>
        <chart :data="this.dataRAM"></chart>
      </div>
      <div class="col-md-6">
        <h4>Grafikspeicher</h4>
        <chart :data="this.dataGPU"></chart>
      </div>
      <div class="col-md-6">
        <h4>Farben</h4>
        <chart :data="this.dataCOLOR"></chart>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Chart from '../../components/charts/newChart'
export default {
  name: 'system',
  components: {
    Chart
  },
  data () {
    return {
      dataCPU: {
        labels: ['1977', '1996', '2013', '2017'],
        datasets: [
          {
            label: 'CPU (in Mhz)',
            backgroundColor: '#3c8dbc',
            data: [1.19, 90, 2000, 3500]
          }
        ]
      },
      dataRAM: {
        labels: ['1977', '1996', '2013', '2017'],
        datasets: [
          {
            label: 'RAM (in Mb)',
            backgroundColor: 'orange',
            data: [0.000128, 16, 2000, 64000]
          }
        ]
      },
      dataGPU: {
        labels: ['1977', '1996', '2013', '2017'],
        datasets: [
          {
            label: 'GPU Memory (in Mb)',
            backgroundColor: '#FF69B4',
            data: [0, 4, 2000, 6000]
          }
        ]
      },
      dataCOLOR: {
        labels: ['1977', '1996', '2013', '2017'],
        datasets: [
          {
            label: 'Farbtiefe',
            backgroundColor: 'green',
            data: [ 16, 256000, 16777216, 16777216 ]
          }
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
