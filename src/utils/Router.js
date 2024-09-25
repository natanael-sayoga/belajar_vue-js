import PageContent from "@/views/PageContent.vue";
import ToDoForm from "@/views/todos/FormCreateToDo.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import ToDo from "@/views/todos/ToDo.vue";
import ToDoList from "@/views/todos/ToDoList.vue";
import FormUpdateToDo from "@/views/todos/FormUpdateToDo.vue";
import JSReqPage from "@/views/jsplaceholder/JSReqPage.vue";
import JSGetRequest from "@/views/jsplaceholder/JSGetRequest.vue";
import JSOtherRequest from "@/views/jsplaceholder/JSOtherRequest.vue";
import TutorialHomePage from "@/views/tutorial/TutorialHomePage.vue";
import TutorialList from "@/views/tutorial/TutorialList.vue";
import TutorialDetail from "@/views/tutorial/TutorialDetail.vue";
import TutorialAdd from "@/views/tutorial/TutorialAdd.vue";

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
        },
        {
            path:'/tutorialapi',
            component: TutorialHomePage,
            children:[
                {path: 'list', component:TutorialList},
                {path: 'list/:id', component:TutorialDetail},
                {path: 'add', component:TutorialAdd},
            ]
        }
    ]
})

export default router