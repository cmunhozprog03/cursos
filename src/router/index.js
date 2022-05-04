import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/courses',
    name: 'CoursesList',
    component: () => import('@/views/courses/CoursesList.vue')
  },
  {
    path: '/courses/:id',
    name: 'CourseDetails',
    component: () => import('@/views/courses/CourseDetails.vue')
  },
  {
    path: '/courses/:id/edit',
    name: 'CourseEdit',
    component: () => import('@/views/courses/CourseEdit.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/auth/RegisterView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
