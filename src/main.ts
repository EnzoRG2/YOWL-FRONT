import { createApp } from 'vue';
import { createPinia } from 'pinia'; // ✅ Import Pinia
import App from './App.vue';
import router from './router';

const app = createApp(App);

const pinia = createPinia(); // ✅ Création de Pinia
app.use(pinia); // ✅ On active Pinia dans Vue
app.use(router);

app.mount('#app'); // ✅ Montre l'application APRES avoir ajouté Pinia
