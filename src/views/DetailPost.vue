<template>
  <Navbar/>
  <div class="row flex justify-center">
    <div class="col-6 ml-5">
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
        <p class="font-semibold text-white text-xs pt-1"> {{ post.heure }} </p>
        <p class="font-semibold text-white text-sm mb-0">Par <strong class="text-yellow-300">{{ post.createBy }}</strong></p> 
        
      </div>
    </div>
  </div>
  <div class="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed" v-if="post">
    <p class="font-sans first-letter:text-5xl first-letter:text-green- first-letter:text-bold">
      {{post.description}}
    </p>
  </div>

   <div class="max-w-screen-md mx-auto pt-8">
  <div class="bg-gray-50 p-6">
    <h2 class="text-lg font-bold mb-4 text-green-700">Commentaires ({{store.comments.length}})</h2>
    <div class="flex flex-col space-y-4">
        <div class="bg-white p-4 rounded-lg shadow" v-for="(comment, index) in store.comments" :key="index">
            <h3 class="text-lg font-bold">{{ comment.nom }}</h3>
            <p class="text-gray-700 text-sm mb-2">Posté le {{ comment.dateTime }}</p>
            <p class="text-gray-700">{{ comment.text }}
            </p>
            <i v-if="isAdmin" class="ri-delete-bin-6-fill text-red-500 ml-2 cursor-pointer float-right" @click="deleteComment(comment.id)"></i>
        </div>
    
        <div class="bg-white p-4 rounded-lg shadow-md">
            <h3 class="text-lg font-bold mb-2 text-green-700">Ajouter un commentaire</h3>
            <div class="mb-4">
                <input
                    v-model="commentName"
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name" type="text" placeholder="Enter votre nom">
            </div>
            <div class="mb-4">
                <textarea
                    v-model="newComment"
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="comment" rows="5" placeholder="Enter votre commentaire"></textarea>
            </div>
            <button
                class="bg-green-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline float-right"
                @click="addComment">
                Ajouter un commentaire
            </button>
          </div>
    </div>
</div>
</div>
    </div>

  </div>

  
</template>
<script setup>
import Navbar from '../components/navbar.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { usePostStore } from '../stores/postStore';
import { useCommentStore } from '../stores/commentStore';
import { useAuthStore } from '../stores/authStore';

const postId = ref(null);
const post = ref(null);
const postStore = usePostStore(); 
const store = useCommentStore();
const authStore = useAuthStore();
const newComment = ref('');
const commentName = ref('');
const isAdmin = authStore.isAdmin;

const addComment = () => {
  if (newComment.value.trim() !== '') {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toLocaleString(); 
    store.addComment({
    postId: postId.value,
    text: newComment.value,
    nom: commentName.value,
    dateTime: formattedDateTime,
    });
    newComment.value = '';
    commentName.value = '';
  }
};

const deleteComment = (commentId) => {
  store.deleteComment(commentId);
};

const route = useRoute();

onMounted(async () => {
  postId.value = route.params.postId;
  const storedPostDetails = localStorage.getItem(`postDetails_${postId.value}`);
  if (storedPostDetails) {
    post.value = JSON.parse(storedPostDetails);
  } else {
    fetchPostDetails();
  }
  await fetchComments();
});

onBeforeUnmount(() => {
  if (post.value) {
    localStorage.setItem(`postDetails_${postId.value}`, JSON.stringify(post.value));
  }
});


const fetchPostDetails = () => {
  post.value = postStore.getPostById(postId.value);
};

const fetchComments = async () => {
  await store.fetchCommentsForPost(postId.value);
};
</script>