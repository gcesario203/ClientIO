<template>
  <v-row align="center" justify="center">
    <v-col cols="11">
      <v-text-field v-model="message" @keyup.enter="send" label="Digite aqui" />
    </v-col>
    <v-col cols="1">
      <v-btn @click="send" icon>
        <v-icon small>mdi-send</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Input",
  data: function () {
    return {
      message: null,
      messages: [],
    };
  },
  props: ["socket", "eventName", "roomName"],
  methods: {
    send() {
      this.socket.emit(this.eventName, {
        roomName: this.roomName,
        msg: this.message,
      });
      this.messages.push({
        id: this.messages.length + 1,
        message: this.message,
      });
      this.$emit("sendMessageChild", this.messages);
      this.message = null;
    },
  },
  created() {},
  mounted() {
    this.socket.on(this.eventName, (data) => {
      this.messages.push({ id: this.messages.length + 1, ...data });
      this.$emit("sendMessageChild", this.messages);
    });
  },
};
</script>

<style>
</style>