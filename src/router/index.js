import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home'
import Target from '../pages/Target'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/target',
      name: 'Target',
      component: Target,
      children: [{
        path: 'childTarget',
        component: Target
      }],
    },
    {
      path: '/target/:userId',
      name: 'target',
      component: Target
    },
    {
      path: '/target/:userId/:userName',
      name: 'target2',
      component: Target
    },
  ]
})
