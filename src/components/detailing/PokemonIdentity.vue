<script setup>
import { useRouter } from 'vue-router';
import PokemonType from './PokemonType.vue';

const router = useRouter();
const props = defineProps({
    image_url: String,
    is_legendary: Boolean,
    is_mythical: Boolean,
    is_baby: Boolean,
    name: String,
    id: Number,
    formatter: Function,
    compact: Boolean,
    activateClickResponse: Boolean,
})

function goToPokemonPage(pname) {
    if (!props.activateClickResponse) return;

    router.push({ name: 'details', params: { name: pname } })
}
</script>

<template>
    <div 
        :class="`pokemon-identity ${compact ? 'compact' : ''}`"
        @click="goToPokemonPage(name)"
    >
            <div 
            :class="`img-wrapper 
                ${is_legendary ? 'legendary' : ''} 
                ${is_mythical ? 'mythical' : ''} 
                ${is_baby ? 'baby' : ''}
                `"
        >
            <img :src="image_url">
        </div>
        <div class="name">
            <h1 v-if="!compact">{{ formatter(name) }}</h1>
            <p v-else>{{ formatter(name) }}</p>

            <p v-if="!compact">#{{ id }}</p>
        </div>

        <div class="rarity-type" v-if="!compact">
            <PokemonType
                v-if="is_legendary"
                type="legendary-pokemon"
                :formatter="formatter"
            ></PokemonType>

            <PokemonType
                v-if="is_mythical"
                type="mythical-pokemon"
                :formatter="formatter"
            ></PokemonType>

            <PokemonType
                v-if="is_baby"
                type="baby-pokemon"
                :formatter="formatter"
            ></PokemonType>
        </div>
    </div>
</template>

<style scoped lang="sass">
.pokemon-identity
    display: flex
    flex-direction: column
    align-items: center

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

        &.legendary, &.mythical, &.baby

            &::before
                content: ""
                float: left
                position: absolute
                width: $img-size-details
                height: $img-size-details
                z-index: 1

            &.mythical::before
                background: rgb(247,255,0)
                background: radial-gradient(circle, rgba(247,255,0,1) 0%, rgba(246,214,13,1) 55%, rgba(245,161,20,1) 100%)
                clip-path: polygon(50% 0%, 90% 25%, 90% 100%, 50% 75%, 10% 100%, 10% 25%)

            &.legendary::before
                background: rgb(187,51,195)
                background: linear-gradient(138deg, rgba(187,51,195,1) 0%, rgba(121,68,230,1) 57%, rgba(0,80,255,1) 100%)
                clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)

            &.baby::before
                background: #8be39d
                border-radius: 50%

        img
            position: relative
            z-index: 2
            height: $img-size-details
            width: $img-size-details

    .rarity-type
        margin-top: 1em
        gap: 0.5em
        display: flex
        flex-direction: column
        align-items: center


    &.compact
        .name > p
            margin: 0

        .img-wrapper
            width: $img-size-default
            height: $img-size-default
            margin-bottom: 0

            &.legendary, &.mythical, &.baby
                &::before
                    width: $img-size-default
                    height: $img-size-default
            
            img
                width: $img-size-default
                height: $img-size-default
</style>