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
     redirect: '/admin/login'
     },
    {
      path: '/admin/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin/Posts',
      name: 'blog',
      component: BlogView,
      meta: {
        requiresAuth: true
      } 
    },
    {
      path: '/admin/post/add',
      name: 'add',
      component: AddPostView,
      meta: {
        requiresAuth: true
      } 
    },
    {
      path: '/admin/post/:postId',
      name: 'detailPost',
      component: DetailPostView,
      meta: {
        requiresAuth: true
      } 
    },
    {
      path: '/admin/edit/:postId',
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
