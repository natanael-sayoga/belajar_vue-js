import { createApp } from 'vue'
import MyApp from './MyApp.vue'
import router from './utils/Router'
import $todos from './datas/Todo'
import $pages from './datas/PagesData'

const myApp = createApp(MyApp)

if(localStorage.getItem('pages')===null){
    localStorage.setItem('pages', `[
        {
            "title": "about",
            "content": "Project ini dibuat untuk keperluan belajar Vue Js"
        },
        {
            "title": "contacts",
            "content": "github: NatanaelSayoga"
        }
    ]`)
}
if(localStorage.getItem('todos')===null){
    localStorage.setItem('todos', `[]`)
}

myApp.use(router)
myApp.provide("$pages", $pages)
myApp.provide("$todos", $todos)
myApp.mount('#myApp')