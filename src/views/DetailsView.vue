<script setup>
import PokemonDetails from '../components/PokemonDetails.vue';
</script>

<template>
    <Suspense>
        <PokemonDetails :name="$route.params.name"></PokemonDetails>
        <template #fallback>
            Loading...
        </template>
    </Suspense>
</template>