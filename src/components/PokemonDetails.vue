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


let s = ref(null);
let varieties = ref(null);

let p = ref(null);


watch(() => props.name, async () => {
    await loadSpecies();
})

await loadSpecies();

async function loadSpecies() {
    try {
        // using the resource function to fix getPokemonSpecies(name) being equivalent to getPokemonSpecies()
        s.value = await pokedex.resource(`/api/v2/pokemon-species/${props.name}`);

        // fetch all the varieties for this species
        varieties.value = await pokedex.resource(
            s.value.varieties.map(e => e.pokemon.url)
        );

        // convert into an object to be able to fit it well
        varieties.value = varieties.value.reduce((o, cur) => (
            { ...o, [cur.name]: {
                id: cur.id,
                name: cur.name,
                variety_name: cur.name.includes('-')
                    ? cur.name.split('-')[cur.name.split('-').length - 1]
                    : null,
                abilities: cur.abilities,
                stats: cur.stats,
                types: cur.types,
                image_url: cur.sprites.other['official-artwork'].front_default
            }}
        ), {});
        console.log(varieties.value)

        
        // now find the default variety for this species and select it
        p.value = varieties.value[s.value.varieties.filter(e => e.is_default)[0].pokemon.name];

    } catch (e) {
        console.log(e);
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
                <div class="varieties" v-if="s.varieties.length > 1">
                    <PokemonIdentity
                        v-for="v in varieties"
                        :image_url="v.image_url"
                        :is_legendary="s.is_legendary"
                        :is_mythical="s.is_mythical"
                        :is_baby="s.is_baby"
                        :name="v.name"
                        :variety="v.variety_name"
                        :id="v.id"
                        :formatter="format"
                        compact hide-name
                    ></PokemonIdentity>
                </div>
                <div>
                    <PokemonIdentity
                        :image_url="p.image_url"
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
        flex-direction: row
        justify-content: right
        margin: 0 2em 0 0

        @include for-up-to-tablet
            margin-right: 0

        .varieties-wrapper
            display: flex
            justify-content: flex-end
            .varieties
                width: fit-content

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