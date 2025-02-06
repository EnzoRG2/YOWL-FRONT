<template>
    <div class="connexion-container">
      <h1 class="title">TKNS</h1>
      <form @submit.prevent="handleSubmit">
        <input v-model="email" type="email" placeholder="Adresse mail" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit">Connexion</button>
      </form>
      <div class="footer-links">
        <router-link to="/inscription">S'inscrire</router-link>
        <router-link to="/mot-de-passe-oublie">Mot de passe oublié ?</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      handleSubmit() {
        console.log('Connexion avec:', this.email, this.password);
        this.$router.push('/accueil');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Centrer le formulaire de connexion comme une application mobile */
  .connexion-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #fff;
    padding: 0 20px;
    box-sizing: border-box;
  }
  
  .title {
    font-size: 3em;
    margin-bottom: 1.5em;
    color: #333;
  }
  
  input {
    padding: 12px;
    margin: 10px 0;
    border-radius: 8px;
    border: 1px solid #ccc;
    width: 100%;
    max-width: 400px;
    font-size: 1.1em;
  }
  
  button {
    padding: 12px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 8px;
    width: 100%;
    max-width: 400px;
    font-size: 1.1em;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .footer-links {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 400px;
    margin-top: 20px;
  }
  
  footer-link {
    color: #4CAF50;
    text-decoration: none;
    font-size: 0.9em;
  }
  
  footer-link:hover {
    text-decoration: underline;
  }
  </style>  