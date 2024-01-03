<template>
  <div class="row pt-3">
    <div class="col-6">
      <div class="flex flex-row">
        <Post v-for="post in posts" :key="post.id" :post="post" />
      </div>
      <p class="mt-16 text-center font-mono font-bold italic text-xl" v-if="store.posts.length === 0">Pas de post pour le moment créez en un !<span class="loading loading-spinner loading-lg text-success"></span></p>
    </div>
  </div>
</template>

<script setup>
import Post from '../components/post.vue';
import { usePostStore } from '../stores/postStore';
import { useAuthStore } from '@/stores/authStore'; // Update the path

import { onMounted, ref, computed } from 'vue';

const store = usePostStore();
const authStore = useAuthStore();

const loading = ref(true);

onMounted(async () => {
  await store.fetchPosts();
  loading.value = false;
});

const posts = computed(() => {
  if (authStore.isAdmin === 'admin') {
    return store.posts; 
  } else if ( authStore.isAdmin === 'editeur') {
    return store.posts.filter(post => post.createBy === authStore.user.name);
  }else {
    return store.posts; 
  }
});
</script>