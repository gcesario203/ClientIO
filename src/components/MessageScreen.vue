<template>
  <v-container fluid class="message">
    <v-layout
      :class="user.nome !== message.userName ? 'd-flex justify-end' : ''"
      v-for="message in messages"
      :key="message.id"
    >
      <MessageContent
        :style="user.nome === message.userName ? 'background:#DCF8C6' : ''"
        :name="message.userName"
        :message="message.message"
      />
    </v-layout>
  </v-container>
</template>

<script>
import MessageContent from "./MessageContent";
import {
  GeneralConstants
} from "../config/constants.js";
export default {
  name: "Message",
  data: function () {
    return {
      user: {},
    };
  },
  props: ["messages"],
  components: { MessageContent },
  methods: {
    getUser() {
      this.user = JSON.parse(localStorage.getItem(GeneralConstants.STORAGEKEY));

      console.log(this.user.nome)
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style>
</style>