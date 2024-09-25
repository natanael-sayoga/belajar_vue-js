<template>
    <h1>Update</h1>
    <div class="container border rounded" v-if="data.todo">
        <form action="">
            <div class="form-group">
                <label for="todo1">To Do</label>
                <input id="todo1" v-model="data.todo.todoEvent" type="text" class="form-control" placeholder="Type the thing you have to do today!">
            </div>
            <div class="form-group">
                <label for="todo2">Description</label>
                <textarea id="todo2" v-model="data.todo.todoDescription" class="form-control" rows="5"></textarea>
            </div>
            <div class="form-group">
                <label for="todo3">Date</label>
                <input id="todo3" v-model="data.todo.todoDate" type="date" class="form-control">
            </div>
            <button class="btn" 
                v-on:click.prevent="update(route.params.todoIndex, { 'todoEvent':data.todo.todoEvent, 'todoDescription':data.todo.todoDescription, 'todoDate':data.todo.todoDate })"
                v-bind:class="{'btn-primary':isFormValid,
                                'btn-danger':!isFormValid}">
                Update
            </button>
        </form>
    </div>
    <div class="container border rounded" v-else>
        Data Not Found
    </div>
</template>

<script setup>
import { reactive, inject, computed, watch, onBeforeMount, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

let route = useRoute()
let router = useRouter()
let $todos = inject('$todos')
let data = reactive({
    todo: null
})

let isFormValid = computed(
    () => {
        return !(!data.todo.todoEvent || !data.todo.todoDescription || !data.todo.todoDate)
    }
)

function update(index, todoObj){
    if(!isFormValid.value){
        alert("Make sure to fill all the forms")
        return
    }
    $todos.updateTodo(index, todoObj)
    router.push("/todo/list")
}

watch(
    () => route.params,
    (newParams, oldParams) => {
        data.todo = $todos.getSingleTodo(newParams.todoIndex)
    }
)

onBeforeMount(
    () => {
        data.todo = $todos.getSingleTodo(route.params.todoIndex)
    }
)

onMounted(
    //debugging purposes, data state right after this component is mounted
    () => {
        console.log("FormUpdateToDo are Mounted!")
    }
)

</script>