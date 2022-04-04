<template>
  <v-file-input counter show-size truncate-length="15"></v-file-input>
  <v-btn color="primary" elevation="3" x-large>Scrape</v-btn>
</template>

<script>
// import axios from "axios";

export default {
  data: () => ({
    uploadFiles: [],
  }),

  methods: {
    upload() {
      this.$refs.fileInput.click();
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createFile(files[0]);
    },
    createFile(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadFiles.push({
          name: file.name,
          src: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style></style>
