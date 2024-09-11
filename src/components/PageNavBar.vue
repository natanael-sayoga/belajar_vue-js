<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Navbar</a>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
                <li 
                    v-for="(page, index) in pages" class="nav-item" v-bind:key="index">
                    <a 
                        class="nav-link"
                        v-bind:class="{'active underline':currentPage == index}"
                        href="page.url" 
                        v-on:click.prevent="onClickListener(index)">
                        {{ page.title }}
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default{
    props:['onClickListener', 'currentPage', 'pages'],
    data(){
        return{
            currIndex:0
        }
    }
}
</script>
<style scoped>
    .underline{
        text-decoration: underline !important
    } 
</style>