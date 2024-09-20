<template>
    <h1>JSON Placeholder API</h1>
    <div>
        <div v-if="data.posts">
            <div v-for="post of data.posts" class="card bg-light mb-3">
                <div class="card-header">{{post.title}}</div>
                <div class="card-body">
                    <p class="card-text">{{post.body}}</p>
                </div>
            </div>
        </div>
    
        <div v-if="data.errors">
            <div v-for="error of data.errors" class="card text-white bg-danger mb-3">
                <div class="card-header">ERROR!</div>
                <div class="card-body">
                    <p class="card-text">{{error.message}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import $axiosPlaceholderAPI from '@/utils/AxiosPL';
import { reactive, onBeforeMount } from 'vue';

let data = reactive({
    posts:[],
    errors:[]
})

function getAllPosts(){
    $axiosPlaceholderAPI
    .get('posts')
    .then(response => {
        data.posts = response.data
    })
    .catch(error => {
        data.errors.push(error)
    })
}

onBeforeMount(
    () => {
        getAllPosts()
    }
)
</script>