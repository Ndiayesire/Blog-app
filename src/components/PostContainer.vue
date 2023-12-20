<template>
      <div class="row pt-3">
    <div class="col-6">
      <div class="flex flex-row" >
      <Post  v-for="post in posts" :key="post.id" :post="post"/>
      </div>
      <!-- <p class="mt-16 text-center font-bold italic text-xl">Pas de Post pour le moment revenez bientot👋</p> -->
    </div>
  </div>
</template>

<script setup>
import Post from '../components/post.vue';
import { usePostStore } from '../stores/postStore';
const store = usePostStore();
const posts = store.posts;
</script>