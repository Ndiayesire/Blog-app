<template>
      <div class="row pt-3">
    <div class="col-6">
      <div class="flex flex-row" v-if="state.Page === 'PostContainerView'">
      <Post v-for="(Post, index) in props.Posts" :key="index"
      :title = 'Post.title'
      :heure ='Post.heure'
      :description = 'Post.description'
      :id= 'Post.id'
      :image ='Post.image'
      @detailPost="detailPostShow"
      @deletePost=" deletePostHandler(index)"
      @editPost="editPostHandler(Post)"
      />
      </div>
      <p v-if="props.Posts.length == 0 " class="mt-16 text-center font-bold italic text-xl">Pas de Post pour le moment revenez bientot👋</p>
      <DetailPost v-if="state.Page === 'DetailPostView'" @showPost="showPostContainer" :post="state.selectedPost"/>
      <AddPost v-if="state.Page === 'AddPostView'" :editPostData="state.editPostData" @backPostContainer="cancelEdit" @updatePost="updatePostHandler"/>
    </div>
  </div>
</template>

<script setup>
import Post from '../components/post.vue'
import DetailPost from '@/views/DetailPost.vue';
import AddPost from '../views/AddPostView.vue'

const props = defineProps ({
    Posts : Array
})

import { reactive } from 'vue';

const state = reactive({
  Posts: [],
  Page: 'PostContainerView',
  editPostData: null,
});

function detailPostShow(post) {
state.selectedPost = post;
 state.Page = 'DetailPostView';
}
function showPostContainer() {
  state.Page = 'PostContainerView';
}

function deletePostHandler(index) {
  if (index >= 0 && index < props.Posts.length) {
    props.Posts.splice(index, 1);
  } else {
    console.warn('Invalid');
  }
}

function editPostHandler(post) {
  state.editPostData = { ...post };
  state.Page = 'AddPostView';
}
function cancelEdit() {
  state.editPostData = null;
  state.Page = 'PostContainerView';
}

function updatePostHandler(updatedPost) {
  const index = props.Posts.findIndex((post) => post.id === updatedPost.id);
  if (index !== -1) {
    props.Posts[index] = { ...updatedPost };
    cancelEdit();
  } else {
    console.warn('Post not found for update');
  }
}

</script>