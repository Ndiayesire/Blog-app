<template>
  <div class="navbar bg-base-100 shadow-md">
    <div class="navbar-start">
    <button @click="Add" class="btn btn-success text-white">Ajouter un Article</button>
    </div>
    <div class="navbar-center">
      <a class="text-xl font-bold font-mono italic bg-green-200 tracking-tighter">NSKANE BLOG</a>
    </div>
    <div class="navbar-end">
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['addPost'])
function Add () {
emit('addPost')
}
</script>