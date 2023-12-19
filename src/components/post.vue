<template>
    <div class="flex justify-start space-x-8 pt-2	ml-8">
      <div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
        
        <a href="#">
          <img class="rounded-t-md rounded-b-md" :src="`src/assets/${image}`" alt="">
        </a>
        <div class="flex justify-end space-x-4 mr-4 pt-2">
            <i class="ri-file-edit-line text-green-500 text-xl font-semibold cursor-pointer" @click="editPost"></i>
            <i class="ri-delete-bin-line text-red-500 text-xl font-semibold cursor-pointer" @click="deletePost(index)"></i>
        </div>
        <div class="p-2">
          <div class="flex space-x-2">
        <i class="ri-calendar-line text-gray-500 text-sm"></i>
        <p class="font-semibold text-gray-500 white text-sm"> {{heure }} </p>
      </div>
          <a >
            <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2 pt-1">{{title}}</h5>
          </a>
          <p class="font-normal text-gray-700 mb-3">{{ description }}</p>
  
          <button class=" mb-2 float-right text-white bg-green-700 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center" @click="ShowPost"> Lire l'article </button>

        </div>
      </div>
    </div>
  </template>

  <script setup>

const emit = defineEmits(['detailPost','title', 'heure', 'description', 'id','deletePost','editPost','image'])

function ShowPost () {
emit('detailPost',
  { title: props.title,
    heure: props.heure,
    description: props.description,
    id: props.id,
    image: props.image,
  })
}

const props = defineProps ({
  id: String,
  title: String,
  description : String,
  heure : String,
  image : String
})
function deletePost() {
  emit('deletePost');
}

function editPost() {
  emit('editPost', props); 
}
</script>