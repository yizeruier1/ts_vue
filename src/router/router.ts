import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Login',
            component: () => import('@/views/Login.vue')
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/views/home/Home.vue')
        }
        // {
        //     path: '/about',
        //     name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        // }
    ]
})