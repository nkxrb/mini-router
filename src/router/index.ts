// import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { createRouter, createWebHistory, createWebHashHistory } from '@/components/router'

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

const routes = [
  { path: '/home', name: 'home', component: Home },
  { path: '/about', name: 'about', component: About },
]

export default createRouter({
  routes,
  history: createWebHistory()
})