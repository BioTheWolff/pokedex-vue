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

chain.value = {
    name: props.species.name,
    children: buildChain(req.value.chain)
}

function buildChain(stage) {
    if (stage.evolves_to.length === 0) return [];

    let children = [];
    for (let child of stage.evolves_to) {
        children.push({
            name: child.species.name,
            children: buildChain(child)
        })
    }
    return children;
}
</script>

<template>
    <PokemonEvolutionNode
        :stage="chain" first
    ></PokemonEvolutionNode>
</template>