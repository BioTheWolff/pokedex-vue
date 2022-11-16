<script setup>
import PokemonIdentity from '../PokemonIdentity.vue';

const props = defineProps({
    stage: Object,
    first: Boolean
})

function getImageUrl() {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.stage.id}.png`
}

function format(text) {
    if (text === undefined) return;
    text = text.replace("-", " ");
    return text[0].toUpperCase() + text.substr(1);
}
</script>

<template>
    <div class="evolution-stage">
        <PokemonIdentity
            :image_url="getImageUrl()"
            :is_legendary="stage.is_legendary"
            :is_mythical="stage.is_mythical"
            :is_baby="stage.is_baby"
            :name="stage.name"
            :id="stage.id"
            :formatter="format"
            compact
            activateClickResponse
            class="identity"
        ></PokemonIdentity>
        <div class="evolution-stage-children" v-if="stage.children">
            <PokemonEvolutionNode
                v-for="(child, index) in stage.children"
                :key="`${stage.name}-${index}`"
                :stage="child"
            ></PokemonEvolutionNode>
        </div>
    </div>
</template>

<style scoped lang="sass">
.evolution-stage
    display: flex
    flex-direction: column
    width: fit-content
    height: fit-content
    gap: 20px

    .identity
        cursor: pointer

    &-children
        display: flex
        flex-direction: row
        justify-content: center
</style>