<template>
      <div class="row pt-3">
    <div class="col-6">
      <div class="flex flex-row">
      <Post v-for="(Post, index) in props.Posts" :key="index"
      :title = 'Post.title'
      :heure ='Post.heure'
      :description = 'Post.description'
      :id= 'Post.id'/>
      </div>
      <p v-if="props.Posts.length == 0 " class="mt-16 text-center font-bold ">Pas de POST 👋</p>
    </div>
  </div>
</template>

<script setup>
import Post from '../components/post.vue'

const props = defineProps ({
    Posts : Array
})

</script>