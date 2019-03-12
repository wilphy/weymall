import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Nav from '@/components/pages/Nav'

Vue.use(Router)
Vue.use(Login)

export default new Router({
  routes: [
    {path: '/nav',name: 'Nav',component: Nav,
      children:[
        {path: '/',name: 'ShoppingMall',component: ShoppingMall},
      ]
    },
    {path: '/register', name: 'Register', component: Register},
    {path: '/login', name: 'Login', component: Login},
  ]
})
