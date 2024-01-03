import { defineStore } from 'pinia';
import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs, where, query } from '@firebase/firestore';

const db = getFirestore();

export const useCommentStore = defineStore('commentStore', {
  state: () => ({
    comments: [],
  }),

  actions: {
    async addComment(comment) {
      const docRef = await addDoc(collection(db, 'comments'), comment);
      this.comments.push({ id: docRef.id, ...comment });
    },    

    async deleteComment(commentId) {
      await deleteDoc(doc(db, 'comments', commentId));
      this.comments = this.comments.filter((comment) => comment.id !== commentId);
    },

    async fetchCommentsForPost(postId) {
      const postCommentsQuery = query(collection(db, 'comments'), where('postId', '==', postId));
      const querySnapshot = await getDocs(postCommentsQuery);
      this.comments = querySnapshot.docs.map((doc) => {
        const commentData = { id : doc.ref.id, ...doc.data() };
        return commentData;
      });
    },
  },
});
