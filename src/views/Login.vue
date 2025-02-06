<template>
    <div>
      <h1>Connexion</h1>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit">Se connecter</button>
      </form>
      <p v-if="authStore.user">Connecté en tant que {{ authStore.user.username }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '../stores/authStore';

  
  const authStore = useAuthStore();
  const email = ref('');
  const password = ref('');
  
  const login = () => {
    authStore.login(email.value, password.value);
  };
  </script>
  
  <style scoped>
  input {
    display: block;
    margin-bottom: 10px;
  }
  </style>  