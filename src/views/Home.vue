<template>
  <div>
    <h1>Accueil</h1>
    <PostForm />
    <router-link to="/posts">Voir les posts</router-link>
  </div>
</template>

<script setup>
import PostForm from '../components/PostForm.vue';
</script>
