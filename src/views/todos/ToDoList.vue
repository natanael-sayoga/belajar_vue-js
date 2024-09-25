<template>
    <h6>
        My Todo List:
    </h6>
    <tr>
        <th>
            <button 
                class="btn btn-success"
                v-on:click.prevent="goToCreate()">
                Add New Todo
            </button>
        </th>
        <th>
            <button 
                class="btn btn-danger"
                v-on:click.prevent="deleteItems()">
                Delete Selected Item
            </button>
        </th>
    </tr>
    <table v-bind:class="`table table-striped table-hover`">
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>When</th>
                <th>Delete?</th>
            </tr>
        </thead>
        <tbody v-if="data.todos.length != 0">
            <tr v-for="(todo, index) in data.todos" v-bind:key="index" v-on:click.prevent="goToUpdate(index)">
                <td>{{ todo.todoEvent }}</td>
                <td>{{ todo.todoDescription }}</td>
                <td>{{ todo.todoDate }}</td>
                <td><input type="checkbox" v-on:click.stop="addToDeletedSet(index)"></td>
            </tr>
        </tbody>
        <tbody v-else>
            <tr>
                <td>Not Available</td>
                <td>Not Available</td>
                <td>Not Available</td>
                <td>Not Available</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { reactive, inject, watch, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

let router = useRouter()
let $todos = inject("$todos")
let deletedSet = new Set()

let data = reactive({
    todos:[]
})

function getTodos(){
    return $todos.getAllTodos()
}

function goToCreate(){
    router.push('/todo/create')
}

function goToUpdate(index){
    router.push(`/todo/update/${index}`)
}

function addToDeletedSet(index){
    if(deletedSet.has(index)){
        deletedSet.delete(index)
        return
    }
    deletedSet.add(index)
}

function deleteItems(){
    $todos.deleteTodo(deletedSet)
    let newArr = $todos.getAllTodos()
    data.todos = [...newArr]
}

// watch(
//     () => data.todos,
//     (newLength, oldLength) => {
//         //re-render after deleting
//         console.log("ToDoList Watcher: array size changed!")
//         data.todos = getTodos()
//     },
//     {deep:true}
// )

onBeforeMount(
    () => {
        data.todos = getTodos()
    }
)
</script>

<style scoped>
tr:hover td{
    cursor: pointer;
    background-color: mediumseagreen;
}
</style>