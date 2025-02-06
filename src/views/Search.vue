<template>
  <div class="search-container">
    <!-- Barre de recherche -->
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Search" />
      <button @click="search">
        <img src="/icons/search-icon.png" alt="Search" />
      </button>
    </div>

    <!-- Liste des résultats -->
    <div class="results-list">
      <div class="result-item" v-for="(item, index) in filteredResults" :key="index">
        <div class="result-content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      results: [1, 2, 3, 4, 5, 6], // Simuler des résultats
    };
  },
  computed: {
    filteredResults() {
      return this.results.filter(item =>
        String(item).includes(this.searchQuery)
      );
    }
  },
  methods: {
    search() {
      // Logique de recherche si nécessaire
      console.log('Searching for:', this.searchQuery);
    }
  }
};
</script>

<style scoped>
/* Conteneur principal de la page de recherche */
.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
  background-color: #fff;
}

/* Style de la barre de recherche */
.search-bar {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
}

.search-bar input {
  flex-grow: 1;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  font-size: 1.2em;
}

.search-bar button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.search-bar button img {
  width: 20px;
  height: 20px;
}

/* Style de la liste des résultats */
.results-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
}

.result-item {
  background-color: #e0e0e0;
  height: 120px;
  border-radius: 10px;
}

</style>
