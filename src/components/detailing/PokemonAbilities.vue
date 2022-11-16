<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    pokedex: Object,
    abilities: Array,
    formatter: Function,
})

let urls = ref(null);
let formed_abilities = ref(null);

watch(() => props.abilities, async () => {
    await run();
})
await run();


async function run() {
    urls.value = props.abilities.filter((e) => !e.is_hidden).map(e => e.ability.url)
    formed_abilities.value = await props.pokedex.resource(urls.value);
}
</script>

<template>
    <details
        class="ability"
        v-for="ability of formed_abilities"
        :key="ability.name"
    >
        <summary>{{ formatter(ability.name) }}</summary>
        <p>{{ ability.effect_entries.filter(e => e.language.name === 'en')[0].effect }}</p>
    </details>
</template>

<style scoped lang="sass">
.ability
    width: 70%
    display: flex
    padding: 10px
    max-height: 150px
    overflow-y: scroll

    background: $bg-card
    border: 3px solid $bg-accent
    border-radius: 10px

    @include for-wide-and-up
        width: 250px

    p
        margin: 20px 0 0 0
        word-break: normal
</style>