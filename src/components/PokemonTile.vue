<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
    name: String,
    url: String,
});

function getPokemonId() {
    return Number(props.url.match(/([0-9]+)/g)[1])
}

function getImageUrl() {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonId()}.png`;
}

function goToDetails() {
    router.push({ name: 'details', params: { name: props.name } })
}
</script>

<template>
    <article class="pokecard" @click="goToDetails()">
        <div>
            <img :src="getImageUrl()" :alt="name">
        </div>
        <div class="id">#{{ getPokemonId() }}</div>
        <div class="name">{{ name }}</div>
    </article>
</template>

<style scoped lang="sass">
.pokecard
    cursor: pointer
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