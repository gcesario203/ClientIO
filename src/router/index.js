import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Create from '../components/Create.vue'
import Hub from '../components/Hub.vue'
import ChatRoom from '../components/ChatRoom.vue'
import Utils from '../utils/utils'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/hub',
    name: 'Hub',
    component: Hub,
    meta: { requireAuth: true }
  },
  {
    path: '/chatRoom/:id',
    name: 'ChatRoom',
    component: ChatRoom,
    meta: { requireAuth: true }
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    const lResponse = await Utils.ValidateToken()

    lResponse === false ? next({path: '/'}) : next() 
  } else {
    if(to.path === '/' || to.path === '/create' || to.path === '/Create'){
      const lResponse = await Utils.ValidateToken()

      lResponse === false ? next() : next({path:'/Hub'})
    }
    else
    {
      next()
    }
  }
})

export default router
