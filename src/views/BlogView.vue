<script setup>
  import Navbar from '../components/navbar.vue'
  import AddPost from '../views/AddPostView.vue'
  import { reactive } from 'vue';
  import PostContainer from '@/components/PostContainer.vue';

  const state = reactive ({
  Posts : [],
  Page : 'PostContainerView'
})

  function displayAddPost (){
    state.Page = 'AddPostView'
  }

  function displayPost (){
    state.Page = 'PostContainerView'
  }

  function newPost(Post) {
    state.Posts.push(Post)
  }
</script>

<template>
  <Navbar @addPost="displayAddPost" />
  <AddPost v-if="state.Page == 'AddPostView'" @backPostContainer="displayPost" @savePost="newPost"/>
  <PostContainer v-if="state.Page == 'PostContainerView'" :Posts="state.Posts"/>
</template>