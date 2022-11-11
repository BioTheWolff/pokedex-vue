<script setup>
import { ref, watchEffect } from 'vue';
import PokemonTile from './PokemonTile.vue';


const pokedex = new Pokedex.Pokedex({
    protocol: 'https',
    cacheImages: true,
});

let page = ref(0);
let pokemons = ref([]);

watchEffect(async () => {
    let pokemons_list = await pokedex.getPokemonSpeciesList();
    pokemons.value = await pokemons_list.results;
})

</script>

<template>
    <div class="pokemon-list">
        <PokemonTile 
            v-for="(pokemon, index) in pokemons"
            :key="index"
            :id="index + 1"
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
</style>