<template>
  <div>
    <h1>Liste des posts</h1>
    <button @click="fetchPosts">🔄 Recharger</button>
    <ul v-if="postStore.posts.length > 0">
      <li v-for="post in postStore.posts" :key="post.id">
        <p>{{ post.content }}</p>
        <small>Posté par {{ post.author?.username || "Anonyme" }}</small>
        <button v-if="post.author?.id === postStore.userId" @click="postStore.deletePost(post.id)">
          ❌ Supprimer
        </button>
      </li>
    </ul>
    <p v-else>Aucun post disponible.</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { usePostStore } from '../stores/postStore'; 
const postStore = usePostStore();

const fetchPosts = () => {
  postStore.fetchPosts();
};

onMounted(() => {
  fetchPosts();
});
</script>