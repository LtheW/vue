import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Submit from'../views/Result/Submit.vue'
import Maintainer_Add from'../views/Maintainer/Add.vue'
import Login from'../views/Login.vue'
import Repaired from'../views/Result/Repaired.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/',
        name: 'search',
        component: () => import('@/views/About')
      },
      {
        path: '/form',
        name: 'form',
        component: () => import('@/views/Form/Form')
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Maintainer/Maintainer')
      },
      {
        path: '/submit',
        name: 'submit',
        component: Submit,
      },
      {
        path: '/repaired',
        name: 'repaired',
        component: Repaired,
      },
      {
        path: '/maintainer_add',
        name: 'add',
        component: Maintainer_Add,
      },
    ]
    },
  

]

const router = new VueRouter({
  mode:'history',
  base: process.env.BASE_URL,
  routes
})

export default router
