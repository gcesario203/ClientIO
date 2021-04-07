<template>
  <div class="inputInsert">
      <input
        v-model="message"
        class="inputInsert__content"
        placeholder="Digite aqui"
        type="text"
      >
      <Send class="input__button" v-on:click="send"/>
  </div>
</template>

<script>
import Send from 'vue-material-design-icons/Send'

export default {
  name: "Input",
  data:function () {
      return{
          message:null,
          messages:[]
      }  
  },
  components:{Send},
  props:['socket','eventName'],
  methods:{
      send()
      {
          this.socket.emit(this.eventName, this.message)
          this.messages.push({id:this.messages.length+1,message:this.message})
          this.$emit('sendMessageChild',this.messages)
          this.message = null
      }
  },
  created()
  {
      this.socket.on(this.eventName, data =>
      {
          this.messages.push({id:this.messages.length+1, message:data})
          this.$emit('sendMessageChild',this.messages)
      })
  }
};
</script>

<style>
.inputInsert {
  grid-area: input;
  width: 100%;
  display: flex;
  align-items: center;
}

.inputInsert__content{
    width: 100%;
    padding: 0 0 0 1rem;    
}

.input__button
{
    padding: 0 2rem;
    background-color: #6F313C;
    transition: 1ms;
}

.input__button:hover{
    cursor: pointer;
    background-color: #974554;
}
</style>