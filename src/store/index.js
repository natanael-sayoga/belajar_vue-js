import { Store } from "vuex";
import HTTPH2service from "@/services/HTTP-H2service";
import { useRouter, useRoute } from "vue-router";

const $store = new Store({
    state:{
        tutorials: [],
        currentTutorial: {
            id: null,
            title: "",
            description: "",
            published: false
        },
        errors: []
    },
    mutations:{
        setTutorials(state, tutorialArr){
            state.tutorials = tutorialArr
        },
        setCurrentTutorial(state, currentTutorial){
            state.currentTutorial = currentTutorial
        },
        setErrors(state,errorsObj){
            state.errors.push(errorsObj)
        },
        clearTutorials(state){
            state.tutorials = []
        },
        clearCurrentTutorials(state){
            state.currentTutorial = null
        },
        clearErrors(state){
            state.errors = []
        }
    },
    getters:{
        getTutorials(state){
            return state.tutorials
        },
        getCurrentTutorial(state){
            return state.currentTutorial
        },
        getErrors(state){
            return state.errors
        }
    },
    actions:{
        fetchAllTutorial(context){
            HTTPH2service
            .getAll()
            .then(
                response => {
                    console.log(response)
                    context.commit('setTutorials', response.data)
                }
            )
            .catch(
                error => {
                    console.log(error)
                    context.commit('setErrors', error)
                }
            )
        },

        fetchSingleTutorial(context, id){
            HTTPH2service
            .get(id)
            .then(
                response => {
                    console.log(response)
                    context.commit('setCurrentTutorial', response.data)
                }
            )
            .catch(
                error => {
                    console.log(error)
                    context.commit('setErrors', error)
                }
            )
        },

        fetchTutorialByTitle(context, title){
            HTTPH2service
            .findByTitle(title)
            .then(
                response => {
                    console.log(response)
                    context.commit('setTutorials', response.data)
                }
            )
            .catch(
                error => {
                    console.log(error)
                    context.commit('setErrors', error)
                }
            )
        },

        createTutorial(newTutorial){
            HTTPH2service
            .create(newTutorial)
        },

        removeAllTutorials(){
            HTTPH2service
            .deleteAll()
            .then(
                response => {
                    console.log(response)      
            })
            .catch(
                error => {
                    data.errors.push(error)
            })
        },

        deleteTutorial() {
            HTTPH2service.delete(data.currentTutorial.id)
        }
    }
})

export default $store