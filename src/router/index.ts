import { createRouter, createWebHistory } from 'vue-router';
import Connexion from '../views/Connexion.vue';
import Inscription from '../views/Inscription.vue';
import Accueil from '../views/Accueil.vue';
import Profil from '../views/Profile.vue';
import NouveauPost from '../views/NouveauPost.vue';
import Search from '../views/Search.vue';

const routes = [
  {
    path: '/',
    name: 'connexion',
    component: Connexion,
    meta: { hideFooter: true }
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: Inscription,
    meta: { hideFooter: true }
  },
  {
    path: '/accueil',
    name: 'accueil',
    component: Accueil,
    meta: { hideFooter: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profil,
    meta: { requiresAuth: true }
  },
  {
    path: '/nouveau-post',
    name: 'nouveau-post',
    component: NouveauPost,
    meta: { requiresAuth: true }
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
