import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null as any,
    token: '' as string
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axios.post('http://localhost:1337/api/auth/local', {
          identifier: email,
          password: password,
        });

        this.token = response.data.jwt || '';
        this.user = { ...response.data.user, id: Number(response.data.user.id) };

        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
      } catch (error) {
        console.error('Erreur de connexion', error);
      }
    },

    logout() {
      this.token = '';
      this.user = null;

      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },

    loadUserFromStorage() {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      this.token = storedToken || '';

      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }

      axios.defaults.headers.common['Authorization'] = this.token ? `Bearer ${this.token}` : '';
    }
  }
});
