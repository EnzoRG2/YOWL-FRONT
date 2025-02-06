<template>
  <div class="accueil-container">
    <header>
      <h1>TKNS</h1>
    </header>

    <!-- Liste des posts -->
    <div class="posts">
      <div class="post" v-for="(post, index) in posts" :key="post.id">
        <div class="post-content">
          <!-- Section utilisateur : avatar et nom -->
          <div class="user-info">
            <img v-if="post.user?.avatar?.url" :src="post.user.avatar.url" alt="User Avatar" class="avatar" />
            <p>{{ post.user?.username || 'Nom utilisateur' }}</p> <!-- Affichage du nom d'utilisateur -->
          </div>

          <!-- Contenu du post -->
          <div v-if="post.content">
            <h2>{{ post.content }}</h2>
          </div>

          <!-- Affichage de l'image du post (si disponible) -->
          <div v-if="post.image">
            <img :src="post.image?.url" alt="Post Image" />
          </div>
        </div>
      </div>
    </div>

    <!-- Barre de navigation -->
    <footer>
      <router-link to="/accueil" class="nav-item">
        <img src="/icons/home-icon.png" alt="Home" />
      </router-link>
      <router-link to="/search" class="nav-item">
        <img src="/icons/search-icon.png" alt="Search" />
      </router-link>
      <router-link to="/nouveau-post" class="nav-item plus">
        <img src="/icons/plus-icon.png" alt="New Post" />
      </router-link>
      <router-link to="/profile" class="nav-item">
        <img src="/icons/profile-icon.png" alt="Profile" />
      </router-link>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [], // Tableau pour stocker les posts récupérés
      documentIds: new Set(), // Set pour garder une trace des documentIds des posts
    };
  },
  created() {
    this.fetchPosts(); // Appel pour récupérer les posts dès le chargement
  },
  methods: {
    async fetchPosts() {
      try {
        // Appel à l'API pour récupérer les posts et les informations de l'utilisateur (nom et avatar)
        const response = await axios.get('http://localhost:1337/api/posts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Utilisation du token JWT pour l'authentification
          }
        });

        // Affichage de la réponse dans la console pour mieux comprendre la structure des données
        console.log('Réponse de l\'API:', response.data);

        // Filtrage des doublons basés sur documentId
        const uniquePosts = response.data.filter(post => {
          if (!this.documentIds.has(post.documentId)) {
            this.documentIds.add(post.documentId);
            return true; // Inclure ce post
          }
          return false; // Ne pas inclure si documentId existe déjà
        });

        // Affecter les posts uniques
        this.posts = uniquePosts;

      } catch (error) {
        console.error('Erreur lors de la récupération des posts:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Style de la page d'accueil */
.accueil-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  background-color: #fff;
  padding: 10px;
}

header {
  text-align: center;
}

h1 {
  font-size: 2.5em;
  color: #333;
}

.posts {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.post {
  background-color: #e0e0e0;
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

h2 {
  font-size: 1.2em;
  font-weight: bold;
}

footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f0f0f0;
  padding: 10px 0;
}

.nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
}

.nav-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
