<template>
    <form @submit.prevent="submitPost">
      <textarea v-model="content" placeholder="Écris ton post ici..."></textarea>
      <button type="submit">Publier</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { usePostStore } from '../stores/postStore';


  
  const postStore = usePostStore();
  const content = ref('');
  
  const submitPost = async () => {
    if (content.value.trim() !== '') {
      await postStore.createPost(content.value);
      content.value = ''; // Réinitialise le champ
    }
  };
  </script>
  
  <style scoped>
  textarea {
    width: 100%;
    height: 80px;
    margin-bottom: 10px;
  }
  </style>
  