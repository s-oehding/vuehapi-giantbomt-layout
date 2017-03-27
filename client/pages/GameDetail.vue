<template>
  <div class="container game-container">
    <div class="row">
      <div v-if="gameScreenshots" class="col-sm-12 cover-image">
        <ul class="screen-slider">
          <li  v-for="img in gameScreenshots" class="slider-item">
            <img :src="img" alt="">
          </li>
        </ul>
      </div>
      <div class="col-sm-12">
        <h1 class="jumbotron">{{ game.name }}</h1>
        <ul class="list-inline">
          <li class="list-inline-item badge badge-default"><i class="fa fa-star"></i> Rating: {{ game.rating }} %</li>
          <li class="list-inline-item badge badge-default"><i class="fa fa-count"></i> Ratingcount: {{ game.rating_count }}</li>
          <li class="list-inline-item badge badge-default"><i class="fa fa-count"></i> Popularity: {{ game.popularity}}</li>
        </ul>
        <hr>
      </div>
      <div class="col-sm-12 col-md-6">
        <h4>Story:</h4>
        <p>{{ game.storyline }}</p>
        <hr>
        <h4>Summary:</h4>
        <p>{{ game.summary }}</p>
        <div class="card col-sm-12">
          <div class="card-img-top">
            <img v-if="coverImage.image" :src="coverImage.image" :alt="game.name">
          </div>
          <div class="card-block">
            <h4 class="card-title">Cover</h4>
            <div class="card-text">
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="row meta">
          <div class="card col-sm-12">
            <div class="card-block">
              <h4 class="card-title">Publisher:</h4>
              <div class="card-text">
                <ul class="list-inline">
                  <li  v-for="publisher in game.publishers" class="list-inline-item badge badge-default">{{ publisher }}</li>
                </ul>
                <span>Releasedate: <time :datetime="game.first_release_date">{{ game.first_release_date | toDate }}</time></span>
              </div>
            </div>
          </div>
          <div class="card col-sm-12">
            <div class="card-block">
              <h4 class="card-title">Keywords:</h4>
              <div class="card-text">
                <ul class="list-inline">
                  <li  v-for="keyword in game.keywords" class="list-inline-item badge badge-default">{{ keyword }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
// import $ from 'jquery'
import 'slick-carousel'
// import 'slick-carousel/slick/slick.scss's
// import 'slick-carousel/slick/slick-theme.scss's
import { toDate } from '../filters'

export default {
  name: 'game-detail',
  components: {
  },
  data () {
    return {
      game: {},
      gameScreenshots: []
    }
  },
  mounted () {
    this.game = this.selected.game[0]
  },
  methods: {
    filterGames (obj) {
      return obj.id === this.$route.params.id
    }
  },
  computed: {
    selected: function () {
      return {
        game: this.$parent.games.filter(this.filterGames)
      }
    }
  },
  filters: {
    toDate
  }
}
</script>

<style lang="sass">
.game-container {
  margin-top: 55px;
  margin-bottom: 60px;
  .slick-slide {
    height: auto;
  }
  .cover-image {
    margin: 2rem 0;
    img {
      max-width: 100%;
      height:auto;
      margin:0 auto;
    }
  }
  .slick-prev:before, .slick-next:before {
    font-family: 'slick';
    font-size: 2.25rem;
    line-height: 2.25;
    opacity: .75;
    color: #292b2c;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: all 0.25s ease;
    &:hover {
      color: turquoise;
    }
  }
  .slick-prev, .slick-next {
    top: 100%;
    font-size: 2.25rem;
    width: 2.25rem;
    height: 2.25rem;
    line-height: 2.25rem;
    z-index: 9999;
  }

  .slick-next {
    right:2rem
  }
  .slick-prev {
    left: 2rem;
  }

  .card-img-top {
    object-fit: cover;
    padding-top: 1rem;
    img {
      max-width: 100% !important;
      height: auto !important;
    }
  }
}
</style>
