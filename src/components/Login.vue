<template>
    <v-layout flex align-center justify-center>
      <v-row align="center" justify="center">
        <v-card class="px-5 justify-center" width="500" elevation-6>
          <v-card-title class="justify-center" color="primary">
            TCC APP
          </v-card-title>

          <v-col cols="12" align="center">
            <v-text-field label="Email" v-model="email"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Senha"
              type="password"
              v-model="senha"
            ></v-text-field>
          </v-col>
          <v-col cols="12" align="center" justify="center">
            <v-card-subtitle>
              <router-link to="Create">
                Não possui cadastro? Clique para criar um
              </router-link>
            </v-card-subtitle>
          </v-col>
          <v-col cols="12" align="center" justify="center">
            <v-btn color="#232e21" @click="authenticate()">
              <v-col cols="8" style="color:white">Login</v-col>
              <v-col cols="4" style="color:white"><v-icon small>mdi-send</v-icon></v-col>
            </v-btn>
          </v-col>
        </v-card>
      </v-row>
    </v-layout>
</template>

<script>
import UtilityObj from "../utils/utils.js";

export default {
  data() {
    return {
      email: "",
      senha: "",
    };
  },
  methods: {
    async authenticate() {
      const lResponse = await UtilityObj.Login(this.email, this.senha);
      console.log('aa', lResponse)
      if (lResponse !== false) {
        this.$router.push("/Hub");
      }
    },
  },
};
</script>

<style>
</style>