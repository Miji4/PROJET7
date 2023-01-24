import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
//import Signup from '../views/Signup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/filactualite',
    name: 'Filactualite',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "filactualite" */ '../views/Filactualite.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
  },
  {
    path: '/profil',
    name: 'Profil',
    component: () => import(/* webpackChunkName: "profil" */ '../views/Profil.vue')
  },
  
  {
    path: '/post/:id',
    name: 'Post',
    component: () => import(/* webpackChunkName: "about" */ '../views/Post.vue')
  },
  {
    path: '/utilisateurs',
    name: 'Utilisateurs',
    component: () => import(/* webpackChunkName: "about" */ '../views/Utilisateurs.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
