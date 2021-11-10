<template>
  <v-layout>
    <v-col cols="4" style="color: white">
      <Member :users="users" :events="userEvents" />
    </v-col>
    <v-col
      cols="8"
      style="overflow-y: hidden; overflow-x: hidden; background: #e6e6ea"
    >
      <RoomHeader
        class="d-flex justify-center"
        style="height: 10vh"
        :roomName="roomName"
      />

      <v-row style="height: 80vh; overflow-y: scroll">
        <MessageScreen :messages="messages" />
      </v-row>
      <v-row class="mx-2">
        <Input
          :socket="socket"
          :eventName="events.CHAT_MESSAGE"
          :roomName="realRoomName"
          :roomId="roomId"
          @sendMessageChild="sendMessageParen"
        />
      </v-row>
    </v-col>
  </v-layout>
</template>

<script>
import Input from "./Input";
import Member from "./Members";
import MessageScreen from "./MessageScreen";
import RoomHeader from "./RoomHeader";
import io from "socket.io-client";
import {
  EventConstants,
  GeneralConstants,
  MethodsConstants,
} from "../config/constants.js";
import Utils from "../utils/utils";

export default {
  data: function () {
    return {
      socket: io(GeneralConstants.SOCKETURL),
      events: EventConstants,
      messages: [],
      bdMessages: [],
      roomName: "",
      roomId: "",
      users: [],
      user: {},
      userEvents: [],
    };
  },
  computed: {
    realRoomName() {
      return this.roomName;
    },
  },
  methods: {
    sendMessageParen(data) {
      const lMappedDataMessages = data.map((x) => {
        let lReturnObj = {};
        if (x.userName === undefined || x.userName === null) {
          lReturnObj.userName = this.user.nome;

          lReturnObj = { ...lReturnObj, ...x };
        } else {
          lReturnObj = { ...x };
        }

        return lReturnObj;
      });
      this.messages = [...this.messages, ...lMappedDataMessages];
    },
    getUser() {
      this.user = JSON.parse(localStorage.getItem(GeneralConstants.STORAGEKEY));
    },
    async getUsersFromRoom(pRoomId) {
      const lResponse = await Utils.SendAuthMessage(
        MethodsConstants.GET,
        `/rooms/room/${pRoomId}`
      );

      this.users = lResponse.data.users.map((x) => x.nome);
    },
    async getRoomName(pRoomId) {
      const lResponse = await Utils.SendAuthMessage(
        MethodsConstants.GET,
        `/rooms/${pRoomId}`
      );

      this.roomId = lResponse.data.id;
      this.roomName =
        lResponse.data.nome + " - " + this.$router.history.current.params.id;
    },

    async getMessages() {
      const lResponse = await Utils.SendAuthMessage(
        MethodsConstants.GET,
        `/messages/${this.$router.history.current.params.id}`
      );

      this.messages = lResponse.data.messages.map(x => x = {message: x.conteudo, userName: x.nome})
    },
  },
  async mounted() {
    this.getUser();
    await this.getRoomName(this.$router.history.current.params.id);

    await this.getMessages()

    this.socket.emit(this.events.JOIN, {
      roomName: this.roomName,
      userData: this.user,
    });
    this.socket.on(this.events.JOIN, (data) => {
      this.users = data.map(
        (x) => (x = { name: x.name, socketId: x.socketId })
      );
    });
    this.socket.on(this.events.LEAVE, (data) => {
      if (this.users.filter((x) => x.socketId === data).length > 0) {
        this.users = this.users.filter((x) => x.socketId !== data);
      }
    });
  },
  components: {
    Input,
    Member,
    MessageScreen,
    RoomHeader,
  },
};
</script>

<style>
</style>