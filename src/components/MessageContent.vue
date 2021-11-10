<template>
    <v-card width="300" class="mt-5">
        <v-card-title>{{name}}</v-card-title>
        <v-card-text>{{message}}</v-card-text>
    </v-card>
</template>

<script>
export default {
    name:'MessageContent',
    props:['name','message']
}
</script>

<style>
</style>