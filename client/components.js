import Vue from 'vue'

import Navbar from './partials/Navbar'
Vue.component('navbar', Navbar)
import Preloader from './partials/Preloader'
Vue.component('preloader', Preloader)
import Sidebar from './partials/Sidebar'
Vue.component('sidebar', Sidebar)
import SiteFooter from './partials/SiteFooter'
Vue.component('site-footer', SiteFooter)

import VueLazyBackgroundImage from 'vue-lazy-background-images'
Vue.component('lazy-background', VueLazyBackgroundImage)
