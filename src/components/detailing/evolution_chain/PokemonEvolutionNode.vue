<script setup>
defineProps({
    stage: Object,
    first: Boolean
})
</script>

<template>
    <div class="evolution-stage">
        > {{stage.name}}
        <PokemonEvolutionNode
            v-if="stage.children"
            v-for="(child, index) in stage.children"
            :key="`${stage.name}-${index}`"
            :stage="child"
        ></PokemonEvolutionNode>
    </div>
</template>

<style scoped lang="sass">
.evolution-stage
    display: flex
    background: $bg-accent
    border: 1px solid black
    padding: 5px
    margin: 5px
</style>