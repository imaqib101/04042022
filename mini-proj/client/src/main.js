import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import store from "./store";
import router from "vue-router";

loadFonts();

createApp(App).use(store).use(vuetify).use(router).mount("#app");
