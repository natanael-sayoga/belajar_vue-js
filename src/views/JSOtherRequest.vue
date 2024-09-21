<template>
    <div>
        <form v-if="mode == 'post'" action="">
            <div class="form-group">
                <label>Title</label>
                <input v-model="data.input.title" type="text" class="form-control" placeholder="Enter post title...">
            </div>
            <div class="form-group">
                <label>Body</label>
                <input v-model="data.input.body" type="text" class="form-control" placeholder="Enter post content...">
            </div>
            <button 
                type="button" 
                class="btn btn-secondary"
                v-on:click="sendNewPost()">
                Post
            </button>
        </form>

        <form v-if="mode == 'put' || mode == 'patch'" action="">
            <div class="form-group">
                <label>Post ID</label>
                <input v-model="data.input.id" type="number" min="1" max="100" class="form-control" placeholder="Enter a number between 1-100">
            </div>
            <div class="form-group">
                <label>Title</label>
                <input v-model="data.input.title" type="text" class="form-control" placeholder="Enter post title...">
            </div>
            <div class="form-group">
                <label>Body</label>
                <input v-model="data.input.body" type="text" class="form-control" placeholder="Enter post content...">
            </div>
            <button
                v-if="mode == 'put'"
                type="button" 
                class="btn btn-secondary"
                v-on:click="putPost(data.input)">
                Update
            </button>
            <button 
                v-if="mode == 'patch'"
                type="button" 
                class="btn btn-secondary"
                v-on:click="patchPost(data.input)">
                Patch
            </button>
        </form>

        <form v-if="mode == 'delete'" action="">
            <div class="form-group">
                <label>Post ID</label>
                <input v-model="data.input.id" type="number" min="1" max="100" class="form-control" placeholder="Enter a number between 1-100">
            </div>
            <button 
                type="button" 
                class="btn btn-secondary"
                v-on:click="deletePost()">
                Delete
            </button>
        </form>
    </div>
    <div v-if="data.response">
        <h5>API's Response:</h5>
        <div class="card-body">
            <p class="card-text">Code: {{data.response.status}} - {{ data.response.statusText }}</p>
        </div>

        <div class="card mt-3">
            <div class="card-header">Headers</div>
            <div class="card-body">
                <pre>{{JSON.stringify(data.response.headers, null, 2)}}</pre>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-header">Body</div>
            <div class="card-body">
                <pre>{{ JSON.stringify(data.response.data, null, 2) }}</pre>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-header">Config</div>
            <div class="card-body">
                <pre>{{ JSON.stringify(data.response.config, null, 2) }}</pre>
            </div>
        </div>
    </div>
    
    <div v-if="data.errors && data.errors.length > 0">
        <div v-for="error of data.errors" class="card text-white bg-danger mb-3">
            <div class="card-header">ERROR!</div>
            <div class="card-body">
                <p class="card-text">{{error.message}}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import $axiosPlaceholderAPI from '@/utils/AxiosPL';
import { reactive, onBeforeMount, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

let route = useRoute()
let data = reactive({
    input: {
        id: "",
        title: "",
        body: ""
    },
    response: null,
    errors: []
})

let mode = computed(
    () => {
        let link = route.fullPath
        return link.split('/')[2]
    }
)

function sendNewPost(){
    $axiosPlaceholderAPI
    .post('posts', {
        data: {
            title: data.input.title,
            body: data.input.body
        }
    })
    .then(
        response => {
            console.log(response)
            data.response = response
        }
    )
    .catch(
        error => {
            data.errors.push(error)
            data.errors = [...data.errors]
        }
    )
}

function putPost(postObj){
    $axiosPlaceholderAPI
    .put(`posts/${postObj.id}`, {id:`${postObj.id}`, body: `${postObj.body}`})
    .then(
        response => {
            console.log(response)
            data.response = response
        }
    )
    .catch(
        error => {
            console.log(error)
            data.errors.push(error)
            data.errors = [...data.errors]
        }
    )
}

function patchPost(postObj){
    $axiosPlaceholderAPI
    .patch(`posts/${postObj.id}`, {id:`${postObj.id}`, body: `${postObj.body}`})
    .then(
        response => {
            console.log(response)
            data.response = response
        }
    )
    .catch(
        error => {
            console.log(error)
            data.errors.push(error)
            data.errors = [...data.errors]
        }
    )
}

function deletePost(index){
    $axiosPlaceholderAPI
    .delete(`posts/${index}`)
    .then(
        response => {
            console.log(response)
            data.response = response
        }
    )
    .catch(
        error => {
            data.errors.push = error
            data.errors = [...data.errors]
        }
    )
}

function resetForm(){
    data.input = {
            id: "",
            title: "",
            body: ""
        }
        data.response = null
        data.errors = []
}

watch(
    () => route.params,
    (newParams, oldParams) => {
        resetForm()
    }
)

onBeforeMount(
    () => {
        console.log(route.fullPath)
    }
)
</script>