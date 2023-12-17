// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from "@/guards/authGuard.js";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    beforeEnter: [authGuard],
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
      }
    ],
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.APP_URL),
  routes,
})

export default router
