<template>
  <div class="navbar bg-base-100 shadow-md">
    <div class="navbar-start">
      <router-link to= "/Post/add"><button class="btn btn-success text-white">Ajouter un Article</button></router-link>
    </div>
    <div class="navbar-center">
      <a class="text-xl font-bold font-mono italic bg-green-200 tracking-tighter">NSKANE BLOG</a>
    </div>
    <div class="navbar-end">
      <button class="btn btn-neutral text-white" @click="logout"><i class="ri-logout-box-line text-xl"></i></button>
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


const logout = async () => {
  await authStore.logout();
  router.push('/');
  $toast.warning('Au Revoir !', {
  position: 'top-right',
  timeout: 3000,
  });
};
</script>