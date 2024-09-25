<template>
    <h6>
        Details:
    </h6>
    <div v-if="data.currentTutorial" class="edit-form">
        <h4>Tutorial</h4>
        <form>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title"
                    v-model="data.currentTutorial.title"
                />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" class="form-control" id="description"
                    v-model="data.currentTutorial.description"
                />
            </div>

            <div class="form-group">
                <label><strong>Status:</strong></label>
                {{ data.currentTutorial.published ? "Published" : "Pending" }}
            </div>
        </form>

        <button
            v-if="data.currentTutorial.published"
            class="btn btn-primary"
            @click="updatePublished(false)">
            UnPublish
        </button>
        <button 
            v-else 
            class="btn btn-primary"
            @click="updatePublished(true)">
            Publish
        </button>

        <button class="btn btn-danger mr-2"
            @click="deleteTutorial">
            Delete
        </button>
        <button type="submit" class="btn btn-success"
            @click="updateTutorial">
            Update
        </button>
        <p>{{ data.message }}</p>
    </div>

    <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
    </div>
</template>

<script setup>
import HTTPH2service from '@/services/HTTP-H2service';
import { reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

let $router = useRouter()
let $route = useRoute()
let data = reactive({
    currentTutorial: null, //
    message: ''
})

function getTutorial(id){
    HTTPH2service.get(id)
        .then(response => {
            data.currentTutorial = response.data;
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
}

function updatePublished(status) {
    let updated = {
        id: data.currentTutorial.id,
        title: data.currentTutorial.title,
        description: data.currentTutorial.description,
        published: status
    }

    HTTPH2service.update(data.currentTutorial.id, updated)
        .then(response => {
            console.log(response.data);
            data.currentTutorial.published = status;
            data.message = 'The status was updated successfully!';
        })
        .catch(e => {
            console.log(e);
        });
}

function updateTutorial() {
    HTTPH2service.update(data.currentTutorial.id, data.currentTutorial)
        .then(response => {
            console.log(response.data);
            data.message = 'The tutorial was updated successfully!';
        })
        .catch(e => {
            console.log(e);
        });
}

function deleteTutorial() {
    HTTPH2service.delete(data.currentTutorial.id)
        .then(response => {
            console.log(response.data);
            $router.push("/tutorialapi/list");
        })
        .catch(e => {
            console.log(e);
        });
}

onMounted(
    () => {
        data.message = '';
        getTutorial($route.params.id);
    }
)

// mounted() {
//     this.message = '';
//     this.getTutorial(this.$route.params.id);
// }

// export default {
//     name: "tutorial",
//     data() {
//         return {
//             currentTutorial: null,
//             message: ''
//         };
//     },
//     methods: {
//         getTutorial(id) {
//         HTTPH2service.get(id)
//             .then(response => {
//                 this.currentTutorial = response.data;
//                 console.log(response.data);
//             })
//             .catch(e => {
//                 console.log(e);
//             });
//         },

//         updatePublished(status) {
//         var data = {
//             id: this.currentTutorial.id,
//             title: this.currentTutorial.title,
//             description: this.currentTutorial.description,
//             published: status
//         };

//         HTTPH2service.update(this.currentTutorial.id, data)
//             .then(response => {
//                 console.log(response.data);
//                 this.currentTutorial.published = status;
//                 this.message = 'The status was updated successfully!';
//             })
//             .catch(e => {
//                 console.log(e);
//             });
//         },

//         updateTutorial() {
//         HTTPH2service.update(this.currentTutorial.id, this.currentTutorial)
//             .then(response => {
//                 console.log(response.data);
//                 this.message = 'The tutorial was updated successfully!';
//             })
//             .catch(e => {
//                 console.log(e);
//             });
//         },

//         deleteTutorial() {
//         HTTPH2service.delete(this.currentTutorial.id)
//             .then(response => {
//                 console.log(response.data);
//                 this.$router.push({ name: "tutorials" });
//             })
//             .catch(e => {
//                 console.log(e);
//             });
//         }
//     },
//     mounted() {
//         this.message = '';
//         this.getTutorial(this.$route.params.id);
//     }
// };
</script>

<style scoped>
.btn{
    margin-left: 10px;
}
</style>