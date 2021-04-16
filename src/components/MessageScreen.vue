<template>
  <div class="message">
      <!--<div class="message__content" v-for="message in messages" :key="message.id">
          <MessageContent name="teste" :message="message.message"/>
      </div>-->
      <div class="message__content" v-for="message in messages" :key="message.id">
          <MessageContent name="teste" :message="message.message"/>
      </div>
  </div>
</template>

<script>
import MessageContent from './MessageContent'
export default 
{
    name:'Message',
    props:['messages'],
    components:{MessageContent}
};
</script>

<style>

.message{
    grid-area: message;
    background-color: #BA9B8E;
    display: flex;
    height: 100%;
    flex-direction: column;
    overflow-y: scroll;
}
</style>