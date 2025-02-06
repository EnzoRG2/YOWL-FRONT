import { defineStore } from 'pinia';
import axios from 'axios';


export const usePostStore = defineStore('postStore', {
  state: () => ({
    posts: [] as any[],
  }),

  actions: {
    async fetchPosts() {
      try {
        const response = await axios.get('http://localhost:1337/api/posts?populate=author');
        this.posts = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des posts', error);
      }
    },

    async deletePost(id: number) {
      try {
        await axios.delete(`http://localhost:1337/api/posts/${id}`, { withCredentials: true });
        this.fetchPosts(); // Recharge la liste après suppression
      } catch (error) {
        console.error('Erreur lors de la suppression du post', error);
      }
    },

    async createPost(content: string) {
      const { useAuthStore } = await import('../stores/authStore'); // ✅ Corrige l'import dynamique
      const authStore = useAuthStore();

      if (!authStore.user) {
        console.error('Utilisateur non connecté');
        return;
      }

      try {
        const response = await axios.post(
          'http://localhost:1337/api/posts',
          { content, author: authStore.user.id }, // 🔥 Ajoute l'auteur !
          { withCredentials: true }
        );
        this.posts.unshift(response.data);
      } catch (error) {
        console.error('Erreur lors de la création du post', error);
      }
    },
  },
});
