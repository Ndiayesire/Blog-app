import { defineStore } from 'pinia';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from '@/db/firebase'; 

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    error: null,
  }),

  actions: {

    // async register(email, password) {
    //   try {
    //     const auth = getAuth(firebaseApp);
    //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //     this.user = userCredential.user;
    //     this.isAuthenticated = true;
    //     this.isAdmin = false; 
    //     this.error = null;
    //   } catch (error) {
    //     this.isAuthenticated = false;
    //     this.isAdmin = false;
    //     this.error = 'Registration failed. Please try again.';
    //     console.error('Registration Error:', error);
    //   }
    // },

    async login(email, password) {
      try {
        const auth = getAuth(firebaseApp);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        this.isAuthenticated = true;
        this.isAdmin = true; // You may want to update this based on your user roles
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

    onAuthStateChanged() {
      const auth = getAuth(firebaseApp);
      onAuthStateChanged(auth, (user) => {
        this.user = user;
        this.isAuthenticated = user !== null;
        this.isAdmin = user ? false : false;
      });
    },
  },
});
