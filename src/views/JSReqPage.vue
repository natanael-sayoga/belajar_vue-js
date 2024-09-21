<template>
    <h1>JSON Placeholder API</h1>
    <h6>Select REQUEST call</h6>
    <div class="button-nav">
        <button type="button" class="btn btn-primary" v-on:click.prevent="get()">GET</button>
        <button type="button" class="btn btn-success" v-on:click.prevent="post()">POST</button>
        <button type="button" class="btn btn-warning" v-on:click.prevent="put()">UPDATE</button>
        <button type="button" class="btn btn-warning" v-on:click.prevent="patch()">PATCH</button>
        <button type="button" class="btn btn-danger" v-on:click.prevent="del()">DELETE</button>
    </div>
    <RouterView>

    </RouterView>
</template>

<script setup>
import { useRouter } from 'vue-router';

let router = useRouter()

function get(){
    let postId = prompt("Enter a number between 1 and 100\nclicking ENTER without entering a number will show you all posts")
    router.push(`/jsonplaceholderapi/get/${postId}`)
}

function post(){
    router.push(`/jsonplaceholderapi/post`)
}

function put(){
    router.push(`/jsonplaceholderapi/put`)
}

function patch(){
    router.push(`/jsonplaceholderapi/patch`)
}

function del(){
    router.push(`/jsonplaceholderapi/delete`)
}
</script>

<style scoped>
.btn{
    margin-right: 10px;
}
.button-nav{
    margin-bottom: 10px;
}
</style>