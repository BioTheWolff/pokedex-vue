<script setup>
import { ref } from 'vue';
import PokemonType from './detailing/PokemonType.vue';
import PokemonStats from './detailing/PokemonStats.vue';
import PokemonEvolutionChain from './detailing/evolution_chain/PokemonEvolutionChain.vue';

const emits = defineEmits(['notFound'])
const props = defineProps({
    name: String,
})

const pokedex = new Pokedex.Pokedex({
    protocol: 'https',
    cacheImages: true,
});


let p = ref(null);
let s = ref(null);

try {
    p.value = await pokedex.getPokemon(props.name);

    // using the resource function to fix getPokemonSpecies(name) being equivalent to getPokemonSpecies()
    s.value = await pokedex.resource(`/api/v2/pokemon-species/${props.name}`);
} catch (e) {
    emitNotFound(e);
}


function format(text) {
    if (text === undefined) return;
    text = text.replace("-", " ");
    return text[0].toUpperCase() + text.substr(1);
}

function emitNotFound(err) {
    emits('notFound', err);
}
</script>

<template>
    <article v-if="p && s">
        <div id="site-content" class="pokemon-details">
            <div class="main">
                <div 
                    :class="`img-wrapper 
                        ${s.is_legendary ? 'legendary' : ''} 
                        ${s.is_mythical ? 'mythical' : ''} 
                        ${s.is_baby ? 'baby' : ''}
                        `"
                >
                    <img :src="p.sprites.other['official-artwork'].front_default">
                </div>
                <div class="name">
                    <h1>{{ format(p.name) }}</h1>
                    <p>#{{ p.id }}</p>
                </div>
                <section class="types">
                    <PokemonType
                        v-if="s.is_legendary"
                        type="legendary-pokemon"
                        :formatter="format"
                    ></PokemonType>

                    <PokemonType
                        v-if="s.is_mythical"
                        type="mythical-pokemon"
                        :formatter="format"
                    ></PokemonType>

                    <PokemonType
                        v-if="s.is_baby"
                        type="baby-pokemon"
                        :formatter="format"
                    ></PokemonType>

                    <PokemonType
                        v-for="ptype in p.types"
                        :type="ptype.type.name"
                        :key="ptype.slot"
                        :formatter="format"
                    ></PokemonType>
                </section>
            </div>
            <div class="info">
                <section>
                    <h2>Stats</h2>
                    <PokemonStats
                        :stats="p.stats"
                        :formatter="format"
                    ></PokemonStats>
                </section>
                <section>
                    <h2>Abilities</h2>
                    <ul>
                        <li v-for="ability in p.abilities.filter((e) => !e.is_hidden)">
                            {{ format(ability.ability.name) }}
                        </li>
                    </ul>
                </section>
                <section class="evolution-chain">
                    <h2>Evolution chain</h2>
                    <PokemonEvolutionChain
                        :pokedex="pokedex"
                        :url="s.evolution_chain.url"
                        :species="s"
                    ></PokemonEvolutionChain>
                </section>
            </div>
        </div>
    </article>
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
        margin: 0 4em 0 0

        .name
            display: flex
            flex-direction: column
            align-items: center
            text-align: center

            h1
                margin: 0 !important

            p
                margin: 5px 0 10px 0

        .img-wrapper
            width: $img-size-details
            height: $img-size-details
            margin-bottom: 1em

            &.legendary, &.mythical

                &::before
                    content: ""
                    position: absolute
                    width: $img-size-details + 2
                    height: $img-size-details + 2
                    z-index: 0
                    left: 10%

            &.mythical::before
                background: rgb(247,255,0)
                background: radial-gradient(circle, rgba(247,255,0,1) 0%, rgba(246,214,13,1) 55%, rgba(245,161,20,1) 100%)
                clip-path: polygon(50% 0%, 90% 25%, 90% 100%, 50% 75%, 10% 100%, 10% 25%)

            &.legendary::before
                background: rgb(187,51,195)
                background: linear-gradient(138deg, rgba(187,51,195,1) 0%, rgba(121,68,230,1) 57%, rgba(0,80,255,1) 100%)
                clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)

            &.baby
                background: #8be39d
                border-radius: 50px

            img
                position: relative
                z-index: 2
                height: $img-size-details
                width: $img-size-details

        .types
            margin-top: 1em
            gap: 0.5em
            display: flex
            flex-direction: column
            align-items: center

    .info
        display: grid
        grid-template: auto auto / auto auto
        gap: 3em

        @include for-phone-only
            display: flex
            flex-direction: column
            gap: 1em

        & > section
            display: flex
            flex-direction: column

        .evolution-chain
            grid-column: 1 / 3
</style>