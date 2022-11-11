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
    <div class="pokecard">
        <div>
            <img :src="getImageUrl(id)">
        </div>
        <div class="id">#{{ id }}</div>
        <div class="name">{{ name }}</div>
    </div>
</template>

<style scoped lang="sass">
.pokecard
    width: fit-content
    padding: .5em

    background-color: $bg-card
    border-radius: 10px
    box-shadow: 0px 1px 10px -1px rgba(0,0,0,0.75)

    transition: transform .2s ease-out

    &:hover
        transform: scale(1.2)
        transition: transform .2s ease-out

    img
        height: $img-size-list
        width: $img-size-list

    .id
        text-align: center
        color: darken($color, 10%) 

    .name
        font-size: 1.2rem
        text-align: center
</style>