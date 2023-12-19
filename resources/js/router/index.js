// Composables
import { authenticated } from '@/guards/authenticated'
import { guest } from '@/guards/guest'
import { useAppStore } from '@/store/app'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    beforeEnter: [authenticated],
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/auth/',
    component: () => import('@/layouts/auth/Auth.vue'),
    beforeEnter: [guest],
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/auth/Login.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/auth/Register.vue'),
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/views/auth/ForgotPassword.vue'),
      },
      {
        path: 'reset-password/:token/:email',
        name: 'ResetPassword',
        component: () => import('@/views/auth/ResetPassword.vue'),
      }
    ],
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.APP_URL),
  routes,
})

export default router
