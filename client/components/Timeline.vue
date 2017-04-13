<template>
  <section id="timeline">
    <div id="timelineWrapper" class="timeline-wrapper">
      <ul class="timeline timeline-horizontal">
        <timeline-item
          v-for="(entry, index) in sorted.data"
          :key="entry.release_date"
          :id="entry.id"
          :cover="entry.image.small_url"
          :name="entry.name"
          :releasedate="entry.release_date | toDate"
          ></timeline-item>
      </ul>
    </div>
    <div class="controls">
      <i v-on:click="scrollLeft" class="fa fa-chevron-left arrow arrow-left"></i>
      <i v-on:click="scrollRight" class="fa fa-chevron-right arrow arrow-right"></i>
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
import TimelineItem from './TimelineItem'
import { toDate } from '../filters'

export default {
  name: 'timeline',
  components: {
    TimelineItem
  },
  props: ['data', 'ready'],
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    scrollLeft () {
      document.getElementById('timelineWrapper').scrollLeft -= 250
    },
    scrollRight () {
      document.getElementById('timelineWrapper').scrollLeft += 250
    }
  },
  filters: {
    toDate
  },
  computed: {
    sorted: function () {
      return {
        data: _.orderBy(this.data, ['Object', 'release_date'], ['asc'])
      }
    }
  }
}
</script>

<style lang="sass">

$brand-primary: turquoise;
$gray-dark: #292b2c;

