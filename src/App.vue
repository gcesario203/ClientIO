<template>
  <div id="app">
    <RoomHeader :roomName="roomName"/>
    <MessageScreen :messages="messages"/>
    <Member :users="users" :events="userEvents" />
    <Input :socket="socket" :eventName="events.CHAT_MESSAGE" @sendMessageChild="sendMessageParen"/>
  </div>
</template>

<script>
import Input from './components/Input'
import Member from './components/Members'
import MessageScreen from './components/MessageScreen'
import RoomHeader from './components/RoomHeader'

import io from 'socket.io-client'
import {EventConstants} from './config/constants.js'

export default {
  name: 'App',
  data:function()
  {
    return{
      socket: io('http://localhost:4001/'),
      events: EventConstants,
      messages:[],
      roomName:'SALA MUITO FODA UIUI',
      users:[],
      userEvents:[]
    }
  },
  methods:
  {
    sendMessageParen(data)
    {
      this.messages = data
    }
  },
  created()
  {
    this.socket.emit(this.events.JOIN)
    this.socket.on(this.events.JOIN, data =>
    {
      console.log(data)
    })

    this.socket.on(this.events.LEAVE, data =>
    {
      console.log(data)
    })
  },
  components: 
  {
    Input,
    Member,
    MessageScreen,
    RoomHeader
  }
}
</script>

<style>

*{
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
    height: 100%;
}

#app {
  display: grid;
  grid-template-rows: 2rem 1fr 2rem;
  grid-template-columns: 1fr 15rem;
  grid-template-areas: 
  "header member"
  "message member"
  "input member";
}
</style>
