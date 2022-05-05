import { createRouter, createWebHashHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import settings from '../views/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/settings',
    name: 'settings',
    component: settings
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
