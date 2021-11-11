<template>
  <v-layout>
    <v-col cols="4" style="background: white">
      <v-row align="center" justify="space-between" class="px-4 pt-4">
        <h1>Dados</h1>
        <v-menu bottom :attach="true" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title @click="logout">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon color="red">mdi-logout</v-icon>
                    </v-btn>
                  </template>
                  <span>Sair</span>
                </v-tooltip>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
      <v-row align="center" justify="space-between" class="px-4 mt-5">
        <v-col cols="12">
          <v-text-field
            label="Nome"
            v-model="user.nome"
            persistent-hint
            @blur="changeUser()"
            hint="Nome que será exibido nas salas"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Email"
            readonly
            disabled
            v-model="user.email"
            persistent-hint
            hint="Email do cadastro"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn
            color="#232e21"
            style="color: white"
            width=""
            @click="openModelCreateRoom()"
          >
            <v-col style="color: white">Criar Sala</v-col>
            <v-col style="color: white"><v-icon small>mdi-plus</v-icon></v-col>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="8" style="overflow-y: scroll">
      <h1 class="text-center" style="color: white">Salas Disponíveis</h1>
      <v-card
        class="mt-5 mx-10"
        v-for="(room, index) in rooms"
        :key="index"
        @click="
          userRooms.filter((x) => x.id === room.salaId).length > 0
            ? goToTheRoom(room.salaId)
            : room.tipo === 1
            ? openModel(room.salaId)
            : joinRoom({ pRoomId: room.salaId })
        "
      >
        <v-card-title
          class="text-center py-0"
          style="background: #232e21; color: white"
        >
          <v-row align="center" justify="space-between" class="py-5">
            <v-col cols="3">
              <span>{{ room.roomname }}</span>
              <v-icon class="ml-3" style="color: white">{{
                room.tipo === 1 ? "mdi-lock" : "mdi-lock-open"
              }}</v-icon>
            </v-col>
            <v-col
              cols="3"
              v-if="userRooms.filter((x) => x.id === room.salaId).length > 0"
            >
              <span>Já sou membro</span>
            </v-col>
            <v-col cols="3">
              <v-icon class="ml-3" style="color: white">mdi-account</v-icon>
              <span>{{ room.usrqtde }}</span>
            </v-col>
          </v-row>
        </v-card-title>
      </v-card>
    </v-col>

    <KeyDialog ref="KeyDialog" @acceptCallback="joinRoom"></KeyDialog>
    <CreateRoom ref="CreateRoom" @acceptCallback="createRoom"></CreateRoom>
  </v-layout>
</template>

<script>
import { GeneralConstants, MethodsConstants } from "../config/constants.js";
import Utils from "../utils/utils";
import KeyDialog from "../components/KeyDialog.vue";
import CreateRoom from "../components/CreateRoom.vue";

export default {
  data() {
    return {
      user: {},
      rooms: [],
      userRooms: [],
    };
  },
  components: {
    KeyDialog,
    CreateRoom
  },
  methods: {
    logout() {
      Utils.LogOut();

      this.$router.push("/");
    },
    getUser() {
      this.user = JSON.parse(localStorage.getItem(GeneralConstants.STORAGEKEY));
    },

    goToTheRoom(pRoomId) {
      this.$router.push(`/chatRoom/${pRoomId}`);
    },
    async getRooms() {
      const lResponse = await Utils.SendAuthMessage(
        MethodsConstants.GET,
        "/roomsGeneral"
      );
      this.rooms = lResponse.data.rooms;
    },
    userIsOnTheRoom(pRoomId) {
      return this.userRooms.filter((x) => x.id === pRoomId) > 0 ? true : false;
    },
    openModel(pRoomId) {
      this.$refs.KeyDialog.openModal(pRoomId);
    },
    openModelCreateRoom() {
      this.$refs.CreateRoom.openModal();
    },
    async getUserRooms() {
      const lResponse = await Utils.SendAuthMessage(
        MethodsConstants.GET,
        `/rooms/user/${this.user.id}`
      );

      this.userRooms = lResponse.data.rooms;
    },
    async changeUser() {
      const lFields = {
        nome: this.user.nome,
        email: this.user.email,
      };

      await Utils.SendMessageUnauth(MethodsConstants.PUT, `/users/${this.user.id}`, lFields,'Nome alterado com sucesso' )

      let lModifiedUser = JSON.parse(localStorage.getItem(GeneralConstants.STORAGEKEY))

      lModifiedUser["nome"] = this.user.nome

      localStorage.setItem(GeneralConstants.STORAGEKEY, JSON.stringify(lModifiedUser))

      this.getUser()
    },
    async createRoom(pData)
    {

      await Utils.SendAuthMessage(
        MethodsConstants.POST,
        `/rooms`,
        pData,
        "Sala criada com sucesso"
      )

      await this.getUserRooms()
      await this.getRooms()
    },
    async joinRoom({ pRoomId, pKey = null }) {
      const lJoinRoomFields = {
        usuarioId: this.user.id,
        salaId: pRoomId,
        chave: pKey !== null ? pKey : "",
      };

      const lResult = await Utils.SendAuthMessage(
        MethodsConstants.POST,
        `/rooms/join`,
        lJoinRoomFields,
        "Aceito na Sala com sucesso"
      );

      if(lResult === false)
      {
        console.log(lResult)
      }
      else
      {
        this.goToTheRoom(pRoomId);
      }
      
    },
  },
  async mounted() {
    this.getUser();

    setInterval(await this.getUserRooms(), 5000);
    setInterval(await this.getRooms(), 5000);
  },

  async beforeDestroy() {
    clearInterval(await this.getUserRooms());
    clearInterval(await this.getRooms());
  },
};
</script>

<style scoped>
</style>