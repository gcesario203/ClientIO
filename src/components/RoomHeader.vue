<template>
<div class="roomHeader">
    <h2>{{roomName}}</h2>
</div>
</template>

<script>
export default {
    name:'RoomHeader',
    props:['roomName']
}
</script>

<style>
.roomHeader{
    grid-area: header;
    background-color: #585651;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    color: white;
}
</style>