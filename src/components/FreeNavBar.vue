<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">{{ navbarTitle }}</a>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
                <li 
                    v-for="(page, index) in links" class="nav-item" v-bind:key="index">
                    <NavBarLink
                        v-bind:page="page"
                        :to="page.index"
                    >
                    </NavBarLink>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script setup>
import { reactive, inject, defineProps } from 'vue';
import NavBarLink from './NavBarLink.vue';

const props = defineProps({
    navbarTitle: {
        type:String
    },
    links: {
        type: Array,
        default(){
            return [{page:{title: "title"}, index:"/"}]
        }
    }
})
</script>