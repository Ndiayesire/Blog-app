<template>
  <Navbar/>
<div class="row pt-3">
    <div class="flex items-center justify-center space-x-8">
      <router-link to="/admin/Posts"><i class="ri-arrow-left-line text-2xl cursor-pointer pt-2 text-green-600  hover:text-gray-600"></i></router-link>
      <h1 class=" text-center my-5 text-white text-2xl font-bold bg-green-500 rounded-md w-[15rem] shadow-md">{{ isEditing ? 'Mettre à jour article' : 'Ajouter un article' }}</h1>
    </div>
    <div class="col-6">
      <div class="flex justify-center items-center">
      <div class="form-group w-[100vh]">
         <div class="mb-5">
        <input hidden type="text" v-model="postFormData.createBy"  class="outline-none w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:shadow-md"/>
      </div>
      <div class="mb-5">
        <label  class="mb-3 block text-base font-medium text-[#07074D]" >Titre </label>
        <input  type="text" v-model="postFormData.title" class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:shadow-md"/>
      </div>
      <div class="mb-5">
        <label  class="mb-3 block text-base font-medium text-[#07074D]">Date</label>
        <input type="date" v-model="postFormData.heure" class="w-full outline-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:shadow-md"/>
      </div>
      <div class="mb-5">
        <label class="mb-3 block text-base font-medium text-[#07074D]"> Description </label>
        <textarea v-model="postFormData.description" rows="10"  class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:shadow-md" ></textarea>
      </div>
      <div class="mb-5">
        <label class="mb-3 block text-base font-medium text-[#07074D]"> Image </label>
        <input type="file" @change="handleFileChange" class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:shadow-md"/>
      </div>
      <div class="flex justify-center items-center space-x-6">
        <router-link to="/admin/Posts"><button  class="hover:shadow-form rounded-md bg-green-600 py-3 px-8 text-base font-semibold text-white outline-none text-center" @click="submitPost">{{ isEditing ? 'Mettre à jour' : 'Soumettre' }}</button></router-link>
      </div>
      </div>
     
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/navbar.vue';
import { usePostStore } from '../stores/postStore';
import { onMounted, ref, watch, computed } from 'vue';
import { getFirestore } from 'firebase/firestore';
import { useAuthStore } from '@/stores/authStore';


const store = usePostStore();
const authStore = useAuthStore();


const { postId } = defineProps(['postId']);

const isEditing = ref(false);
const user = computed(() => authStore.user);

const postFormData = ref({
  createBy: user.value ? user.value.name : '',
});

const firestore = getFirestore();

onMounted(() => {
  if (!user.value && authStore.isAuthenticated) {
        authStore.fetchUserData();
      }
  fetchPost();
});

watch(() => postId, () => {
  fetchPost();
});

const fetchPost = () => {
  if (postId) {
    const post = store.getPostById(postId);
    if (post) {
      postFormData.value.title = post.title;
      postFormData.value.heure = post.heure;
      postFormData.value.description = post.description;
      postFormData.value.image = post.image;
      isEditing.value = true;
    }
  }
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  postFormData.value.image = file.name;
};

const submitPost = () => {
  if (postId) {
  const postIndex = store.posts.findIndex((post) => post.id === postId);
  if (postIndex !== -1) {
    store.updatePost(postId, postFormData.value);
  }
} else {
    store.addPost(postFormData.value);
  }
};

</script>