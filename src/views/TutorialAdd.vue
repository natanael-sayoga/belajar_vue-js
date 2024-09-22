<template>
    <h6>
        Create New Tutorial
    </h6>
    <div class="submit-form">
    <div v-if="!data.submitted">
        <div class="form-group">
            <label for="title">Title</label>
            <input
                type="text"
                class="form-control"
                id="title"
                required
                v-model="data.tutorial.title"
                name="title"
            />
        </div>

        <div class="form-group">
            <label for="description">Description</label>
            <input
                class="form-control"
                id="description"
                required
                v-model="data.tutorial.description"
                name="description"
            />
        </div>
        <button @click.prevent="addTutorial()" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click.prevent="resetForm()">Add New Tutorial</button>
    </div>
    <hr>
    <div v-if="data.errors && data.errors.length > 0">
        <div v-for="error of data.errors" class="card text-white bg-danger mb-3">
            <div class="card-header">ERROR CODE: {{ error.code }}</div>
            <div class="card-body">
                <p class="card-text">{{error.message}}</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import HTTP_H2service from '@/services/HTTP-H2service';
import { reactive } from 'vue';

let data = reactive({
    tutorial: {
        id: null,
        title: "",
        description: "",
        published: false
    },
    submitted: false,
    errors: []
})

function addTutorial(){
    HTTP_H2service.create({
        title:data.tutorial.title,
        description: data.tutorial.description,
        published: data.tutorial.published
    })
    .then(
        response => {
            console.log("TutorialAdd.vue response:")
            console.log(response)
            data.submitted = true
        }
    )
    .catch(
        error => {
            data.errors.push(error)
        }
    )
}

function resetForm(){
    data.submitted = false
    data.errors = [],
    data.tutorial = {
        id: null,
        title: "",
        description: "",
        published: false
    }
}
</script>