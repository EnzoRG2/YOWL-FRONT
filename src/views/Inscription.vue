<template>
  <div class="inscription-container">
    <h1>Inscription</h1>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="username" placeholder="Nom d'utilisateur" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Mot de passe" required />
      <input type="password" v-model="confirmPassword" placeholder="Confirmer le mot de passe" required />
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p> <!-- Affiche l'erreur si nécessaire -->
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: ''  // Pour afficher les messages d'erreur
    };
  },
  methods: {
    async handleSubmit() {
      // Réinitialiser le message d'erreur
      this.errorMessage = '';

      // Vérifier si les mots de passe correspondent
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Les mots de passe ne correspondent pas.';
        return;  // Empêche l'envoi de la requête si les mots de passe ne correspondent pas
      }

      try {
        // Envoi des données d'inscription à Strapi
        const response = await axios.post('http://localhost:1337/api/auth/local/register', {
          username: this.username,
          email: this.email,
          password: this.password
        });

        // Si l'inscription est réussie, la réponse contiendra les données de l'utilisateur
        console.log('Utilisateur créé avec succès:', response.data);

        // Sauvegarder le token d'authentification dans localStorage (optionnel)
        localStorage.setItem('token', response.data.jwt); // Sauvegarde du token d'authentification
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Sauvegarde des données utilisateur

        // Rediriger vers la page de connexion après l'inscription réussie
        this.$router.push('/');
      } catch (error) {
        // Gérer les erreurs d'inscription (par exemple, email déjà utilisé)
        if (error.response) {
          this.errorMessage = error.response.data.message || 'Erreur lors de l\'inscription';
        } else {
          this.errorMessage = 'Erreur de connexion au serveur';
        }
        console.error('Erreur lors de l\'inscription:', error);
      }
    }
  }
};
</script>

<style scoped>
.inscription-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 300px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
}

button:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
  font-size: 0.9em;
}
</style>
