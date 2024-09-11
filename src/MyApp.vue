<template>
    <div v-if="pages.length>0">
        <PageNavBar
            v-bind:pages="pages"
            v-bind:current-page="currentPage"
            v-bind:on-click-listener="(index) => {currentPage = index}">
        </PageNavBar>
        <PageContent 
            v-bind:page="pages[currentPage]">
        </PageContent>
    </div>
    <ToDoForm
        v-bind:formated-date="getFormatedDate"
        v-show="currentPage==0">
    </ToDoForm>
</template>

<script>
import PageContent from './components/PageContent.vue';
import ToDoForm from './components/ToDoForm.vue';
import PageNavBar from './components/PageNavBar.vue';

export default{
    components:{
        PageNavBar,
        PageContent,
        ToDoForm
    },
    created(){
        this.pages = this.getPages()
    },
    data(){
        return{
            currentPage:0,
            pages:[]
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
        async getPages(){
            //let myPages = await fetch("../public/pages.json")
            let myPages = await fetch("../src/datas/pages.json")
            let myJsonPages = await myPages.json()
            this.pages = myJsonPages
        }
    }
}
</script>