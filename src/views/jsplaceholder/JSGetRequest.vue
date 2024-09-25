<template>
    <div v-if="data.posts && data.posts.length > 0">
        <div v-for="post of data.posts" class="card bg-light mb-3">
            <div class="card-header">user ID:{{post.userId}}, post ID:{{ post.id }}</div>
            <div class="card-body">
                <h5 class="card-title">{{ post.title }}</h5>
                <p class="card-text">{{post.body}}</p>
            </div>
        </div>
    </div>
    <div v-else-if="data.errors && data.errors.length > 0">
        <div v-for="error of data.errors" class="card text-white bg-danger mb-3">
            <div class="card-header">ERROR!</div>
            <div class="card-body">
                <p class="card-text">{{error.message}}</p>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="card text-black bg-warning mb-3">
            <div class="card-header">Please Wait...</div>
            <div class="card-body">
                <p class="card-text">Try To Fetch Your Response...</p>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import $axiosPlaceholderAPI from '@/utils/AxiosPL';
import { reactive, onBeforeMount, watch } from 'vue';
import { useRoute } from 'vue-router';

let route = useRoute()
let data = reactive({
    posts:[],
    errors:[]
})

function getAllPosts(){
    $axiosPlaceholderAPI
    .get(`posts/${route.params.postId}`)
    .then(response => {
        //no need to JSON.parse() it, since the response is automatically parsed
        console.log(`JSONPlaceholderPage\ngetAllPosts() Response ->`)
        console.log(response)
        data.posts = response.data.length > 1 ? response.data : [response.data]
    })
    .catch(error => {
        console.log(`JSONPlaceholderPage\ngetAllPosts() Error -> ${error}`)
        data.errors.push(error)
    })
}

async function asyncGetAllPosts(){
    try {
      const response = await $axiosPlaceholderAPI.get(`http://jsonplaceholder.typicode.com/posts`)
      data.posts = response.data
    } catch (e) {
      data.errors.push(e)
    }
}

watch(
    () => route.params,
    (newParams, oldParams) => {
        data.posts = []
        data.errors = []
        getAllPosts()
    }
)

onBeforeMount(
    () => {
        getAllPosts()
        //asyncGetAllPosts()
    }
)
</script>