<script setup>
import { toRaw } from 'vue';
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

function childrenCount() {
    return toRaw(props.stage.children).length;
}
</script>

<template>
    <div class="evolution-stage">
        <div :class="`identity-wrapper ${$route.params.name === stage.name ? 'current' : ''}`">
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
            <p v-if="$route.params.name === stage.name">currently viewing</p>
        </div>
        <div class="evolution-stage-children" v-if="childrenCount() > 0">
            <div class="arrow"></div>
            <div :class="`content ${childrenCount() > 1 ? 'plural' : ''}`">
                <PokemonEvolutionNode
                    v-for="(child, index) in stage.children"
                    :key="`${stage.name}-${index}`"
                    :stage="child"
                ></PokemonEvolutionNode>
            </div>
        </div>
    </div>
</template>

<style scoped lang="sass">
.evolution-stage
    display: flex
    flex-direction: column
    align-items: center
    width: fit-content
    height: fit-content
    gap: 20px
    overflow-x: scroll

    .identity-wrapper
        display: flex
        flex-direction: column
        align-items: center
        width: fit-content
        height: fit-content
        padding: 5px

        &.current
            border: 1px solid #e3bb71

        p
            text-align: center
            margin: 0
            color: #e3bb71

        .identity
            width: fit-content
            height: fit-content
            cursor: pointer

    &-children
        display: flex
        flex-direction: column
        align-items: center
        width: 100%
        height: fit-content

        .arrow
            margin-bottom: 10px

            width: 40px
            height: 40px
            
            background-color: #dcdcdc
            transform: rotate(180deg)
            clip-path: polygon(70% 100%, 70% 40%, 100% 40%, 50% 0%, 0% 40%, 30% 40%, 30% 100%)

        .content
            padding-top: 5px
            display: flex
            flex-direction: row
            justify-content: center
            flex-wrap: wrap

            &.plural
                border-top: 2px solid black
</style>