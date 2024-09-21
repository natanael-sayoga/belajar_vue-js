import PageContent from "@/views/PageContent.vue";
import ToDoForm from "@/views/FormCreateToDo.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import ToDo from "@/views/ToDo.vue";
import ToDoList from "@/views/ToDoList.vue";
import FormUpdateToDo from "@/views/FormUpdateToDo.vue";
import JSReqPage from "@/views/JSReqPage.vue";
import JSGetRequest from "@/views/JSGetRequest.vue";
import JSOtherRequest from "@/views/JSOtherRequest.vue";

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
        },
        {
            path:'/jsonplaceholderapi', 
            component: JSReqPage,
            children:[
                {path: 'get/:postId?', component:JSGetRequest},
                {path: 'post', component:JSOtherRequest},
                {path: 'put', component: JSOtherRequest},
                {path: 'patch', component: JSOtherRequest},
                {path: 'delete', component: JSOtherRequest},
            ]
        }
    ]
})

export default router