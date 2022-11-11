<script setup>
defineProps({
    id: Number,
    name: String,
    url: String,
})

function getImageUrl(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
</script>

<template>
    <div>
        {{ id }} {{ name }}
        <img :src="getImageUrl(id)" />
    </div>
</template>

<style scoped>

</style>