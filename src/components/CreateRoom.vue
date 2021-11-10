<template>
  <v-dialog max-width="500px" v-model="open">
    <v-card>
      <v-card-title class="pa-4">
        Digite os dados da sala
        <v-spacer></v-spacer>
        <v-btn icon color="red" @click="open = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text :style="'color:black'">
              <v-row justify="center" align="center">
                  <v-col cols="8">
                      <v-text-field label="Nome da Sala" v-model="roomName" type="text"></v-text-field>
                  </v-col>
                  <v-col cols="4">
                      <v-switch label="Privada?" v-model="type"></v-switch>
                  </v-col>
                  <v-col cols="12" v-if="type">
                      <v-text-field label="Chave da Sala" v-model="key" type="password"></v-text-field>
                  </v-col>
              </v-row>
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>

        <v-btn class="pa-4" color="#232e21" dark @click="acceptCallback()">
          Criar <v-icon class="ml-4" color="white" small>mdi-plus</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { GeneralConstants } from '../config/constants'

export default {
  data: () => {
    return {
      open: false,
      roomName: '',
      type: false,
      key:''
    };
  },
  methods: {
    acceptCallback() {
      this.open = false;

      const lUserId = JSON.parse(localStorage.getItem(GeneralConstants.STORAGEKEY))

      const lObj ={
          usuarioId: lUserId.id,
          nome: this.roomName,
          tipo: this.type ? 1 :0,
          chave: this.key
      }
      
      this.$emit('acceptCallback', lObj);
    },

    openModal() {
      this.open = true;
    },
  },
};
</script>

<style>
</style>