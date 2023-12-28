<template>
    <div class="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div class="max-w-screen-md">
        <div class="bg-gray-100 p-8 rounded-md shadow-lg w-[30rem] h-[25rem]">
          <div class="flex justify-center items-center">
            <h1 class="text-6xl font-bold font-mono italic bg-green-500 tracking-tighter">Li</h1><h1 class="text-6xl font-bold font-mono italic bg-yellow-200 tracking-tighter">Xeew</h1><h1 class="text-6xl font-bold font-mono italic bg-red-400 tracking-tighter">Senegal</h1>
          </div>
          <div class="col-6">
            <div class="flex justify-center items-center pt-8">
              <div class="form-group w-[100vh]">
                <div class="mb-5">
                  <input v-model="email" type="text" placeholder="Email" class="focus:border-b-green-700 outline-none w-full rounded-md border-2 border-gray-200 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:shadow-md" />
                </div>
                <div class="mb-5">
                  <input v-model="password" type="password" placeholder="Mot de passe" class="focus:border-b-green-700  w-full rounded-md border-2 border-gray-200 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:shadow-md" />
                </div>
                <div class="flex justify-center items-center pt-7">
                  <button @click="login" class="shadow rounded-md bg-green-700  py-3 px-8 text-base font-semibold text-white outline-none text-center hover:-translate-y-1">Se connecter</button>
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
  
  const email = ref('');
  const password = ref('');
  
  const login = async () => {
    await authStore.login(email.value, password.value);
  
    if (authStore.isAuthenticated) {
      router.push('/admin/Posts');
      $toast.success('Authentication successful', {
        position: 'top-right',
        timeout: 3000,
      });
    } else {
      $toast.error('Email or password incorrect. Please try again.', {
        position: 'top-right',
        timeout: 3000,
      });
    }
  };

//   const register = async () => {
//   await authStore.register(email.value, password.value);

//   if (authStore.isAuthenticated) {
//     router.push('/admin/login');
//     $toast.success('Registration successful', {
//       position: 'top-right',
//       timeout: 3000,
//     });
//   } else {
//     $toast.error('Registration failed. Please try again.', {
//       position: 'top-right',
//       timeout: 3000,
//     });
//   }
// };
  </script>

  