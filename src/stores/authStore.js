import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    isAdmin: false,
    error: null,
  }),

  actions: {
    login(username, password) {
      if (username === 'admin' && password === 'admin') {
        this.isAuthenticated = true;
        this.isAdmin = true;
        this.error = null; 
      } else {
        this.isAuthenticated = false;
        this.isAdmin = false;
        this.error = 'Nom d\'utilisateur ou mot de passe incorrect. Veuillez réessayer.';
      }
    },

    logout() {
      this.isAuthenticated = false;
      this.isAdmin = false;
      this.error = null;
    },
  },
});
