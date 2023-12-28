// postStore.js
import { defineStore } from 'pinia';
import { collection, addDoc, deleteDoc, updateDoc, doc, getDocs } from 'firebase/firestore';
import { firestore } from '@/db/firebase';

export const usePostStore = defineStore('postStore', {
  state: () => ({
    posts: [],
  }),

  getters: {
    getPostById: (state) => (id) => {
      return state.posts.find((post) => post.id === id);
    },
  },

  actions: {
    async fetchPosts() {
      const postsCollection = collection(firestore, 'posts');
      const querySnapshot = await getDocs(postsCollection);
      console.log(querySnapshot)
      this.posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(this.posts)
    },

    async addPost(post) {
      const postsCollection = collection(firestore, 'posts');
      const docRef = await addDoc(postsCollection, post);
    
      // Check if the document ID is not already present in the posts array
      const isDuplicate = this.posts.some((existingPost) => existingPost.id === docRef.id);
    
      if (!isDuplicate) {
        this.posts.push({ id: docRef.id, ...post });
      } else {
        console.warn(`Document with ID ${docRef.id} is already present in the posts array.`);
      }
    },
    

    async deletePost(postId) {
      const postsCollection = collection(firestore, 'posts');
      await deleteDoc(doc(postsCollection, postId));
      this.posts = this.posts.filter(post => post.id !== postId);
    },
        
    async updatePost(postId, updatedPost) {
      const postsCollection = collection(firestore, 'posts');
      await updateDoc(doc(postsCollection, postId), updatedPost);

      const postIndex = this.posts.findIndex(post => post.id === postId);
      if (postIndex !== -1) {
        this.posts.splice(postIndex, 1, { id: postId, ...updatedPost });
      }
    },
  },
});

export default usePostStore;
