import { createRouter, createWebHistory } from 'vue-router'
import firebase from '../config/firebase'


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue')
  },
  {
    path : '/login',
    name : 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path : '/dashboard',
    name : 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta:{requiresAuth:true}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(){
    var link = window.location.href
    if(link.indexOf('#') != -1){
      var elm = document.getElementById(link.split('#')[1])
      if(elm != undefined){
        elm.scrollIntoView({
          behavior:'smooth'
        })
      }
    }
  }
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth.currentUser

  if(requiresAuth && !currentUser){
    next('/login')
  }else{
    next()
  }
})

export default router
