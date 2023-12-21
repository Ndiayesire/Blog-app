<template>
    <div class="min-h-screen flex items-center justify-center bg-green-900">
      <div id="snowstorm-container"></div>
      <div class="max-w-screen-md">
        <div class="bg-gray-50 p-8 rounded-md shadow-lg w-[30rem] h-[28rem] border-2 border-gray-800">
          <div class="flex justify-center items-center">
            <img src="/src/assets/login.png" class="h-[7rem] cursor-pointer hover:-translate-y-1 hover:scale-110">
          </div>
          <div class="col-6">
            <div class="flex justify-center items-center pt-8">
              <div class="form-group w-[100vh]">
                <div class="mb-5">
                  <input v-model="username" type="text" placeholder="Nom d'utilisateur" class="focus:border-b-[#98d0c0] outline-none w-full rounded-md border-2 border-gray-200 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:shadow-md" />
                </div>
                <div class="mb-5">
                  <input v-model="password" type="password" placeholder="Mot de passe" class="focus:border-b-[#98d0c0] w-full rounded-md border-2 border-gray-200 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:shadow-md" />
                </div>
                <div class="flex justify-center items-center pt-7">
                  <button @click="login" class="shadow rounded-md bg-[#98d0c0] py-3 px-8 text-base font-semibold text-white outline-none text-center hover:-translate-y-1">Se connecter</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification';

const $toast = useToast();

const authStore = useAuthStore();
const router = useRouter();

const username = ref('');
const password = ref('');

const login = () => {
authStore.login(username.value, password.value);

  if (authStore.isAuthenticated) {
    router.push('/posts');
    $toast.success('Authentification reussi', {
    position: 'top-right',
    timeout: 3000,
});
    
  } else {
    $toast.error('Authentification echoué', {
    position: 'top-right',
    timeout: 3000,
});

}};
</script>

  