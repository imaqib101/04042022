<template>
  <v-container fluid>
    <v-row>
      <v-col cols="18" md="12">
        <v-textarea
          name="input-7-1"
          label=""
          value=""
          hint="Output text"
        ></v-textarea>
      </v-col>
    </v-row>
  </v-container>
  <v-btn v-on:click="send" color="third" elevation="1" x-large>Save</v-btn>
</template>

<script>
// import axios from "axios";
export default {
  data: () => ({
    inputText: [],
  }),
  methods: {
    send() {},
  },
};
</script>

<style scoped></style>
