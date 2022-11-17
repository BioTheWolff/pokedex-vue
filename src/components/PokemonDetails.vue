<script setup>
import { ref, watch } from 'vue';
import LoadingSpinner from './detailing/LoadingSpinner.vue';
import PokemonAbilities from './detailing/PokemonAbilities.vue';
import PokemonType from './detailing/PokemonType.vue';
import PokemonStats from './detailing/PokemonStats.vue';
import PokemonIdentity from './detailing/PokemonIdentity.vue';
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


watch(() => props.name, async () => {
    await loadPokemon();
})

await loadPokemon();

async function loadPokemon() {
    try {
        p.value = await pokedex.getPokemon(props.name);

        // using the resource function to fix getPokemonSpecies(name) being equivalent to getPokemonSpecies()
        s.value = await pokedex.resource(p.value.species.url);
    } catch (e) {
        emitNotFound(e);
    }
}

function format(text) {
    if (text === undefined) return;
    text = text.replace("-", " ");
    return text[0].toUpperCase() + text.substr(1);
}

function emitNotFound(err) {
    emits('notFound', err);
}

function getMostImportantType() {
    if (s.value.is_legendary) return 'legendary';
    if (s.value.is_mythical) return 'mythical';
    if (s.value.is_baby) return 'baby';
    return '';
}
</script>

<template>
    <article v-if="p && s">
        <div id="site-content" class="pokemon-details">
            <div class="main">
                <PokemonIdentity
                    :image_url="p.sprites.other['official-artwork'].front_default"
                    :is_legendary="s.is_legendary"
                    :is_mythical="s.is_mythical"
                    :is_baby="s.is_baby"
                    :name="p.name"
                    :id="p.id"
                    :formatter="format"
                ></PokemonIdentity>
                <section class="types">
                    <PokemonType
                        v-for="ptype in p.types"
                        :type="ptype.type.name"
                        :key="ptype.slot"
                        :formatter="format"
                    ></PokemonType>
                </section>
            </div>
            <div class="info-wrapper">
                <div class="info">
                    <section>
                        <h2>Stats</h2>
                        <PokemonStats
                            :stats="p.stats"
                            :formatter="format"
                            :identity_type="getMostImportantType()"
                        ></PokemonStats>
                    </section>
                    <section>
                        <h2>Abilities</h2>
                        <Suspense>
                            <div class="abilities">
                                <PokemonAbilities
                                    :pokedex="pokedex"
                                    :abilities="p.abilities"
                                    :formatter="format"
                                ></PokemonAbilities>
                            </div>

                            <template #fallback>
                                <LoadingSpinner
                                    active
                                    text="Loading..."
                                ></LoadingSpinner>
                            </template>
                        </Suspense>
                    </section>
                </div>
                <div class="info">
                    <section class="evolution-chain">
                        <h2>Evolution tree</h2>
                        <Suspense>
                            <PokemonEvolutionChain
                                :pokedex="pokedex"
                                :url="s.evolution_chain.url"
                                :species="s"
                            ></PokemonEvolutionChain>

                            <template #fallback>
                                <LoadingSpinner
                                    active
                                    text="Loading..."
                                ></LoadingSpinner>
                            </template>
                        </Suspense>
                    </section>
                </div>
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

        @include for-up-to-tablet
            margin-right: 0

        .types
            margin-top: 1em
            gap: 0.5em
            display: flex
            flex-direction: column
            align-items: center

    .info-wrapper
        display: flex
        flex-direction: column
        gap: 3em

        @include for-up-to-wide
            flex-direction: column
            gap: 1em

    .info
        display: flex
        flex-wrap: wrap
        gap: 3em

        @include for-up-to-wide
            flex-direction: column
            gap: 1em

        & > section
            max-width: 100vw
            display: flex
            flex-direction: column

            h2
                width: fit-content

        .evolution-chain
            width: 100%

        .abilities
            display: flex
            flex-direction: column
            gap: 1em
</style>