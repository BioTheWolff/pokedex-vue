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

let req = ref(null);
req.value = await p.resource(props.url);

chain.value = await buildChain(req.value.chain)

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
    <PokemonEvolutionNode
        :stage="chain" first
    ></PokemonEvolutionNode>
</template>