<script setup>
defineProps({
    type: String,
    formatter: Function,
})
</script>

<template>
    <div :class="`pokemon-type ${type}`">{{ formatter(type) }}</div>
</template>

<style scoped lang="sass">
.pokemon-type
    width: max-content
    padding: 5px 10px

    border: 3px solid #aea6ad
    border-radius: 10px

    color: #fafafa
    font-weight: bold
    text-align: center

    &.bug
        background: #389a52
        border-color: #184e23
    &.dark
        background: #5a5979
        border-color: #040706
    &.dragon
        background: #5fcdd6
        border-color: #458a95
    &.electric
        background: #fefb75
        border-color: #e4e430
        color: #333
    &.fairy
        background: #e81469
        border-color: #9a1748
    &.fighting
        background: #ef6138
        border-color: #963f24
    &.fire
        background: #fd4c5a
        border-color: #aa2222
    &.flying
        background: #94b3c9
        border-color: #4a677d
    &.ghost
        background: #95658e
        border-color: #323266
    &.grass
        background: #27cb4d
        border-color: #147b3f
    &.ground
        background: #6f481f
        border-color: #a87331
    &.ice
        background: #d8f0fa
        border-color: #7ecdee
        color: #333
    &.normal
        background: #ca98a7
        border-color: #734f59
    &.poison
        background: #9a68d8
        border-color: #5d2b8b
    &.psychic
        background: #f61d91
        border-color: #a5286d
    &.rock
        background: #893e25
        border-color: #4c160d
    &.steel
        background: #41be94
        border-color: #517a6c
    &.water
        background: #86a8fc
        border-color: #1851e0

    &.baby-pokemon
        margin-bottom: 2em
        color: #333

        background: #8be39d
        border-color: transparent

    &.legendary-pokemon
        margin-bottom: 2em
        border: none
        padding: 7px 12px

        background: rgb(187,51,195)
        background: linear-gradient(138deg, rgba(187,51,195,1) 0%, rgba(121,68,230,1) 57%, rgba(0,80,255,1) 100%)

    &.mythical-pokemon
        margin-bottom: 2em
        border: none
        padding: 7px 12px
        color: #333
        
        background: rgb(247,255,0)
        background: radial-gradient(circle, rgba(247,255,0,1) 0%, rgba(246,214,13,1) 55%, rgba(245,161,20,1) 100%)
</style>