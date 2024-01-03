<template>
  <Navbar/>
  <div class="row pt-3">
    <div class="flex items-center justify-center space-x-8">
      <router-link to="/admin/Posts"><i class="ri-arrow-left-line text-2xl cursor-pointer pt-2 text-green-600  hover:text-gray-600"></i></router-link>
      <h1 class=" text-center my-5 text-white text-2xl font-bold bg-green-500 rounded-md w-[17rem] shadow-md">Ajouter un utilisateur</h1>
    </div>
    <div class="col-6">
      <div class="flex justify-center items-center">
      <div class="form-group w-[100vh]">
      <div class="mb-5">
        <label  class="mb-3 block text-base font-medium text-[#07074D]" >Nom </label>
        <input  type="text" v-model="name" class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:shadow-md"/>
      </div>
      <div class="mb-5">
        <label  class="mb-3 block text-base font-medium text-[#07074D]">Email</label>
        <input type="email" v-model="email" class="w-full outline-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:shadow-md"/>
      </div>
      <div class="mb-5">
        <label class="mb-3 block text-base font-medium text-[#07074D]"> Mot de passe </label>
        <div class="flex space-x-2">
            <input type="text" disabled v-model="password" class="w-full outline-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:shadow-md bg-green-50"/>
            <i class="ri-lock-password-line text-2xl cursor-pointer pt-2   hover:text-gray-600" @click="generatePassword"></i>
            <i class="ri-file-copy-line text-2xl cursor-pointer pt-2  hover:text-gray-600" @click="copyToClipboard"></i>

        </div>
      </div>
      <div class="mb-5">
        <label class="mb-3 block text-base font-medium text-[#07074D]"> Role </label>
        <select v-model="role" class="w-full outline-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:shadow-md">
            <option value="admin">Admin</option>
            <option value="editeur">Editeur</option>
        </select>
      </div>
      <div class="flex justify-center items-center space-x-6">
      <button  class="hover:shadow-form rounded-md bg-green-600 py-3 px-8 text-base font-semibold text-white outline-none text-center" @click="registerUser">Sauvegarder</button>
      </div>
      </div>
     
      </div>
    </div>
  </div>
</template>
<script setup>
import Navbar from '../components/navbar.vue';
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification';
import { useAuthStore } from '../stores/authStore'; 
import { useRouter } from 'vue-router';


const $toast = useToast();
const router = useRouter();

const password = ref('');
const name = ref('');
const email = ref('');
const role = ref('');

const generatePassword = () => {
  const alphanumericChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const passwordLength = 12; 

  let newPassword = '';

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
    newPassword += alphanumericChars.charAt(randomIndex);
  }
  password.value = newPassword;
};

const copyToClipboard = () => {

      const textarea = document.createElement('textarea');
      textarea.value = password.value;

      document.body.appendChild(textarea);

      textarea.select();

      document.execCommand('copy');

      document.body.removeChild(textarea);

      $toast.default('Mot de passe copié !', {
        position: 'top-right',
        timeout: 2000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    };
   

  const registerUser = async () => {
  try {

        await useAuthStore().register(email.value, password.value, name.value, role.value);
    
    $toast.success('Enrégistré avec succès !', {
      position: 'top-right',
      timeout: 2000,
      closeOnClick: true,
      pauseOnHover: true,
    });
    router.push('/admin/Posts');
} catch (error) {
    $toast.error('Erreur de l\'enrégistrement !', {
      position: 'top-right',
      timeout: 2000,
      closeOnClick: true,
      pauseOnHover: true,
    }); 
    console.error('Error registering user:', error);
  }
};

</script>