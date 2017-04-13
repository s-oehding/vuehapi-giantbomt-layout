<template>
  <div>
    <preloader v-if="status === 'loading'">Loading Platform Details</preloader>
    <div v-else-if="status === 'ready'" class="container platform-container">
      <div class="row">
        <div v-if="platformDetail.image" class="col-sm-12 cover-image">
          <img v-lazy="platformDetail.image.screen_url" alt="">
        </div>
        <div class="col-sm-12">
          <h1 class="jumbotron">{{ platformDetail.name }}</h1>
          <ul class="list-inline">
            <li class="list-inline-item badge badge-default"><i class="fa fa-star"></i> Releasedate: {{ platformDetail.release_date }} %</li>
            <li class="list-inline-item badge badge-default"><i class="fa fa-money"></i> Original Price: {{ platformDetail.original_price }} $</li>
          </ul>
          <hr>
        </div>
        <div class="col-sm-12 col-md-6">
          <h4>Summary:</h4>
          <p>{{ platformDetail.deck }}</p>
          <hr>
        </div>
        <div class="col-sm-12 col-md-6">
          <div class="row meta">
            <div class="card col-sm-12">
              <div class="card-block">
                <h4 class="card-title">Publisher:</h4>
                <div class="card-text">
                  <ul class="list-inline">
                    <li  v-for="publisher in platformDetail.publishers" class="list-inline-item badge badge-default">{{ publisher }}</li>
                  </ul>
                  <span>Releasedate: <time :datetime="platformDetail.release_date">{{ platformDetail.release_date| toDate }}</time></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div v-html="platformDetail.description"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toDate } from '../filters'
import { mapActions } from 'vuex'
export default {
  name: 'platform-detail',
  components: {
  },
  data () {
    return {
    }
  },
  mounted () {
    this.getPlatform(this.$route.params.id)
  },
  methods: {
    ...mapActions([
      'getPlatform'
    ])
  },
  computed: {
    platforms () {
      return this.$store.getters.platforms
    },
    platformDetail () {
      return this.$store.getters.platformDetail
    },
    status () {
      if (this.platforms.ready && !this.platforms.loading) {
        return 'ready'
      } else if (!this.platforms.ready && this.platforms.loading) {
        return 'loading'
      } else if (!this.platforms.ready && !this.platforms.loading) {
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
.platform-container {
  margin-top: 55px;
  margin-bottom: 60px;
  .slick-slide {
    height: auto;
  }
  .cover-image {
    margin: 2rem 0;
    img {
      width: 100%;
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
figcaption {
  font-size: 75%;
}
</style>
