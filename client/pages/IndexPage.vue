<template>
  <div>
    <preloader v-if="this.status === 'loading'"><p class="await">Loading...</p></preloader>
    <div v-else-if="this.status === 'ready'" id="grid">
      <!-- <img v-for="game in this.games.games" src="game.image.small_url" class="hex" :alt="game.name"> -->
       <router-link v-for="game in this.games.games" :to="{ name: 'game', params: { id: game.id }}">
      <lazy-background
        :image-source="game.image.small_url"
        loading-image="../../public/spinner.svg"
        error-image="/img/error.png"
        image-class="hex"
        background-size="cover"
        :image-success-callback="init">
      </lazy-background>
      </router-link>
    </div>
  </div>
</template>

<script>
import grid from 'hex-grid'

import { mapActions } from 'vuex'
export default {
  data () {
    return {
      config: {
        perPage: 100,
        fields: ['id', 'name', 'image']
      }
    }
  },
  mounted () {
    if (this.games.games.length === 0) {
      this.getGames(this.config)
    }
    if (this.games.ready) {
      this.$nextTick(function() {
        this.init()
      })
    }
  },
  methods: {
    init () {
      this.$nextTick(function() {
        var hexes = document.querySelectorAll('.hex')
        var root = document.querySelector('#grid')
        /* eslint-disable no-unused-vars */
        var g
        function scan () {
          g = grid({ element: root, spacing: 8 }, hexes)
        }

        scan()
        window.addEventListener('resize', scan)
        window.addEventListener('load', scan)

        // var prev
        // root.addEventListener('mousemove', function (ev) {
        //   var h = g.lookup(ev.pageX, ev.pageY)
        //   if (!h) return
        //   if (prev) prev.style.opacity = 0.5
        //   h.style.opacity = 1
        //   prev = h
        // })
      })
    },
    ...mapActions([
      'getGames'
    ])
  },
  computed: {
    games () {
      return this.$store.getters.games
    },
    status () {
      if (this.games.ready && !this.games.loading) {
        return 'ready'
      } else if (!this.games.ready && this.games.loading) {
        return 'loading'
      } else if (!this.games.ready && !this.games.loading) {
        return 'waiting'
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.hex {
  width: 150px;
  height: 150px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  object-fit: cover;
  background-repeat: no-repeat;
  background-position: center center;
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
  }
}
</style>
