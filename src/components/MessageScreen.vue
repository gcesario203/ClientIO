<template>
  <div class="message">
      <div class="message__content" v-for="message in messages" :key="message.id">
          <h1>{{message.message}}</h1>
      </div>
  </div>
</template>

<script>
export default 
{
    name:'Message',
    props:['messages']
};
</script>

<style>

.message{
    grid-area: message;
    background-color: #BA9B8E;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.message__content{
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: 100%;
}
</style>