$timeline-bg: #fbfbfb;
$timeline-height: 10px;
$timeline-border-color: #999;
$timeline-border-width: 1px;
$timeline-gutter: 20px;
$timeline-shadow: 0 0 2rem 0 rgba(#000,0.25), inset 0 0 0.4em rgba(#000,0.25);

$timeline-panel-arrow-size: 15px;
$timeline-panel-arrow-padding: 15px;

$dot-bg: $gray-dark;
$dot-hover-bg: orangered;
$dot-size: 50px;
$dot-hover-size: 1.6rem;
$dot-border: #666;
$dot-shadow: 0 0.1rem 1rem 0 rgba(#000,0.1), inset 0 0 0.4em rgba(#666,0.1), inset 0 0.4rem 0.1rem rgba(#666,0.3);
$dot-border-width: 0.16rem;

$notch-size: 1rem;

$label-bg: #E1F0EE;
$label-hover-bg: darken($label-bg,5);
$label-padding: 0.4rem;
$label-divider: 1px solid rgba(#fff,0.8);

$scroll-thumb: transparent;//#f1f5f7;

#timelineWrapper {
  overflow: scroll;
  scroll-behavior: smooth;
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

#timeline {
  .controls {
    position: fixed;
    bottom: 4rem;
    width: 100%;
    margin-left: 70vw;
    font-size: 1.75rem;
    cursor: pointer;
    i {
      margin: 1rem;
      &:hover {
        color: $brand-primary;
        transition: all .2s ease;
      }
    }
  }
  .play{
    animation: anim 20s infinite linear;
  }
  .pause{
      animation-play-state: paused;
  }
  @keyframes anim { 
      0%   {transform: translateX(0%);}
      100% {transform: translateX(-100%);}
  }
}

.timeline,
.timeline-horizontal {
  list-style: none;
  padding: 20px;
  position: relative;
}

.timeline {

  &:before {
    top: $timeline-gutter * 2;
    bottom: 0;
    position: absolute;
    content: " ";
    width: $timeline-height;
    background-color: $timeline-bg;
    left: 50%;
    margin-left: -1.5px;
  }

  .timeline-item {
    display: table-cell;
    width: 8vw;
    float: none !important;
    padding-left: 0px;
    padding-right: $timeline-gutter;
    margin: 0 auto;
    vertical-align: bottom;
    margin-bottom: $timeline-gutter;
    position: relative;
    top: 2px;
    left: 0px;

    &:before,
    &:after {
      content: "";
      display: table;
    }

    &:after {
      clear: both;
    }

    &:hover {
      .wrapper {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1); 
      }
    }

    &:last-child:nth-child(even) {
      float: right;
    }

    &:nth-child(even) {
      .timeline-panel {
        float: right;
        left: $timeline-gutter;
        &:before {
          border-left-width: 0;
          border-right-width: 14px;
          left: -14px;
          right: auto;
        }
      }
    }

    .timeline-dot {
      color: #fff;
      width: $dot-size;
      height: $dot-size;
      line-height: $dot-size;
      font-size: $dot-size / 2;
      text-align: center;
      position: absolute;
      top: $timeline-gutter;
      left: 50%;
      margin-left: -25px;
      background-color: $gray-dark;
      border: 3px solid #ffffff;
      z-index: 100;
      border-top-right-radius: 50%;
      border-top-left-radius: 50%;
      border-bottom-right-radius: 50%;
      border-bottom-left-radius: 50%;
      i, .fa, .glyphicon {
        height: $dot-size;
        line-height: $dot-size;
        font-size: $dot-size / 2;
      }
    }

    .timeline-date {
      display: inline-block;
      position: absolute;
      bottom: -1rem;
      left: 4.2rem;
    }

    .timeline-panel {
      position: relative;
      width: 33.33vw;
      float: left;
      right: $timeline-gutter;
      border-radius: 2px;
      padding: 0;
      
      &:before {
        position: absolute;
        display: inline-block;
        border-top: $timeline-panel-arrow-size solid transparent;
        border-left: $timeline-panel-arrow-size solid #fff;
        border-right: 0 solid #fff;
        border-bottom: $timeline-panel-arrow-size solid transparent;
        content: " ";
        top: auto;
        bottom: -$timeline-panel-arrow-size;
        left: $timeline-panel-arrow-padding;
        right: auto;
      }
      .img-wrapper {
        overflow: hidden;
        position: relative;
        img {
          width:100%;
          height: auto;
        }
        .img-overlay {
          background: $gray-dark;
          position: relative;
          display: block;
          top: 0;
          left:0;
          width:100%;
          height:100%;
          padding: 1rem;
          transition: all .25s ease;  
        }
        &:hover {
          .img-overlay {
            left:0;
          }
        }
      }
      .content-wrapper {
        padding: 1rem;
        margin-top: .5rem;
        // position: absolute;
        bottom:0;
        display:flex;
        align-items:flex-start;
        flex-direction:column;
        min-height:130px;
        width:100%;
        background: #ffffff;
      }
    }
    
    .desc {
      margin: 1rem 0 0;
      padding: .5rem;
      letter-spacing: 0.1em;
      font-weight: bold;
      font-size: 11px;
      line-height: 1.125;
      color: turquoise;
    }
  }

  &.timeline-horizontal {
    list-style: none;
    position: relative;
    padding: $timeline-gutter 0px $timeline-gutter 0px;
    display: inline-block;

    &:before {
      height: $timeline-height;
      top: auto;
      bottom: calc(#{$timeline-gutter} - calc(#{$timeline-height / 5}));
      left: -2rem;
      right: 0;
      width: 105%;
      margin-bottom: $timeline-gutter;
    }

    .timeline-item {
        display: table-cell;
        min-width: 16vw;
        float: none !important;
        padding-left: 0px;
        padding-right: $timeline-gutter;
        margin: 0 auto;
        vertical-align: bottom;
      &:before,
      &:after {
        display: none;
      }
      .timeline-panel {
          top: auto;
          bottom: 64px;
          display: inline-block;
          float: none !important;
          left: 0 !important;
          right: 0 !important;
          width: 100%;
          margin-bottom: $timeline-gutter;
        &:before {
          top: auto;
          bottom: -$timeline-panel-arrow-size;
          right: auto;
          border-right: $timeline-panel-arrow-size solid transparent !important;
          border-top: $timeline-panel-arrow-size solid #fff !important;
          border-bottom: 0 solid #fff !important;
          border-left: $timeline-panel-arrow-size solid transparent !important;
         left: $timeline-panel-arrow-padding;
        }
      }
    }
    .timeline-dot {
      top: auto;
      bottom: 0px;
      left: calc((#{$timeline-gutter} + #{$timeline-panel-arrow-padding}) - calc(#{$timeline-panel-arrow-size} / 4.444));
    }
  }
}

</style>
