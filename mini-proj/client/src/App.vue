<template>
  <v-app>
    <v-main> <NavBar /><FileUpload /><TextField /><SimpleUpload /> </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
// import SimpleUpload from "./components/SimpleUpload.vue";
import TextField from "./components/TextField.vue";
import FileUpload from "./components/FileUpload.vue";

// import axios from ".axios";

export default {
  name: "App",

  components: {
    NavBar,
    FileUpload,
    TextField,
    // SimpleUpload,
  },

  data: () => ({
    //
  }),
};
</script>
