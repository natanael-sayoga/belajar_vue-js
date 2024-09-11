<template>
    <div class="container border rounded">
        <form action="">
            <div class="form-group">
                <label for="todo">To Do</label>
                <input v-model="todoInput" class="form-control" id="todo" aria-describedby="todoHelp" placeholder="Type the thing you have to do today!">
                <small id="todoHelp" class="form-text text-muted">{{ formatedDate }}</small>
            </div>
            <button class="btn btn-primary" v-on:click.prevent="addTodos(todoInput)">Enter</button>
        </form>
        <ol v-if="todos.length>0">
            <li v-for="event in todos">{{ event }}</li>
        </ol>
    </div>
</template>

<script>
export default{
    props:['formatedDate'],
    data(){
        return{
            todoInput:"",
            todos:[]
        }
    },
    methods:{
        addTodos(todo){
            if(todo!=""){
                this.todos.push(todo)
            }
            console.log(this.todos)
        }
    }
}
</script>