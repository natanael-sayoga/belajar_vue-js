<template>
    <h6>Spring Boot H2 API Call</h6>
    <div class="container border">
        <FreeNavBar
            v-bind:navbar-title="'Tutorial'"
            v-bind:links="[
            {title: 'Lists', index: '/tutorialapi/list'},
            {title: 'Create', index: '/tutorialapi/add'}
        ]">
        </FreeNavBar>
        <RouterView>

        </RouterView>
    </div>
</template>

<script setup>
import FreeNavBar from '@/components/FreeNavBar.vue';

</script>