<template>
  <Navbar/>
  <div class="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative mt-5 shadow rounded-lg" style="height: 24rem;"  >
    <div class="absolute left-0 bottom-0 w-full h-full z-10 rounded-b-lg pt-3" style="background-image: linear-gradient(180deg,transparent,rgba(16, 141, 78, 0.7));">
      <router-link to="/admin/posts" exact><i class="ri-arrow-left-line text-3xl cursor-pointer text-white ml-5 shadow-md rounded-full border-2 bg-green-600 " @click=""></i></router-link>
    </div>
    <img :src="`/src/assets/${post.image}`" class="absolute rounded-lg left-0 top-0 w-full h-full z-0 object-cover" v-if="post" />
    <div class="p-4 absolute bottom-0 left-0 z-20" v-if="post">
      <h2 class="text-4xl font-semibold text-gray-100 leading-tight"  v-if="post">
        {{ post.title }}
      </h2>
      <div class="flex mt-3 space-x-2">
        <i class="ri-calendar-line text-white"></i>
        <p class="font-semibold text-white text-xs pt-1">
           {{ post.heure }}
           </p>
        
      </div>
    </div>
  </div>
  <div class="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed"  v-if="post">
    <p class="pb-6">
      {{post.description}}
    </p>
  </div>
  <div class="flex -4 lg:px-0  text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
    <div class="flex space-x-5">
      <textarea  v-model="newComment" rows="4" class="border-2 border-gray-200 rounded-md w-[40rem] outline-none text-sm"></textarea>
      <button class="btn btn-success text-white" @click="addComment">Ajouter un commentaire</button>
    </div>
  </div>
   <div class="max-w-screen-md mx-auto pt-8">
  <div class="flex space-x-2 border-2 bg-gray-100 rounded-md">
    <i class="ri-chat-1-line text-xl ml-3"></i>
    <p class="font-bold text-underline">Liste des commentaires</p>
  </div>

  <div class="flex justify-between items-center mt-2 bg-gray-100 rounded-3xl px-4 pt-2 pb-2.5 w-[40rem]" v-for="comment in store.comments" :key="index" >
    <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png" class="h-8 w-8">
    <span class="ml-3"></span><br/>
    <p class="font-semibold" >{{ comment.text }}</p>
    <i class="ri-delete-bin-6-fill text-red-500 ml-2 cursor-pointer float-right" @click="deleteComment(comment.id)"></i>
  </div>
</div>
</template>

<script setup>
import Navbar from '../components/navbar.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePostStore } from '../stores/postStore';
import { useCommentStore } from '../stores/commentStore';

const postId = ref(null);
const post = ref(null);
const postStore = usePostStore(); 
const store = useCommentStore();
const newComment = ref('');

const addComment = () => {
  if (newComment.value.trim() !== '') {
    store.addComment({
      text: newComment.value,
    });
    newComment.value = '';
  }
};

const deleteComment = (commentId) => {
  store.deleteComment(commentId);
};

const route = useRoute();

onMounted(() => {
  postId.value = route.params.postId;
  fetchPostDetails();
});

const fetchPostDetails = () => {
  post.value = postStore.getPostById(postId.value);
};


</script>
