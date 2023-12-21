// Composables
import { authenticated } from '@/guards/authenticated'
import { guest } from '@/guards/guest'
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
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/profile/Show.vue'),
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
        path: 'reset-password/:token',
        name: 'ResetPassword',
        component: () => import('@/views/auth/ResetPassword.vue'),
      }
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.APP_URL),
  routes,
})

export default router
