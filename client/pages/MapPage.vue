<template>
  <div class="map-wrapper">
    <preloader v-if="this.status === 'loading'"><p class="await">Loading...</p></preloader>
    <div v-else-if="this.status === 'ready'" id="map">
      <gmap-map
        :center='center'
        :zoom='3'
        :options="{styles: mapStyles}"
        style='width: 100%; height: 100%'
      >
      <gmap-cluster :grid-size="gridSize">
          <gmap-marker
            v-for="(company, id) in geoCoded"
            :position="company.position"
            :clickable="true"
            :draggable="false"
            :key="id"
            @click="toggleInfoWindow(company, id)"
          >
          </gmap-marker>
        </gmap-cluster>
        <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" :content="infoContent" @closeclick="infoWinOpen=false"></gmap-info-window>
      </gmap-map>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      center: {lat: 10.0, lng: 10.0},
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      // optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      gridSize: 50,
      mapStyles: [
        {
          'featureType': 'all',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'on'
            }
          ]
        },
        {
          'featureType': 'all',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'saturation': 36
            },
            {
              'color': '#000000'
            },
            {
              'lightness': 40
            }
          ]
        },
        {
          'featureType': 'all',
          'elementType': 'labels.text.stroke',
          'stylers': [
            {
              'visibility': 'on'
            },
            {
              'color': '#000000'
            },
            {
              'lightness': 16
            }
          ]
        },
        {
          'featureType': 'all',
          'elementType': 'labels.icon',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'administrative',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'color': '#000000'
            },
            {
              'lightness': 20
            }
          ]
        },
        {
          'featureType': 'administrative',
          'elementType': 'geometry.stroke',
          'stylers': [
            {
              'color': '#000000'
            },
            {
              'lightness': 17
            },
            {
              'weight': 1.2
            }
          ]
        },
        {
          'featureType': 'administrative',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'landscape',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#000000'
            },
            {
              'lightness': 20
            }
          ]
        },
        {
          'featureType': 'landscape',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'landscape.man_made',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'landscape.natural',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'landscape.natural.landcover',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'landscape.natural.terrain',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'poi',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#000000'
            },
            {
              'lightness': 21
            }
          ]
        },
        {
          'featureType': 'poi',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'on'
            }
          ]
        },
        {
          'featureType': 'road',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#00ffff'
            }
          ]
        },
        {
          'featureType': 'road',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#00fbff'
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'color': '#000000'
            },
            {
              'lightness': 17
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry.stroke',
          'stylers': [
            {
              'color': '#000000'
            },
            {
              'lightness': 29
            },
            {
              'weight': 0.2
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'road.highway.controlled_access',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'road.arterial',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#00fffb'
            },
            {
              'lightness': 18
            }
          ]
        },
        {
          'featureType': 'road.arterial',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'road.local',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#00ffff'
            },
            {
              'lightness': 16
            }
          ]
        },
        {
          'featureType': 'road.local',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'transit',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#000000'
            },
            {
              'lightness': 19
            },
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'transit',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'transit.line',
          'elementType': 'geometry',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'transit.line',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'transit.station',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'water',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#000303'
            },
            {
              'lightness': 17
            }
          ]
        },
        {
          'featureType': 'water',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        }
      ]
    }
  },
  mounted () {
    if (this.companies.companies.length === 0) {
      this.getCompanies()
    }
    if (this.companies.ready) {
      this.$nextTick(function() {
        console.log('Map ready')
      })
    }
  },
  methods: {
    toggleInfoWindow: function(marker, idx) {
      var imgUrl, description, url
      if (marker.image) {
        imgUrl = marker.image.medium_url
      } else {
        imgUrl = 'https://placehold.it/250x125/292b2c?text=No+Image'
      }

      if (marker.description) {
        description = marker.description
      } else {
        description = 'No Description'
      }

      if (marker.url) {
        url = marker.url
      } else {
        url = 'No URl'
      }

      this.infoWindowPos = marker.position
      this.infoContent = `<div class='wrapper'><img src='${imgUrl}'><br><hr><br><h4>${marker.name}</h4><br><p>${description}</p><p><a href='${url}'>${url}</a></p></div>`
      // check if its the same marker that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    },
    ...mapActions([
      'getCompanies'
    ])
  },
  computed: {
    companies () {
      return this.$store.getters.companies
    },
    geoCoded () {
      let companies = []
      for (var company of this.companies.companies) {
        let position = { lat: parseFloat(company.location.latt), lng: parseFloat(company.location.longt) }
        company.position = position
        companies.push(company)
      }
      return companies
    },
    status () {
      if (this.companies.ready && !this.companies.loading) {
        return 'ready'
      } else if (!this.companies.ready && this.companies.loading) {
        return 'loading'
      }
    }
  }
}
</script>