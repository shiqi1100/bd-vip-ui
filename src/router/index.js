import {createRouter, createWebHashHistory} from 'vue-router'
import NProgress from 'nprogress'

export default function initRouter() {
    const router = createRouter({
        history: createWebHashHistory(),
        routes: [
            {
                path: "/",
                name: "home",
                component: () => import("@/views/home.vue"),
                meta: {
                    title: '主页'
                },
            }
        ],
        scrollBehavior(to, from, savedPosition) {
            return savedPosition || {top: 0}
        }
    })
    router.beforeEach(() => {
        NProgress.start()
    })
    router.afterEach(() => {
        NProgress.done()
    })
    return router
}
