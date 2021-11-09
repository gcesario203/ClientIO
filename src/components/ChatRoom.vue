<template>
  <v-layout>
    <v-col cols="4" style="background: white">
      <Member :users="users" :events="userEvents" />
    </v-col>
    <v-col cols="8" style="overflow-y: scroll">
      <RoomHeader :roomName="roomName" />
      <MessageScreen :messages="messages" />
      <Input
        :socket="socket"
        :eventName="events.CHAT_MESSAGE"
        :roomName="realRoomName"
        @sendMessageChild="sendMessageParen"
      />
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
      socket: io("http://localhost:4001/"),
      events: EventConstants,
      messages: [],
      bdMessages: [],
      roomName: "",
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

      const lTest = data.map(x =>{
        let lReturnObj = {}

        if(x.userName === undefined || x.userName === null)
        {
          console.log('do proprio client')

          lReturnObj.userName = this.user.nome

          lReturnObj = {...lReturnObj, ...x}
        }
        else
        {
          lReturnObj = {...x}
        }

        return lReturnObj
      })

      this.messages = lTest;
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

      this.roomName =
        lResponse.data.nome + " - " + this.$router.history.current.params.id;
    },
  },
  async mounted() {
    this.getUser();
    await this.getRoomName(this.$router.history.current.params.id);

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