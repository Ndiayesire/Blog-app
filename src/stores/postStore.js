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
      return state.posts.find((post) => post.docRefId === id);
    },
  },

  actions: {
    async fetchPosts() {
      const postsCollection = collection(firestore, 'posts');
      const querySnapshot = await getDocs(postsCollection);   
      this.posts = querySnapshot.docs.map(doc => {
        const { id } = doc;
        const data = doc.data();
        return { id, ...data, docRefId: id }; 
      });
    
      console.log(this.posts);
    },

    async addPost(post) {
      const postsCollection = collection(firestore, 'posts');
      const docRef = await addDoc(postsCollection, post);
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
