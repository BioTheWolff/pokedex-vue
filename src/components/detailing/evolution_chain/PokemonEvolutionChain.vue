<script setup>
import { ref } from 'vue';
import PokemonEvolutionNode from './PokemonEvolutionNode.vue';

const props = defineProps({
    pokedex: Object,
    url: String,
    species: Object,
})

const p = props.pokedex;
const chain = ref({});

let can_evolve = ref(true);
let should_render_tree = ref(false);

let req = ref(null);
req.value = await p.resource(props.url);

if (req.value.chain.evolves_to.length === 0) {
    can_evolve.value = false;
}


async function loadEvolutionTree() {
    chain.value = await buildChain(req.value.chain);
    should_render_tree.value = true;
}

async function buildChain(stage) {
    let is_current = props.species.name === stage.species.name
    let data = is_current
        ? props.species
        : await props.pokedex.resource(stage.species.url)

    let children = [];
    if (stage.evolves_to.length > 0) {
        for (let child of stage.evolves_to) {
            children.push(await buildChain(child))
        }
    }

    return {
        id: data.id,
        name: data.name,
        is_baby: data.is_baby,
        is_mythical: data.is_mythical,
        is_legendary: data.is_legendary,
        is_current: is_current,
        children: children
    };
}
</script>

<template>
    <div class="evolution-chain-wrapper">
        <div v-if="can_evolve">
            <button 
                class="button"
                v-if="!should_render_tree"
                @click="loadEvolutionTree()"
            >
                Load evolution tree
            </button>

            <PokemonEvolutionNode
                v-if="should_render_tree"
                :stage="chain" first
            ></PokemonEvolutionNode>
        </div>

        <p v-else>This pokemon cannot evolve.</p>
    </div>
</template>

<style scoped lang="sass">
.evolution-chain-wrapper
    display: flex
    flex-direction: column
    align-items: center
    border-radius: 10px

    width: 80%
    overflow-x: scroll
    background: $bg-card

    @include for-up-to-tablet
        width: 95vw

    > div
        max-width: 100%
        overflow-x: scroll
        padding: 30px
        gap: 20px


</style>