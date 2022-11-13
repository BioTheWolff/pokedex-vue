<script setup>

function back() {
    window.history.go(-1)
}

function home(router) {
    router.push({path: '/'})
}
</script>

<template>
    <h1>Pokemons List</h1>
    <div id="site-content">
        <p>Sorry, I think you got lost!</p>
        <p>You should either <button @click="back()">go back</button> or <button @click="home($router)">go to the homepage</button></p>
    </div>
</template>