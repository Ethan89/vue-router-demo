import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home'
import Target from '../pages/Target'
import ScrollDemo from './../pages/scrollDemo.vue'
import AlloyFingerDouble from './../pages/AlloyFingerDouble.vue'
import skin from './../pages/skin.vue'
import PluginDemo from './../pages/pluginDemo.vue'
import asyncDemo from './../pages/asyncDemo.vue'
import asyncDemoChild from './../pages/asyncDemoChild.vue'

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
    {
      path: '/scrolldemo',
      name: 'ScrollDemo',
      component: ScrollDemo,
    },
    {
      path: '/alloyDemo',
      name: 'AlloyFingerDouble',
      component: AlloyFingerDouble,
    },
    {
      path: '/skin',
      name: 'Skin',
      component: skin,
    },
    {
      path: '/pluginDemo',
      name: 'PluginDemo',
      component: PluginDemo,
    },
    {
      path: '/asyncDemo',
      name: 'AsyncDemo',
      component: asyncDemo,
    },
    {
      path: '/asyncDemo/child',
      name: 'AsyncDemoChild',
      component: asyncDemoChild
    }
  ]
})
