<script setup>
import { ref } from 'vue';
const props = defineProps({
    name: String,
})

const pokedex = new Pokedex.Pokedex({
    protocol: 'https',
    cacheImages: true,
});


let p = ref({});
let pokemon_info = await pokedex.getPokemon(props.name);
p.value = await pokemon_info;

let s = ref({});
// bug on the wrapper - trying to fetch one pokemon species fetches all of them
// using the endpoint ourselves to fix this
let req = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${props.name}`);
s.value = await req.json();


function format(text) {
    if (text === undefined) return;
    text = text.replace("-", " ");
    return text[0].toUpperCase() + text.substr(1);
}
</script>

<template>
    <h1>{{ format(p.name) }} (#{{ p.id }})</h1>
    <div id="site-content" class="pokemon-details">
        <div class="main">
            <div v-if="s.is_legendary">(LEGENDARY)</div>
            <div>
                <img :src="p.sprites.other['official-artwork'].front_default">
            </div>
            <div>
                <ul>
                    <li v-for="typ in p.types">{{ format(typ.type.name) }}</li>
                </ul>
            </div>
        </div>
        <div class="info">
            <div>
                <section>
                    <h3>Stats</h3>
                    <ul>
                        <li v-for="stat in p.stats">{{ format(stat.stat.name) }}: {{ stat.base_stat }}</li>
                    </ul>
                </section>
            </div>
            <div>
                <section>
                    <h3>Abilities</h3>
                    <ul>
                        <li v-for="ability in p.abilities.filter((e) => !e.is_hidden)">
                            {{ format(ability.ability.name) }}
                        </li>
                    </ul>
                </section>
            </div>
            <div>
                
            </div>
        </div>
    </div>
</template>

<style scoped lang="sass">
.pokemon-details
    display: flex
    justify-content: left
    gap: 3em

    @include for-phone-only
        flex-direction: column
    
    .main
        display: flex
        flex-direction: column

    .info
        display: grid
        grid-template: auto / auto auto auto
        gap: 3em

        @include for-phone-only
            display: flex
            flex-direction: column
            gap: 1em

        & > div
            display: flex
            flex-direction: column


    img
        height: $img-size-details
        width: $img-size-details
</style>