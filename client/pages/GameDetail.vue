<template>
<div>
  <preloader v-if="status === 'loading'">Loading Game Details</preloader>
  <div v-else-if="status === 'ready'" class="container game-container">
    <div class="row">
      <div v-if="gameDetail.image" class="col-sm-12 cover-image">
        <img v-lazy="gameDetail.image.screen_url" alt="gameDetail.name">
      </div>
      <div class="col-sm-12">
        <h1 class="jumbotron">{{ gameDetail.name }}</h1>
        <ul class="list-inline">
          <li class="list-inline-item badge badge-default"><i class="fa fa-star"></i> Rating: {{ gameDetail.rating }} %</li>
          <li class="list-inline-item badge badge-default"><i class="fa fa-count"></i> Ratingcount: {{ gameDetail.rating_count }}</li>
          <li class="list-inline-item badge badge-default"><i class="fa fa-count"></i> Popularity: {{ gameDetail.popularity}}</li>
        </ul>
        <hr>
      </div>
      <div class="col-sm-12 col-md-6">
        <h4>Story:</h4>
        <p>{{ gameDetail.deck }}</p>
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="row meta">
          <div class="card col-sm-12">
            <div class="card-block">
              <h4 class="card-title">Publisher:</h4>
              <div class="card-text">
                <ul class="list-inline">
                  <li  v-for="publisher in gameDetail.publishers" class="list-inline-item badge badge-default">{{ publisher.name }}</li>
                </ul>
                <span>Releasedate: <time :datetime="gameDetail.original_release_date">{{ gameDetail.original_release_date | toDate }}</time></span>
              </div>
            </div>
          </div>
          <div class="card col-sm-12">
            <div class="card-block">
              <h4 class="card-title">Platforms:</h4>
              <div class="card-text">
                <ul class="list-inline">
                  <li v-for="platform in gameDetail.platforms" class="list-inline-item badge badge-default">
                    <router-link :to="{ name: 'platform', params: { id: platform.id }}">{{ platform.name }}</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-if="gameDetail.images" class="card col-sm-12">
            <div class="card-block">
              <h4 class="card-title">Screenshots:</h4>
              <div class="card-text">
              <b-carousel 
                controls
                indicators
                :interval="5000"
                background="grey">
                 <!-- Slides with image -->
                  <b-carousel-slide
                    v-for="screenshot in gameDetail.images"
                    background="grey"
                    height="300px"
                    :img="screenshot.screen_url">
                  </b-carousel-slide>
              </b-carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div id="story" v-html="gameDetail.description"></div>
      </div>
    </div>
    <div class="row">
      <div class="card col-sm-12">
          <div class="card-block">
            <h4 class="card-title">Characters:</h4>
            <div class="card-text">
              <ul class="list-inline">
                <li  v-for="character in gameDetail.characters" class="list-inline-item badge badge-default">
                  {{ character.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card col-sm-12">
          <div class="card-block">
            <h4 class="card-title">Game concepts:</h4>
            <div class="card-text">
              <ul class="list-inline">
                <li  v-for="concept in gameDetail.concepts" class="list-inline-item badge badge-default">
                  {{ concept.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div> 
</div>
</template>

<script>
import { toDate } from '../filters'
import { mapActions } from 'vuex'

export default {
  name: 'game-detail',
  components: {
  },
  data () {
    return {
    }
  },
  mounted () {
    this.getGame(this.$route.params.id)
  },
  methods: {
    appendDescription () {
      var desc = document.getElementById('description')
      desc.innerHTML = this.gameDetail.description
    },
    ...mapActions([
      'getGame'
    ])
  },
  computed: {
    games () {
      return this.$store.getters.games
    },
    gameDetail () {
      return this.$store.getters.gameDetail
    },
    status () {
      if (this.games.ready && !this.games.loading) {
        if (this.gameDetail.length > 0) {
          this.appendDescription()
        }
        return 'ready'
      } else if (!this.games.ready && this.games.loading) {
        return 'loading'
      } else if (!this.games.ready && !this.games.loading) {
        return 'waiting'
      }
    }
  },
  filters: {
    toDate
  }
}
</script>

<style lang="sass">
@import "../assets/scss/variables";
//
// Basic Bootstrap table
//
#story {
  table {
    width: 100%;
    max-width: 100%;
    margin-bottom: $spacer;

    th,
    td {
      padding: $table-cell-padding;
      vertical-align: top;
      border-top: $table-border-width solid $table-border-color;
    }

    thead th {
      vertical-align: bottom;
      border-bottom: (2 * $table-border-width) solid $table-border-color;
    }

    tbody + tbody {
      border-top: (2 * $table-border-width) solid $table-border-color;
    }

    table {
      background-color: $body-bg;
    }
  }
}

.game-container {
  margin-top: 55px;
  margin-bottom: 60px;
  .badge {
    a {
      color: #fff;
    }
  }
  .cover-image {
    margin: 2rem 0;
    img {
      width: 100%;
      height:auto;
      margin:0 auto;
    }
  }
  .img-fluid {
    width:100%;
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
