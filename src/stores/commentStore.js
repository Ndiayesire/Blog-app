import { defineStore } from 'pinia';
import { getFirestore, collection, addDoc, deleteDoc, doc } from '@firebase/firestore';

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

    async fetchComments() {
      const querySnapshot = await getDocs(collection(db, 'comments'));
      this.comments = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
  },
});
