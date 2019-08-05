import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

export const menuMap: any = [
    {
        path: '/home/table',
        name: 'Table',
        component: () => import('@/views/table/Table.vue'),
        meta: {
            title: '表格展示',
            icon: 'el-icon-s-data',
            permission: ['admin']
        }
    },
    {
        path: '/home/charts',
        name: 'Charts',
        component: () => import('@/views/charts/Charts.vue'),
        meta: {
            title: '图标展示',
            icon: 'el-icon-pie-chart',
            permission: ['admin']
        }
    },
    {
        path: '/home/permissions',
        name: 'Permissions',
        component: () => import('@/views/permissions/Permissions.vue'),
        meta: {
            title: '权限展示',
            icon: 'el-icon-s-custom',
            permission: ['admin']
        }
    }
]

const router =  new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Login',
            component: () => import('@/views/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/views/home/Home.vue'),
            meta: {
                title: '学习系统',
                permission: ['admin']
            },
            children: menuMap,
            redirect: '/home/table'
        },
        {
            path: '/404',
            name: '404',
            component: () => import('@/views/404.vue'),
            meta: { title: '页面找不到了' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})


// 路由钩子
router.beforeEach((to: any, from: any, next: any) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router