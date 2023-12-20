import { createRouter, createWebHistory } from 'vue-router'
import BlogView from '../views/BlogView.vue'
import AddPostView from '../views/AddPostView.vue'
import DetailPostView from '../views/DetailPost.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Posts',
      name: 'blog',
      component: BlogView
    },
    {
      path: '/Post/add',
      name: 'add',
      component: AddPostView
    },
    {
      path: '/Post/:postId',
      name: 'detailPost',
      component: DetailPostView
    },
    {
      path: '/editPost/:postId',
      name: 'editPost',
      component: AddPostView,
      props: true,

    },
  ]
})

export default router
