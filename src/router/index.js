import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginView.vue')
        },
        {
            path: '/signup',
            name: 'signup',
            component: () => import('@/views/SignupView.vue')
        },
        {
            path: '/',
            name: 'postList',
            component: () => import('@/views/PostListView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/posts/:id',
            name: 'postDetail',
            component: () => import('@/views/PostDetailView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/posts/create',
            name: 'postCreate',
            component: () => import('@/views/PostFormView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/posts/:id/edit',
            name: 'postEdit',
            component: () => import('@/views/PostFormView.vue'),
            meta: { requiresAuth: true }
        }
    ]
})

// 네비게이션 가드
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
        next('/login')
    } else {
        next()
    }
})

export default router