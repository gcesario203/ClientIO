<template>
  <div class="message">
      <!--<div class="message__content" v-for="message in messages" :key="message.id">
          <MessageContent name="teste" :message="message.message"/>
      </div>-->
      <div class="message__content" v-for="message in messages" :key="message.id">
          <MessageContent :name="message.userName" :message="message.message"/>
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
</style>