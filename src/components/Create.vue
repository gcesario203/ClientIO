<template>
  <v-layout flex align-center justify-center>
    <v-row align="center" justify="center">
      <v-card class="px-5 justify-center" width="500" elevation-6>
        <v-card-title class="justify-center" color="primary">
          TCC APP
        </v-card-title>

                <v-col cols="12" align="center">
          <v-text-field label="Nome" v-model="name"></v-text-field>
        </v-col>
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
        <v-col cols="12">
          <v-text-field
            label="Confirme sua senha"
            type="password"
            v-model="confirmSenha"
          ></v-text-field>
        </v-col>
        <v-col cols="12" align="center" justify="center">
          <v-card-subtitle>
            <router-link to="/">
              Já possui cadastro? Clique aqui para entrar</router-link
            >
          </v-card-subtitle>
        </v-col>
        <v-col cols="12" align="center" justify="center">
          <v-btn color="#232e21" @click="createUser()">
            <v-col style="color: white" cols="8" 
              >Cadastrar</v-col
            >
            <v-col cols="4" style="color: white"
              ><v-icon small>mdi-plus</v-icon></v-col
            >
          </v-btn>
        </v-col>
      </v-card>
    </v-row>
  </v-layout>
</template>

<script>
import Utility from '../utils/utils'
import { MethodsConstants } from '../config/constants.js'

export default {
  data() {
    return {
      name: "",
      email: "",
      senha: "",
      confirmSenha: "",
    };
  },
  methods: {
    async createUser() {
      const lFields = {
        nome: this.name,
        email: this.email,
        senha: this.senha,
        confirmsenha: this.confirmSenha,
      };

      const lRespone = await Utility.SendMessageUnauth(MethodsConstants.POST, '/signup', lFields,'Criado com sucesso' )

      if(lRespone.status !== 400 || lRespone.status !== 401 || lRespone.status !== 404 || lRespone.status !== 500  )
      {
        if(await Utility.Login(this.email, this.senha))
        {
          this.$router.push('/hub')
        }
      }
    },
  },
};
</script>

<style>
</style>