<script setup>
import { SiteLogoFilled as logo } from "@/assets/img"
</script>


<template>
    <div class="branding" @click="$router.push({ name: 'home' })">
        <div class="logo">
            <img :src="logo">
        </div>
        <div>
            <h1>Pokedex</h1>
        </div>
    </div>
</template>

<style scoped lang="sass">
.branding
    display: flex
    gap: 1em
    cursor: pointer

    h1
        line-height: $header-height
        margin: 0

    
    .logo
        display: flex
        flex-direction: column
        justify-content: center

        img
            height: 100px
            width: 100px
</style>