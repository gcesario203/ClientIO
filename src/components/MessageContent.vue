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
</style>