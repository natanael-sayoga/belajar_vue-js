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
                    @click="searchTitle()">
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
                    v-for="(tutorial, index) in data.tutorials"
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
    <div v-if="data.errors && data.errors.length > 0">
        <div v-for="error of data.errors" class="card text-white bg-danger mb-3">
            <div class="card-header">ERROR CODE: {{ error.code }}</div>
            <div class="card-body">
                <p class="card-text">{{error.message}}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import HTTPH2service from '@/services/HTTP-H2service';
import { reactive, onBeforeMount } from 'vue';


let data = reactive({
    tutorials: [], //
    currentTutorial: null, //
    currentIndex:-1,
    searchTitle: "",
    errors: [] //
})

function retrieveTutorials(){
    HTTPH2service
    .getAll()
    .then(
        response => {
            console.log("TutorialList.vue response")
            console.log(response)
            data.tutorials = response.data
        }
    )
    .catch(
        error => {
            data.errors.push(error)
        }
    )
}

function setActiveTutorial(tutorial, index){
    data.currentTutorial = tutorial
    data.currentIndex = index
}

function searchTitle(){
    HTTPH2service
    .findByTitle(data.searchTitle)
    .then(
        response => {
            console.log("TutorialList.vue response")
            console.log(response)
            data.tutorials = response.data
        }
    )
    .catch(
        error => {
            data.errors.push(error)
        }
    )
}

function removeAllTutorials(){
    HTTPH2service
    .deleteAll()
    .then(
        response => {
            console.log("TutorialList.vue response")
            console.log(response)
            refreshList()
        }
    )
    .catch(
        error => {
            data.errors.push(error)
        }
    )
}

function refreshList(){
    retrieveTutorials()
    data.currentTutorial = null
    data.currentIndex = -1
}

onBeforeMount(
    () => {
        retrieveTutorials()
    }
)

// export default {
//   name: "tutorials-list",
//   data() {
//     return {
//       tutorials: [],
//       currentTutorial: null,
//       currentIndex: -1,
//       title: ""
//     };
//   },
//   methods: {
//     retrieveTutorials() {
//       HTTPH2service.getAll()
//         .then(response => {
//           this.tutorials = response.data;
//           console.log(response.data);
//         })
//         .catch(e => {
//           console.log(e);
//         });
//     },

//     refreshList() {
//       this.retrieveTutorials();
//       this.currentTutorial = null;
//       this.currentIndex = -1;
//     },

//     setActiveTutorial(tutorial, index) {
//       this.currentTutorial = tutorial;
//       this.currentIndex = tutorial ? index : -1;
//     },

//     removeAllTutorials() {
//       HTTPH2service.deleteAll()
//         .then(response => {
//           console.log(response.data);
//           this.refreshList();
//         })
//         .catch(e => {
//           console.log(e);
//         });
//     },
    
//     searchTitle() {
//         HTTPH2service.findByTitle(this.title)
//             .then(response => {
//                 this.tutorials = response.data;
//                 this.setActiveTutorial(null);
//                 console.log(response.data);
//             })
//                 .catch(e => {
//                 console.log(e);
//             });
//     }
//   },
//   mounted() {
//     this.retrieveTutorials();
//   }
//};

</script>