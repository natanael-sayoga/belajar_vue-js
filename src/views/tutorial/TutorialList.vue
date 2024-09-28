<template>
    <h6>
        List Of Tutorials:
    </h6>
    <div class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search by title"
                v-model="data.searchTitle"/>
                <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button"
                    @click="$store.dispatch('fetchTutorialByTitle', data.searchTitle)">
                    Search
                </button>
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <h4>Tutorials List</h4>
            <ul class="list-group">
                <li class="list-group-item"
                    :class="{ active: index == data.currentIndex }"
                    v-for="(tutorial, index) in $store.getters.getTutorials"
                    :key="index"
                    @click="setActiveTutorial(tutorial, index)">
                    {{ tutorial.title }}
                </li>
            </ul>

            <button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">
                Remove All
            </button>
        </div>

        <div class="col-md-6">
            <div v-if="data.currentTutorial">
                <h4>Tutorial</h4>
                <div>
                    <label><strong>Title:</strong></label> {{ data.currentTutorial.title }}
                </div>
                <div>
                    <label><strong>Description:</strong></label> {{ data.currentTutorial.description }}
                </div>
                <div>
                    <label><strong>Status:</strong></label> {{ data.currentTutorial.published ? "Published" : "Pending" }}
                </div>
                <RouterLink :to="'/tutorialapi/list/' + data.currentTutorial.id" class="btn btn-warning">Edit</RouterLink>
            </div>
            <div v-else>
                <br/>
                <p>Please click on a Tutorial...</p>
            </div>
        </div>
    </div>

    <hr>
    <div v-if="$store.getters.getErrors && $store.getters.getErrors.length > 0">
        <div v-for="error of data.errors" class="card text-white bg-danger mb-3">
            <div class="card-header">ERROR CODE: {{ error.code }}</div>
            <div class="card-body">
                <p class="card-text">{{error.message}}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, onBeforeMount } from 'vue';
import { useStore } from 'vuex';

let $store = useStore()
let data = reactive({
    tutorials: [],
    errors: [],
    currentTutorial: null,
    currentIndex:-1,
    searchTitle: "",
})

function setActiveTutorial(tutorial, index){
    data.currentTutorial = tutorial
    data.currentIndex = index
}

function removeAllTutorials(){
    $store.dispatch('removeAllTutorials')
    if(data.errors.length == 0){
        refreshList()
    }
}

async function refreshList(){
    await $store.dispatch('fetchAllTutorial')
    data.tutorials = $store.getters.getTutorials
    data.errors = $store.getters.getErrors
    data.currentTutorial = null
    data.currentIndex = -1
}

onBeforeMount(
    async () => {
        await $store.dispatch('fetchAllTutorial')
        data.tutorials = $store.getters.getTutorials
        data.errors = $store.getters.getErrors
    }
)
</script>