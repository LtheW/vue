import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Submit from '../views/Results/Submit.vue'
import Maintainer_Add from '../views/Maintainer/Add.vue'
import Login from '../views/Login.vue'
import Repaired from '../views/Results/Repaired.vue'
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
    children: [{
        path: '/',
        name: 'repair',
        component: () => import('../views/Results/Repaired.vue'),
      },
      {
        path: '/form',
        name: 'form',
        component: () => import('@/views/Form/Form')
      },
      {
        path: '/maintainer',
        name: 'Maintainer',
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
        path: '/completed',
        name: 'completed',
        component: Completed,
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
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router