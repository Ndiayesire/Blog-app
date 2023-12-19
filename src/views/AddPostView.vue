<template>
<div class="row pt-3">
    <div class="flex items-center justify-center space-x-8">
        <i class="ri-arrow-left-line text-2xl cursor-pointer pt-2 text-green-600  hover:text-gray-600" @click="backTo"></i>
      <h1 class=" text-center my-5 text-white text-2xl font-bold bg-green-500 rounded-md w-[15rem] shadow-md">Ajouter un article</h1>
    </div>
    <div class="col-6">
      <div class="flex justify-center items-center">
      <div class="form-group w-[100vh]">
         <div class="mb-5">
        <label  class="mb-3 block text-base font-medium text-[#07074D]">ID</label>
        <input v-model="state.id" type="text"  class="outline-none w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:shadow-md"/>
      </div>
      <div class="mb-5">
        <label  class="mb-3 block text-base font-medium text-[#07074D]" >Titre </label>
        <input v-model="state.title" type="text" class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:shadow-md"/>
      </div>
      <div class="mb-5">
        <label  class="mb-3 block text-base font-medium text-[#07074D]">Date</label>
        <input v-model="state.heure" type="date"  class="w-full outline-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:shadow-md"/>
      </div>
      <div class="mb-5">
        <label class="mb-3 block text-base font-medium text-[#07074D]"> Description </label>
        <textarea v-model ="state.description" rows="4"  class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:shadow-md" ></textarea>
      </div>
      <div class="flex justify-center items-center space-x-6">
        <button class="hover:shadow-form rounded-md bg-green-600 py-3 px-8 text-base font-semibold text-white outline-none text-center" @click="submitForm"> Soumettre</button>
        <button  v-if="props.editPostData" class="hover:shadow-form rounded-md bg-yellow-500 py-3 px-8 text-base font-semibold text-white outline-none text-center" @click="updatePost"> Mettre à Jour</button>

      </div>
      </div>
     
      </div>
    </div>
  </div>
</template>

<script setup>

import { reactive, onMounted, watch} from 'vue'

const emit = defineEmits(['backPostContainer', 'savePost','updatePost'])
const props = defineProps({
  editPostData : Object,
})

const state = reactive ({    
    id : '',
    title : '',
    heure: '',
    description:''
})

onMounted(() => {
  populateFields();
});

watch(() => props.editPostData, () => {
  populateFields(); 
});

function populateFields() {
  if (props.editPostData) {
    state.id = props.editPostData.id || '';
    state.title = props.editPostData.title || '';
    state.heure = props.editPostData.heure || '';
    state.description = props.editPostData.description || '';
  }
}


function backTo () {
emit('backPostContainer')
}

const submitForm = () => {
  const newPost = {
    id: state.id,
    title: state.title,
    heure: state.heure,
    description: state.description,
  };
  emit('savePost', newPost);

  resetForm();
};

const updatePost = () => {
  const updatedPost = {
    id: state.id,
    title: state.title,
    heure: state.heure,
    description: state.description,
  };
  emit('updatePost', updatedPost);

  resetForm();
};

const resetForm = () => {
  state.id = '';
  state.title = '';
  state.heure = '';
  state.description = '';

  emit('backPostContainer');
};

</script>

