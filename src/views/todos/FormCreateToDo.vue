<template>
    <h1>Create To Do</h1>
    <small class="form-text text-muted">{{ formatedDate }}</small>
    <div class="container border rounded">
        <form action="">
            <div class="form-group">
                <label for="todo1">To Do</label>
                <input id="todo1" v-model="data.todoEvent" type="text" class="form-control" placeholder="Type the thing you have to do today!">
            </div>
            <div class="form-group">
                <label for="todo2">Description</label>
                <textarea id="todo2" v-model="data.todoDescription" class="form-control" placeholder="Enter Description..." rows="5"></textarea>
            </div>
            <div class="form-group">
                <label for="todo3">Date</label>
                <input id="todo3" v-model="data.todoDate" type="date" class="form-control">
            </div>
            <button class="btn"
                v-bind:class="{'btn-danger':!isFormValid,
                                'btn-primary':isFormValid}" 
                v-on:click.prevent="addTodos({
                        'todoEvent': data.todoEvent, 
                        'todoDescription': data.todoDescription,
                        'todoDate': data.todoDate
                    })">Enter
            </button>
        </form>
    </div>
</template>

<script setup>
import { reactive, computed, inject } from 'vue';
import { useRouter } from 'vue-router';

let router = useRouter()

let $todos = inject("$todos")
let data = reactive({
    todoEvent:"",
    todoDescription:"",
    todoDate:null
})

const formatedDate = computed(
    () => {
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        
        let myDate = new Date()
        let year = myDate.getFullYear()
        let month = myDate.getMonth()
        let date = myDate.getDate()
        let day = myDate.getDay()
        return `${weekday[day]}, ${date} ${months[month]} ${year}`
    }
)

let isFormValid = computed(
    () => {
        if(!data.todoEvent || !data.todoDescription || !data.todoDate){
            return false
        }
        return true
    }
)

function addTodos(todoObj){
    if(isFormValid.value){
        console.log(todoObj)
        $todos.insertTodo(todoObj)
        router.push('/todo/list')
        return
    }
    alert("Please Fill All Fields")
}
</script>