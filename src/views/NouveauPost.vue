<template>
  <div class="nouveau-post-container">
    <!-- Bouton pour fermer ou annuler -->
    <button @click="closePost" class="close-button">X</button>

    <!-- Formulaire de création de post -->
    <form @submit.prevent="createPost" class="post-form">

      <textarea v-model="content" placeholder="Écrire votre post..." required></textarea>
      <button type="submit" class="submit-button">
        <img src="/icons/plus-icon.png" alt="Add Post" />
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      content: '',
      image: null,
      imagePreview: null,
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.image = file;
        this.imagePreview = URL.createObjectURL(file);
      }
    },
    async createPost() {
      const formData = new FormData();
      formData.append('content', this.content);
      if (this.image) {
        formData.append('image', this.image);
      }

      const token = localStorage.getItem('token'); // Récupère le token depuis localStorage

      if (!token) {
        console.error('Erreur: utilisateur non authentifié');
        return; // Empêche l'envoi si le token est manquant
      }

      try {
        // Envoi du post à Strapi via l'API
        const response = await axios.post('http://localhost:1337/api/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // Envoi du token dans l'en-tête
          },
        });

        console.log('Post créé avec succès:', response.data);

        // Réinitialisation du formulaire
        this.content = '';
        this.image = null;
        this.imagePreview = null;

        // Rediriger vers la page d'accueil après la création du post
        this.$router.push('/accueil');
      } catch (error) {
        console.error('Erreur lors de la création du post:', error);
      }
    },
    closePost() {
      this.$router.push('/accueil'); // Ferme et redirige vers l'accueil
    },
  },
};
</script>

<style scoped>
/* Style de la page de création de post */
.nouveau-post-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}

.post-form {
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.image-upload {
  text-align: center;
  margin-bottom: 20px;
}

.image-preview {
  margin-top: 10px;
}

.image-preview img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

textarea {
  width: 100%;
  height: 150px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1em;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.submit-button img {
  width: 30px;
  height: 30px;
}
</style>
