import PageContent from "@/views/PageContent.vue";
import ToDoForm from "@/views/FormCreateToDo.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import ToDo from "@/views/ToDo.vue";
import ToDoList from "@/views/ToDoList.vue";
import FormUpdateToDo from "@/views/FormUpdateToDo.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/:currentPage?', component: PageContent},
        {
            path: '/todo', 
            component:ToDo,
            children:[
                {path: 'create', component:ToDoForm},
                {path: 'list', component: ToDoList},
                {path: 'update/:todoIndex?', component:FormUpdateToDo}
            ]
        }
    ]
})

export default router