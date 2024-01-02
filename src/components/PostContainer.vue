<template>
  <div class="row pt-3">
    <div class="col-6">
      <div class="flex flex-row">
        <Post v-for="post in posts" :key="post.id" :post="post" />
      </div>
      <p class="mt-16 text-center font-mono font-bold italic text-xl" v-if="posts.length === 0"><span class="loading loading-spinner loading-lg text-success"></span></p>
    </div>
  </div>
</template>

<script setup>
import Post from '../components/post.vue';
import { usePostStore } from '../stores/postStore';
import { onMounted, ref, computed } from 'vue';

const store = usePostStore();
const loading = ref(true);

onMounted(async () => {
  await store.fetchPosts();
  loading.value = false;
});

// Use a computed property for 'posts' to ensure proper reactivity
const posts = computed(() => store.posts);
</script>