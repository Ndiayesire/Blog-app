import { defineStore } from 'pinia';

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
    addPost(post) {
      this.posts.push(post);
    },

    deletePost(index) {
      this.posts.splice(index, 1);
    },

    updatePost(postId, updatedPost) {
      const postIndex = this.posts.findIndex((post) => post.id === postId);

      if (postIndex !== -1) {
        this.posts.splice(postIndex, 1, updatedPost);
      }
    },
  },
});
