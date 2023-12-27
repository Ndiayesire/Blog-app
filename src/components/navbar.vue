<template>
  <div class="navbar bg-base-100 shadow-md sticky top-0 z-10 bg-opacity-100">
    <div class="navbar-start">
      <router-link v-if="isAdmin" to= "/admin/post/add"><button class="btn btn-success text-white">Ajouter un Article</button></router-link>
      <h1 class="text-xl font-bold text-gray-700 underline decoration-green-500 italic" v-if="isAdmin === false">Bienvenue dans le monde Sénégalais</h1>
    </div>
    <div class="navbar-center shadow">
      <a class="text-xl font-bold font-mono italic bg-green-500 tracking-tighter">Li</a><a class="text-xl font-bold font-mono italic bg-yellow-200 tracking-tighter">Xeew</a><a class="text-xl font-bold font-mono italic bg-red-400 tracking-tighter">Senegal</a>
    </div>
    <div class="navbar-end">
      <button v-if="isAdmin" class="btn btn-neutral text-white" @click="logout"><i class="ri-logout-box-line text-xl"></i></button>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const $toast = useToast();
const authStore = useAuthStore();
const router = useRouter();
const isAdmin = authStore.isAdmin;

const logout = async () => {
  await authStore.logout();
  router.push('/');
  $toast.warning('Au Revoir !', {
  position: 'top-right',
  timeout: 3000,
  });
};
</script>
