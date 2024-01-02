// authStore.js
import { defineStore } from 'pinia';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { firebaseApp } from '@/db/firebase';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    error: null,
  }),

  actions: {
    async login(email, password) {
      try {
        const auth = getAuth(firebaseApp);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        this.isAuthenticated = true;
        this.isAdmin = true;
        this.error = null;
      } catch (error) {
        this.isAuthenticated = false;
        this.isAdmin = false;
        this.error = 'Nom d\'utilisateur ou mot de passe incorrect. Veuillez réessayer.';
        console.error('Authentication Error:', error);
      }
    },

    async logout() {
      const auth = getAuth(firebaseApp);
      await signOut(auth);
      this.user = null;
      this.isAuthenticated = false;
      this.isAdmin = false;
      this.error = null;
    },
  },

  persist: {
    storage: localStorage,
  },
});

export default pinia;
