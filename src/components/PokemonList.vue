<script setup>
import { ref } from 'vue';
import PokemonTile from './PokemonTile.vue';
import ErrorCard from './_structure/ErrorCard.vue';


const emits = defineEmits(['chgPage', 'outOfBounds'])
const props = defineProps({
    page: Number,
    nbPerPage: Number,

    isSearch: Boolean,
    searchTerm: String,
})


const pokedex = new Pokedex.Pokedex({
    protocol: 'https',
    cacheImages: true,
});


let pokemons = ref([]);
let pokemons_list = await pokedex.getPokemonSpeciesList();
pokemons.value = await pokemons_list.results;

function getFilteredList() {
    if (!props.isSearch) {
        return pokemons.value;
    }

    let st = props.searchTerm.toLowerCase();

    // filter the pokemons either on id or on name
    return pokemons.value.filter((e) => {
        return e.name.toLowerCase().includes(st) || (Number(st) && e.url.includes(st))
    });
}


function getSlicedList() {
    let page_ = props.page;
    let nb = props.nbPerPage;
    let p = getFilteredList();

    return p.slice(page_*nb,(page_+1)*nb)
}

// keep the tile key consistent with the search so as not to lose any optimisation
function getTileKey(pokemon, index) {
    if (props.isSearch) {
        return Number(pokemon.url.match(/([0-9]+)/g)[1])
    } else {
        return props.page*props.nbPerPage + index
    }
}

// check if page number is above the amount of data we have
if (props.page*props.nbPerPage >= getFilteredList().length) {
    emits('outOfBounds')
}
</script>

<template>
    <div class="pagination">
          <button @click="this.$emit('chgPage', -1)" v-visible="page > 0">Previous page</button>
          <button @click="this.$emit('chgPage', 1)" v-visible="getSlicedList().length === $props.nbPerPage">Next page</button>
      </div>
    <div class="pokemon-list">
        <PokemonTile 
            v-for="(pokemon, index) in getSlicedList()"
            :key="getTileKey(pokemon, index)"
            :name="pokemon.name"
            :url="pokemon.url"
        ></PokemonTile>
    </div>

    <ErrorCard
        v-if="isSearch && getSlicedList().length === 0"
        error="404"
        smaller
    ></ErrorCard>
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