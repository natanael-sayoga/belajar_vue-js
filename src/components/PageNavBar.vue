<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Navbar</a>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
                <li 
                    v-for="(page, index) in data.pages" class="nav-item" v-bind:key="index">
                    <NavBarLink
                        v-bind:page="page"
                        v-bind:index="index"
                    >
                    </NavBarLink>
                </li>
                <NavBarLink
                    v-bind:page="{title: 'To Do List'}"
                    :to="`/todo/list`"
                    >
                </NavBarLink>
            </ul>
        </div>
    </nav>
</template>

<script setup>
import { reactive, inject } from 'vue';
import NavBarLink from './NavBarLink.vue';

let $pages = inject('$pages')
let data = reactive(
    {pages: $pages.getAllPages()}
)
</script>