<template>
    <div class="container">
        <h1>
            {{ data.page.title }}
        </h1>
        <div>
            {{ data.page.content }}
        </div>
    </div>
</template>

<script setup>
import { reactive, inject, watch, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

let route = useRoute()
let $pages = inject('$pages')

let currentPage = null
let data = reactive({
    page: null
})

function getPage(index){
    return $pages.getSinglePage(index)
}
function getCurrentPage(){
    return route.params.currentPage ? route.params.currentPage : 0
}

onBeforeMount(
    () => {
        currentPage = getCurrentPage()
        data.page = getPage(currentPage)
    }
)
watch(
    () => route.params,
    (newParams, oldParams) => {
        data.page = getPage(getCurrentPage())
    }
)
</script>