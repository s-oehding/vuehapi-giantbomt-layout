/**
 * Pages
 */
import IndexPage from './pages/IndexPage'
import MapPage from './pages/MapPage'
import GameDetail from './pages/GameDetail'
import TimelinePage from './pages/TimelinePage'
import PlatformsPage from './pages/PlatformsPage'
import PlatformDetail from './pages/PlatformDetail'
import SearchPage from './pages/SearchPage'
import Error404 from './pages/Error'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: IndexPage
  },
  {
    path: '/map',
    name: 'Map',
    component: MapPage
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: TimelinePage
  },
  {
    path: '/platforms',
    name: 'Platforms',
    component: PlatformsPage
  },
  {
    path: '/platform/:id',
    name: 'platform',
    component: PlatformDetail
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchPage
  },
  {
    name: 'game',
    path: '/game/:id',
    component: GameDetail
  }
]

const error = [
  {
    path: '*',
    name: 'error',
    component: Error404
  }
]

export default [].concat(routes, error)
