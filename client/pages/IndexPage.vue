<template>
  <div>
    <preloader v-if="this.status === 'loading'"><p class="await">Loading...</p></preloader>
    <ul v-else-if="this.status === 'ready'" id="hexGrid">
      <li v-for="game in this.games.games"  class="hex">
        <div class="hexIn">
          <router-link :to="{ name: 'game', params: { id: game.id }}" class="hexLink">
            <img v-lazy="game.image.small_url"/>
            <h1>{{ game.name }}</h1>
            <p>Some sample text about the article this hexagon leads to</p>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
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
        console.log('App ready')
      })
    }
  },
  methods: {
    init () {
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
@import "../assets/scss/variables";
@import "~bootstrap/scss/mixins/breakpoints";

#hexGrid {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  font-family: 'Raleway', sans-serif;
  list-style-type: none;
  padding: 0 !important;
}

.hex {
  position: relative;
  visibility:hidden;
  outline:1px solid transparent; /* fix for jagged edges in FF on hover transition */

  &::after{
    content:'';
    display:block;
    padding-bottom: 86.602%;  /* =  100 / tan(60) * 1.5 */
  }

  .hexIn{
    position: absolute;
    width:96%;
    padding-bottom: 110.851%; /* =  width / sin(60) */
    margin:0 2%;
    overflow: hidden;
    visibility: hidden;
    outline:1px solid transparent; /* fix for jagged edges in FF on hover transition */
    transform: rotate3d(0,0,1,-60deg) skewY(30deg);
    & * {
      position: absolute;
      visibility: visible;
      outline:1px solid transparent; /* fix for jagged edges in FF on hover transition */
    }

    .hexLink {
      display:block;
      width: 100%;
      height: 100%;
      text-align: center;
      color: #fff;
      overflow: hidden;
      transform: skewY(-30deg) rotate3d(0,0,1,60deg);

      &:hover,
      &:focus {
        h1, p {
          color: rgba(240, 240, 240, 1);
          transform:translate3d(0,0,0);
        }
        img {
          opacity: 1;
        }
      }
    }
  }

  img {
    left: -100%;
    right: -100%;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    opacity: 0.5;
    transition: transform .75s ease-out, opacity .25s ease-out, color .75s ease-out;
    transform: rotate3d(0,0,0,0deg);
  }

  h1, p {
    width: 100%;
    padding: 5%;
    margin: 0;
    box-sizing:border-box;
    background-color: rgba(0, 229, 238, 0.8);
    font-weight: 300;
    color: rgba(41, 43, 44, 0);
    text-shadow: 1px 1px 1px #292b2c;
    transition: transform .75s ease-out, opacity .25s ease-out, color .75s ease-out;
  }

  h1 {
    bottom: 50%;
    padding-top:50%;
    font-size: 1rem;
    z-index: 1;
    transform:translate3d(0,-100%,0);

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 45%;
      width: 10%;
      text-align: center;
      border-bottom: 1px solid #fff;
    }
  }

  p {
    top: 50%;
    padding-bottom:50%;
    transform:translate3d(0,100%,0);
  }
}


/*** HEXAGON SIZING AND EVEN ROW INDENTATION *****************************************************************/

@media (min-width:1201px) { /* <- 10-9  hexagons per row */
  #hexGrid{
    padding-bottom: 4.4%;
    h1 { font-size: 1.15rem; }
    p { font-size: 0.95rem; }
  }
  .hex {
    width: 10%; /* = 100 / 5 */
    &:nth-child(19n+11){ /* first hexagon of even rows */
      margin-left:5%;  /* = width of .hex / 2  to indent even rows */
    }
  }
}

@media (max-width: 1200px) and (min-width:901px) { /* <- 5-4  hexagons per row */
  #hexGrid{
    padding-bottom: 4.4%;
    h1 { font-size: 1.15rem; }
    p { font-size: 0.95rem; }
  }
  .hex {
    width: 20%; /* = 100 / 5 */
    &:nth-child(9n+6){ /* first hexagon of even rows */
      margin-left:10%;  /* = width of .hex / 2  to indent even rows */
    }
  }
}

@media (max-width: 900px) and (min-width:601px) { /* <- 4-3  hexagons per row */
  #hexGrid{
    padding-bottom: 5.5%;
    h1 { font-size: 1.15rem; }
    p { font-size: 0.95rem; }
  }
  .hex {
    width: 25%; /* = 100 / 4 */
    &:nth-child(7n+5){ /* first hexagon of even rows */
      margin-left:12.5%;  /* = width of .hex / 2  to indent even rows */
    }
  }
}

@media (max-width: 600px) and (min-width:401px) { /* <- 3-2  hexagons per row */
  #hexGrid{
    padding-bottom: 7.4%;
    h1 { font-size: 1.15rem; }
    p { font-size: 0.95rem; }
  }
  .hex {
    width: 33.333%; /* = 100 / 3 */
    &:nth-child(5n+4){ /* first hexagon of even rows */
      margin-left:16.666%;  /* = width of .hex / 2  to indent even rows */
    }
  }
}

@media (max-width: 400px) { /* <- 2-1  hexagons per row */
  #hexGrid{
    padding-bottom: 11.2%;
    h1 { font-size: 1.15rem; }
    p { font-size: 0.95rem; }
  }
  .hex {
    width: 50%; /* = 100 / 3 */
    &:nth-child(3n+3){ /* first hexagon of even rows */
      margin-left: 25%;  /* = width of .hex / 2  to indent even rows */
    }
  }
}
</style>
