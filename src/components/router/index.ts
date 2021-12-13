import { App, reactive, ref } from 'vue';
import RouterLink from './RouterLink.vue'
import RouterView from './RouterView.vue'

export const routerKey = Symbol('routerKey')
export const routeLocationKey = Symbol('routeLocationKey')
export const routerViewLocationKey = Symbol('routerViewLocationKey')

const currentRoute = reactive({})
const routeMap = new Map()

const addRoute = (route, parent) => {
  let path = location.pathname
  let fullPath = parent ? parent.fullPath + route.path : route.path
  Object.assign(route, { fullPath })
  if (path === fullPath) {
    history.pushState({ name: route.name }, route.name)
  }
  routeMap.set(route.name, route)
  if (route.children) {
    route.children.forEach(c => {
      addRoute(c, route)
    })
  }
}

export function createRouter(option) {
  const { routes, history } = option
  const reactiveRoute = routes

  routes.forEach(r => {
    addRoute(r, null)
  })

  const push = (to) => {
    window.history.pushState({ name: to }, to)
    Object.assign(currentRoute, matchRoute(to))
  }

  const router = {
    push,
    reactiveRoute,
    currentRoute,
    install(app: App) {
      const router = this
      app.component('RouterLink', RouterLink);
      app.component('RouterView', RouterView);
      app.provide(routerKey, router);
      app.provide(routeLocationKey, reactive(reactiveRoute));
      app.provide(routerViewLocationKey, currentRoute);
    }
  }

  return router
}

function matchRoute(state) {
  return routeMap.get(state)
}

export function createWebHistory() {
  window.addEventListener('popstate', (e) => {
    const { state } = e
    let route = matchRoute(state.name)
    Object.assign(currentRoute, route)
  });
}

export function createWebHashHistory() {
  window.addEventListener('hashchange', (e) => {
    let route = matchRoute(location.hash)
    Object.assign(currentRoute, route)
  });
}