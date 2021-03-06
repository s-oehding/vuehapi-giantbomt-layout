/**
 * Pages
 */
import IndexPage from './pages/IndexPage'
import FactsPage from './pages/FactsPage'
import MapPage from './pages/MapPage'
import GameDetail from './pages/GameDetail'
import TimelinePage from './pages/TimelinePage'
import PlatformsPage from './pages/PlatformsPage'
import PlatformDetail from './pages/PlatformDetail'
import SearchPage from './pages/SearchPage'
import Error404 from './pages/Error'

import TestPage from './pages/TestPage'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: IndexPage
  },
  {
    path: '/facts',
    name: 'Facts',
    component: FactsPage
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
  },
  {
    path: '/test',
    name: 'test',
    component: TestPage
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
