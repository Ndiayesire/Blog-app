<template>
      <div class="row pt-3">
    <div class="col-6">
      <div class="flex flex-row" v-if="state.Page === 'PostContainerView'">
      <Post v-for="(Post, index) in props.Posts" :key="index"
      :title = 'Post.title'
      :heure ='Post.heure'
      :description = 'Post.description'
      :id= 'Post.id' @detailPost="detailPostShow"/>
      </div>
      <p v-if="props.Posts.length == 0 " class="mt-16 text-center font-bold italic text-xl">Pas de Post pour le moment revenez bientot 👋</p>
      <DetailPost v-if="state.Page === 'DetailPostView'" @showPost="showPostContainer" :post="state.selectedPost"/>
    </div>
  </div>
</template>

<script setup>
import Post from '../components/post.vue'
import DetailPost from '@/views/DetailPost.vue';

const props = defineProps ({
    Posts : Array
})

import { reactive, ref } from 'vue';

// const selectedPost = ref(null);

const state = reactive({
  Posts: [],
  Page: 'PostContainerView',
});

function detailPostShow(post) {
state.selectedPost = post;
 state.Page = 'DetailPostView';
}
function showPostContainer() {
  state.Page = 'PostContainerView';
}


</script>