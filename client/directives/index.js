import Vue from 'vue'

Vue.directive('img', function(url) {
  /* eslint-disable no-undef */
  var img = new Image()
  img.onload = function() {
    this.el.src = url
  }.bind(this)
})
