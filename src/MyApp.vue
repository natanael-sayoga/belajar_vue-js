<template>
    <div class="container">
        <h1>
            {{ pages[0].title }}
        </h1>
        <div>
            {{ pages[0].content }}
        </div>
    </div>
    <div class="container border rounded">
        <form action="">
            <div class="form-group">
                <label for="todo">To Do</label>
                <input v-model="todoInput" class="form-control" id="todo" aria-describedby="todoHelp" placeholder="Type the thing you have to do today!">
                <small id="todoHelp" class="form-text text-muted">{{ getFormatedDate }}</small>
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
    data(){
        return{
            pages:[
                    {
                        title: 'about',
                        content: 'Project ini dibuat untuk keperluan belajar Vue Js'
                    }
            ],
            todoInput:"",
            todos:[]
        }
    },
    computed:{
        getFormatedDate(){
            const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
            const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
            
            let myDate = new Date()
            let year = myDate.getFullYear()
            let month = myDate.getMonth()
            let date = myDate.getDate()
            let day = myDate.getDay()
            return `${weekday[day]}, ${date} ${months[month]} ${year}`
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