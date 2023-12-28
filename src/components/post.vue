<template>
  <div class="flex justify-start space-x-8 pt-2 ml-8">
    <div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
      <a href="#">
          <img class="rounded-t-md rounded-b-md" :src="`/src/assets/${post.image}`" alt="">
        </a>

      <div class="flex justify-end space-x-4 mr-4 pt-2">
        <router-link v-if="isAdmin" :to="{ name: 'editPost', params: { postId: post.id } }">
          <i class="ri-file-edit-line text-green-500 text-xl font-semibold cursor-pointer"></i>
        </router-link>
        <i v-if="isAdmin" class="ri-delete-bin-line text-red-500 text-xl font-semibold cursor-pointer" @click="() => deletePost(post.id)"></i>
      </div>

      <div class="p-2">
        <div class="flex space-x-2">
          <i class="ri-calendar-line text-gray-500 text-sm"></i>
          <p v-if="post" class="font-semibold text-gray-500 white text-sm"> {{ post.heure }}</p>
        </div>
        <a>
          <h5 v-if="post" class="text-gray-900 font-bold text-2xl tracking-tight mb-2 pt-1 line-clamp-2">{{ post.title }}</h5>
        </a>
        <p v-if="post" class="font-normal text-gray-700 mb-3 line-clamp-4">{{ post.description }}</p>

        <router-link :to="{ name: 'detailPost', params: { postId: post.id } }">
          <button class="mb-2 float-right text-white bg-green-700 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center">Lire l'article</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePostStore } from '../stores/postStore';
import { useAuthStore } from '../stores/authStore';

const props = defineProps(['post']);
const store = usePostStore();
const authStore = useAuthStore();

const isAdmin = authStore.isAdmin;

const deletePost = async (postId) => {
  const confirmDelete = confirm('Are you sure you want to delete this post?');
  if (confirmDelete) { 
    try {
      await store.deletePost(postId);
      console.log('Deleting post with custom ID:', postId);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }
};

</script>
