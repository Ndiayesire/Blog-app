<script setup>
  import {
    reactive
  } from 'vue'
  const props = defineProps(['post']);
  const emit = defineEmits(['showPost'])

  function backToContainer() {
    emit('showPost')
  }
  const state = reactive({
    commentary: '',
    comments: [],
  })

  function addComment() {
    if (state.commentary.trim() !== '') {
      state.comments.push(state.commentary.trim());
      state.commentary = '';
    }
  }

  function deleteComment(index) {
  state.comments.splice(index, 1);
}
</script>
<template>
  <div class="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative" style="height: 24em;">
    <div class="absolute left-0 bottom-0 w-full h-full z-10 rounded-b-lg pt-3" style="background-image: linear-gradient(180deg,transparent,rgba(16, 141, 78, 0.7));">
      <i class="ri-arrow-left-line text-3xl cursor-pointer text-white ml-5 shadow-md rounded-full border-2 bg-green-600 " @click="backToContainer"></i>
    </div>
    <img :src="`src/assets/${props.post.image}`" class="absolute rounded-lg left-0 top-0 w-full h-full z-0 object-cover" />
    <div class="p-4 absolute bottom-0 left-0 z-20" v-if="post">
      <h2 class="text-4xl font-semibold text-gray-100 leading-tight">
        {{ props.post.title }}
      </h2>
      <div class="flex mt-3 space-x-2">
        <i class="ri-calendar-line text-white"></i>
        <p class="font-semibold text-white text-xs pt-1"> {{ props.post.heure }} </p>
        
      </div>
    </div>
  </div>
  <div class="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
    <p class="pb-6">
      {{props.post.description}}
    </p>
  </div>
  <div class="flex -4 lg:px-0  text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
    <div class="flex space-x-5">
      <textarea v-model="state.commentary" rows="4" class="border-2 border-gray-200 rounded-md w-[40rem] outline-none text-sm"></textarea>
      <button class="btn btn-success text-white" @click="addComment">Ajouter un commentaire</button>
    </div>
  </div>
  <div class="max-w-screen-md mx-auto pt-8">
  <div class="flex space-x-2 border-2 bg-gray-100 rounded-md">
    <i class="ri-chat-1-line text-xl ml-3"></i>
    <p class="font-bold text-underline">Liste des commentaires</p>
  </div>

  <div v-for="(comment, index) in state.comments" :key="index" class="flex justify-between items-center mt-2 bg-gray-100 rounded-3xl px-4 pt-2 pb-2.5 w-[40rem]">
    <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png" class="h-8 w-8">
    <span class="ml-3"></span><br/>
    <p class="font-semibold">{{ comment }}</p>
    <i class="ri-delete-bin-6-fill text-red-500 ml-2 cursor-pointer float-right" @click="deleteComment(index)"></i>
  </div>
</div>
</template>