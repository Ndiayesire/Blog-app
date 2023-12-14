<template>
    <div class="flex justify-start space-x-8 pt-2	ml-8">
      <div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
        <a href="#">
          <img class="rounded-t-md" src="https://www.tourmag.com/photo/art/grande/62223291-45163929.jpg?v=1644422294" alt="">
        </a>
        <div class="p-5">
            <p class="font-bold text-gray-400 mb-3">{{ id}}</p>
            <p class="font-bold text-gray-400 mb-3">{{ heure }}</p>
          <a >
            <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2">{{title}}</h5>
          </a>
          <p class="font-normal text-gray-700 mb-3">{{ description }}</p>
          <a class=" mb-2 float-right text-white bg-green-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center" href="#"> Lire l'article </a>
        </div>
      </div>
    </div>
  </template>

  <script setup>

const props = defineProps ({
    id: String,
    title: String,
    description : String,
    heure : String,
})
</script>