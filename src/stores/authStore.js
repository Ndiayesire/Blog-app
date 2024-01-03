// authStore.js
import { defineStore } from 'pinia';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc,  where, query, getDoc, getDocs } from 'firebase/firestore';
import { firebaseApp } from '@/db/firebase';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    isAdmin: null,
    error: null,
  }),

  actions: {

    async register(email, password, name, role) {
      try {
        const db = getFirestore(firebaseApp);
        const userDocRef = doc(collection(db, 'users'));     
        await setDoc(userDocRef, { email, name, role, password });
      } catch (error) {
        this.error = 'Registration failed. Please try again.';
        console.error('Registration Error:', error);
      }
    },


  
    async login(email, password) {
      try {
        const db = getFirestore(firebaseApp);
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('email', '==', email), where('password', '==', password));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          throw new Error('Invalid email or password');
        }

        // Set user information based on the first user found
        const userDoc = querySnapshot.docs[0];
        this.user = {
          uid: userDoc.id,
          email: userDoc.data().email,
          name: userDoc.data().name,
          role: userDoc.data().role,
        };

        this.isAuthenticated = true;
        this.isAdmin = this.user.role,
        this.error = null;

        await this.fetchUserData();

      } catch (error) {
        this.isAuthenticated = false;
        // this.isAdmin = false;
        this.error = 'Nom d\'utilisateur ou mot de passe incorrect. Veuillez réessayer.';
        console.error('Authentication Error:', error);
      }
    },
    async fetchUserData() {
      try {
        if (this.user) {
          const db = getFirestore(firebaseApp);
          const userDocRef = doc(collection(db, 'users'), this.user.uid);
          const userDocSnapshot = await getDoc(userDocRef);
    
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();

            this.user = { ...this.user, ...userData };
          }
        }
      } catch (error) {
        console.error('Error fetching additional user information:', error);
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
