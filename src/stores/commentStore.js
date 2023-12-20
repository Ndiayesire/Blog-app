import { defineStore } from 'pinia';

export const useCommentStore = defineStore('commentStore', {
  state: () => ({
    comments: [],
  }),

  actions: {
    addComment(comment) {
      this.comments.push(comment);
    },

    deleteComment(commentId) {
      const commentIndex = this.comments.findIndex((comment) => comment.id === commentId);
      if (commentIndex !== -1) {
        this.comments.splice(commentIndex, 1);
      }
    },
  },
});