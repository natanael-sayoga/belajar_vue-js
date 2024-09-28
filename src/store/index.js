import { Store } from "vuex";
import HTTPH2service from "@/services/HTTP-H2service";

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
            state.errors = [errorsObj]
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
        async fetchAllTutorial(context){
            try{
                let response = await HTTPH2service.getAll()
                context.commit('setTutorials', response.data)
            }catch(error){
                console.log(error)
                context.commit('setErrors', error)
            }finally{
                console.log('fetching is done')
            }
        },

        async fetchSingleTutorial(context, id){
            try{
                let response = await HTTPH2service.get(id)
                context.commit('setCurrentTutorial', response.data)
            }catch(error){
                console.log(error)
                context.commit('setErrors', error)
            }
        },

        async fetchTutorialByTitle(context, title){
            try{
                let response = await HTTPH2service.findByTitle(title)
                context.commit('setTutorials', response.data)
            }catch(error){
                console.log(error)
                context.commit('setErrors', error)
            }
        },

        async createTutorial(context, newTutorial){
            try{
                await HTTPH2service.create(newTutorial)
            }catch(error){
                console.log(error)
                context.commit('setErrors', error)
            }
        },

        async updateTutorial(context, tutorialId, tutorialObj){
            try{
                await HTTPH2service.update(tutorialId, tutorialObj)
            }catch(error){
                console.log(error)
                context.commit('setErrors', error)
            }
        },

        async removeAllTutorials(context){
            try{
                await HTTPH2service.deleteAll()
            }catch(error){
                console.log(error)
                context.commit('setErrors', error)
            }
        },

        async deleteTutorial(context, tutorialId) {
            try{
                await HTTPH2service.delete(tutorialId)
            }catch(error){
                console.log(error)
                context.commit('setErrors', error)
            }
        }
    }
})

export default $store