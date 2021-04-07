<template>
  <div id="app">
    <MessageScreen :messages="messages"/>
    <Member />
    <Input :socket="socket" :eventName="events.CHAT_MESSAGE" @sendMessageChild="sendMessageParen"/>
  </div>
</template>

<script>
import Input from './components/Input'
import Member from './components/Members'
import MessageScreen from './components/MessageScreen'
import io from 'socket.io-client'
import {EventConstants} from './config/constants.js'

export default {
  name: 'App',
  data:function()
  {
    return{
      socket: io('http://localhost:4001/'),
      events: EventConstants,
      messages:[]
    }
  },
  methods:
  {
    sendMessageParen(data)
    {
      this.messages = data
    }
  },
  components: 
  {
    Input,Member,MessageScreen
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
  grid-template-rows: 1fr 2rem;
  grid-template-columns: 1fr 15rem;
  grid-template-areas: 
  "message member"
  "input member";
}
</style>
