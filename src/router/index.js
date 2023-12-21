import { createRouter, createWebHistory } from 'vue-router'
import BlogView from '../views/BlogView.vue'
import AddPostView from '../views/AddPostView.vue'
import DetailPostView from '../views/DetailPost.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/',
     redirect: '/login'
     },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/Posts',
      name: 'blog',
      component: BlogView,
      meta: {
        requiresAuth: true
      } 
    },
    {
      path: '/Post/add',
      name: 'add',
      component: AddPostView,
      meta: {
        requiresAuth: true
      } 
    },
    {
      path: '/Post/:postId',
      name: 'detailPost',
      component: DetailPostView,
      meta: {
        requiresAuth: true
      } 
    },
    {
      path: '/editPost/:postId',
      name: 'editPost',
      component: AddPostView,
      props: true,
      meta: {
        requiresAuth: true
      } 

    },
  ]
})



router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      next({
        path: '/'
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router
