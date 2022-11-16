<script setup>
defineProps({
    stats: Array,
    formatter: Function,
    identity_type: String,
})

const MAX_STATS = {
    hp: 255,
    attack: 190,
    defense: 250,
    special_attack: 194,
    special_defense: 250,
    speed: 200,
}

const MIN_STATS = {
    hp: 1,
    attack: 5,
    defense: 5,
    special_attack: 10,
    special_defense: 20,
    speed: 5,
}

function range(stat, n) {
    let name = stat.stat.name.replace("-", "_");
    let percentage = stat.base_stat / (MAX_STATS[name] - MIN_STATS[name]);

    let nb_active = Math.floor(percentage * n);

    return [...Array(n-nb_active).fill('bar'), ...Array(nb_active).fill('bar active')]
}
</script>

<template>
    <div :class="`stats-container ${identity_type ?? ''}`">
        <div class="stat" v-for="stat in stats">
            <div v-for="classes in range(stat, 15)" :class="classes"></div>
            <div class="name" role="meter" :aria-valuenow="stat.base_stat">
                {{ formatter(stat.stat.name) }}
            </div>
        </div>
    </div>
</template>

<style scoped lang="sass">
.stats-container
    display: flex
    gap: 1em
    width: fit-content

    @include for-up-to-tablet
        flex-direction: column

    background: $bg-card
    padding: 15px
    border-radius: 10px

    .stat
        display: flex
        flex-direction: column
        align-items: center
        gap: 10px
        width: 90px

        @include for-up-to-tablet
            flex-direction: row-reverse
            width: unset
            height: 80px

        .name
            text-align: center
            word-wrap: break-word

            @include for-up-to-tablet
                text-align: right

        .bar
            display: block
            height: 8px
            width: 80px
            background: #6d6d6d

            @include for-up-to-tablet
                height: 70px
                width: 12px

            &.active
                background: #6ca7f2

    &.legendary .bar.active
        background: $legendary-color
    &.mythical .bar.active
        background: $mythical-color
    &.baby .bar.active
        background: $baby-color
</style>