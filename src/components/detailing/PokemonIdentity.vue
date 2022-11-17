<script setup>
import { useRouter } from 'vue-router';
import PokemonType from './PokemonType.vue';

const router = useRouter();
const props = defineProps({
    image_url: String,

    is_legendary: Boolean,
    is_mythical: Boolean,
    is_baby: Boolean,

    id: Number,
    name: String,
    variety: {
        type: String,
        default: null,
    },

    formatter: Function,
    activateClickResponse: Boolean,

    compact: Boolean,
    hideName: Boolean
})

function goToPokemonPage() {
    if (!props.activateClickResponse) return;

    let params = { name: props.name };
    if (props.variety) {
        params.variety = props.variety;
    }

    router.push({ name: 'details', params: params })
}

function formattedName() {
    let name = props.name;

    // replace dashes with parenthesis wrapping
    if (name.includes('-')) {
        let n = name.split('-');
        name = `${n[0]} (${n.slice(1).join(' ')})`
    }

    name = name[0].toUpperCase() + name.substr(1);

    return name;
}
</script>

<template>
    <div 
        :class="`pokemon-identity 
            ${compact ? 'compact' : ''} 
            ${activateClickResponse ? 'pointer' : ''}`"
        @click="goToPokemonPage()"
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
        <div class="name" v-if="!hideName">
            <h1 v-if="!compact">{{ formattedName() }}</h1>
            <p v-else>{{ formattedName() }}</p>

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

    &.pointer
        cursor: pointer

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
                background: $mythical-color
                background: $mythical-gradient
                clip-path: $mythical-clip-path

            &.legendary::before
                background: $legendary-color
                background: $legendary-gradient
                clip-path: $legendary-clip-path

            &.baby::before
                background: $baby-color
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
        width: fit-content
        height: fit-content

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