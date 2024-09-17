<template>
    <RouterLink
        class="nav-link"
        active-class="active underline"
        :to="`/${index}`">
        {{ page.title }}
    </RouterLink>
</template>

<script setup>
import { defineProps } from 'vue';
    const props = defineProps(['page', 'index'])
</script>

<style scoped>
.underline{
    text-decoration: underline !important
}
</style>