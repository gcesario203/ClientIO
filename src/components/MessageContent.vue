<template>
    <div class="messageContent">
        <h3 class="messageContent__name">{{name}}</h3>
        <h3 class="messageContent__message">{{message}}</h3>
    </div>
</template>

<script>
export default {
    name:'MessageContent',
    props:['name','message']
}
</script>

<style>
.messageContent{
    display: table;
    background-color: white;
    width:15rem;
    margin:1rem 2rem;
    border-radius: 8px;height: 4rem;
    max-height: 20rem;
    padding: 0 1rem 1rem 1rem;
}

.messageContent__name{
    height: 1.5rem;
    display: table-row;
    font-size: 0.8rem;
}

.messageContent__message{
    height: 1.5rem;
    display: table-row;

}
</style>