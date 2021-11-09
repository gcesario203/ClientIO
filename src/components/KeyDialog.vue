<template>
  <v-dialog max-width="500px" v-model="open">
    <v-card>
      <v-card-title class="pa-4">
        Insira a chave da sala
        <v-spacer></v-spacer>
        <v-btn icon color="red" @click="open = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text :style="'color:black'">
              <v-text-field label="Chave da Sala" v-model="keyValue" type="password"></v-text-field>
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>

        <v-btn class="pa-4" color="#232e21" dark @click="acceptCallback()">
          Enviar <v-icon class="ml-4" color="white" small>mdi-send</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => {
    return {
      open: false,
      keyValue: '',
      roomid: null
    };
  },
  methods: {
    acceptCallback() {
      this.open = false;
      const lKeyObj = {
        pRoomId: this.roomid,
        pKey: this.keyValue
      }
      
      this.$emit('acceptCallback', lKeyObj);
    },

    openModal(pRoomId) {
      this.roomid = pRoomId
      this.open = true;
    },
  },
};
</script>

<style>
</style>