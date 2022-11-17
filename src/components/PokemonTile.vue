<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
    name: String,
    url: String,
    getPokemonId: Function,
});

function getImageUrl() {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.getPokemonId(props.url)}.png`;
}

function goToDetails() {
    router.push({ name: 'details', params: { name: props.name } })
}

function formattedName() {
    let name = props.name;

    // replace dashes with parenthesis wrapping
    if (name.includes('-')) {
        let n = name.split('-');
        n[n.length - 1] = `(${n[n.length - 1]})`
        name = n.join(' ')
    }

    name = name[0].toUpperCase() + name.substr(1);

    return name;
}
</script>

<template>
    <article class="pokecard" @click="goToDetails()">
        <div>
            <img :src="getImageUrl()" :alt="name">
        </div>
        <div class="id">#{{ getPokemonId(props.url) }}</div>
        <div class="name">{{ formattedName() }}</div>
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