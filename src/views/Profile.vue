<template>
    <div class="profile-container">
      <!-- Avatar et nom d'utilisateur -->
      <div class="profile-header">
        <div class="avatar">
        </div>
        <div class="username">
          <!-- Afficher le nom de l'utilisateur -->
          <p>{{ user.username }}</p>
        </div>
        <div class="settings-icon">
          <router-link to="/settings">
          </router-link>
        </div>
      </div>
  
      <!-- Grille des posts -->
      <div class="posts-grid">
        <div class="post" v-for="(post, index) in posts" :key="index">
          <div class="post-content"></div>
        </div>
      </div>
  
      <!-- Bouton de déconnexion -->
      <button @click="logout" class="logout-button">Déconnexion</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        posts: [1, 2, 3, 4, 5, 6], // Simuler des posts
        user: {
          username: '', // Nom d'utilisateur
          avatar: '',   // Avatar de l'utilisateur
        }
      };
    },
    created() {
      this.loadUserData();
    },
    methods: {
      loadUserData() {
        // Charge le nom et l'avatar de l'utilisateur depuis localStorage ou d'une API
        const userData = JSON.parse(localStorage.getItem('user')) || {}; // Exemple de récupération depuis localStorage
        this.user.username = userData.username || 'Nom par défaut'; // Si aucun nom n'est trouvé, on utilise un nom par défaut
        this.user.avatar = userData.avatar || ''; // Avatar par défaut
      },
      logout() {
        // Logique de déconnexion
        localStorage.removeItem('token'); // Supprimer le token
        localStorage.removeItem('user');  // Supprimer les données utilisateur
        this.$router.push('/'); // Redirige vers la page de connexion
      }
    }
  };
  </script>
  
  <style scoped>
  /* Style spécifique à la page Profile */
  
  /* Conteneur principal du profil */
  .profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  /* Section avatar et nom d'utilisateur */
  .profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .avatar {
    width: 80px;
    height: 80px;
    background-color: #e0e0e0;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .avatar img {
    width: 70%;
    height: 70%;
    object-fit: cover;
    border-radius: 50%;
  }
  
  .username {
    margin-left: 20px;
    font-size: 1.5em;
    font-weight: bold;
  }
  
  .settings-icon {
    margin-left: auto;
    cursor: pointer;
  }
  
  /* Grille des posts */
  .posts-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    width: 100%;
    max-width: 600px;
    margin-bottom: 20px;
  }
  
  .post {
    background-color: #e0e0e0;
    height: 120px;
    border-radius: 10px;
  }
  
  /* Bouton de déconnexion */
  .logout-button {
    background-color: #ff6347;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
  }
  
  .logout-button:hover {
    background-color: #ff4500;
  }
  </style>
  