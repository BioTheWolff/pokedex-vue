<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PokemonTile from './PokemonTile.vue';

const router = useRouter();
const route = useRoute();
const pokedex = new Pokedex.Pokedex({
    protocol: 'https',
    cacheImages: true,
});

let page = ref(Number(route.params.page) ?? 0);
let pokemons = ref([]);
let nb_per_page = 50;

let pokemons_list = await pokedex.getPokemonSpeciesList();
pokemons.value = await pokemons_list.results;


function getSlicedList() {
    let page_ = page.value;
    let nb = nb_per_page;
    let p = pokemons.value;

    return p.slice(page_*nb,(page_+1)*nb)
}

function chgPage(mod) {
    page.value += mod;
    router.push({path: `/list/${page.value}`})
}
</script>

<template>
    <div class="pagination">
        <button @click="chgPage(-1)" v-visible="page > 0">Previous page</button>
        <button @click="chgPage(1)" v-visible="getSlicedList().length === nb_per_page">Next page</button>
    </div>
    <div class="pokemon-list">
        <PokemonTile 
            v-for="(pokemon, index) in getSlicedList()"
            :key="index"
            :name="pokemon.name"
            :url="pokemon.url"
        ></PokemonTile>
    </div>
</template>

<style scoped lang="sass">
.pokemon-list
    display: flex
    gap: 2em
    flex-wrap: wrap
    justify-content: space-evenly

.pagination
    margin-bottom: 3em

    display: flex
    justify-content: center
    gap: 2em

    button
        font-size: 0.9em
        padding: 10px
        border-radius: 8px
        border: none
        color: $color
        background-color: $bg-accent
</style>