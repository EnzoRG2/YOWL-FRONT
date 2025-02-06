<template>
  <div id="app">
    <!-- Contenu principal de l'application -->
    <router-view></router-view>

    <!-- Barre de navigation commune à toutes les pages sauf si 'hideFooter' est true -->
    <footer v-if="!$route.meta.hideFooter">
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
export default {
  name: "App"
};
</script>

<style scoped>
footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f0f0f0;
  padding: 5px 0; /* Réduire l'espacement */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px; /* Réduire la hauteur du footer */
  z-index: 100;
}

.nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;  /* Réduire la taille des icônes */
  height: 35px; /* Réduire la taille des icônes */
}

.nav-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.nav-item.plus {
  background-color: #4CAF50;
  border-radius: 50%;
  padding: 8px; /* Réduire l'espace autour du bouton + */
}

.nav-item.plus img {
  width: 20px;  /* Réduire la taille de l'icône du bouton + */
  height: 20px; /* Réduire la taille de l'icône du bouton + */
}
</style>
