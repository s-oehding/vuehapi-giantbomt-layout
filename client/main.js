// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//
// import 'bulma'
import Vue from 'vue'
import VueRouter from 'vue-router'
import {ClientTable} from 'vue-tables-2'
Vue.use(ClientTable, {}, true)
// Vue.use(ServerTable, {}, true)

// ES build is more efficient by reducing unneeded components with tree-shaking.
// (Needs Webpack 2 or Rollup)
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
// Import styles if style-loader is available
// You have to manually add css files if lines below are not working
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

import App from './App'
Vue.component('app', App)

/**
 * App Components
 */
import './components'

/**
 * App Components
 */
import './directives/index'

/**
 * App Routes
 */
Vue.use(VueRouter, 'localhost:3000')
import routes from './routes.js'

/**
 * App Store
 * - VueX Statemanagement
 */
import store from './store/store'

const router = new VueRouter({
  mode: 'history',
  routes // short for routes: routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
})

