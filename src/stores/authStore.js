import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    error: null,
  }),

  actions: {
    login(username, password) {
      if (username === 'admin' && password === 'admin') {
        this.isAuthenticated = true;
        this.error = null; 
      } else {
        this.isAuthenticated = false;
        this.error = 'Invalid username or password'; 
      }
    },

    logout() {
      this.isAuthenticated = false;
      this.error = null;
    },
  },
});
