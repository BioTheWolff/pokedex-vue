<script setup>
import { ref } from 'vue';
import ErrorCard from '@/components/_structure/ErrorCard.vue';
import PokemonDetails from '@/components/PokemonDetails.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

let err = ref(false);

function handleNotFound(val) {
    err.value = String(val).includes('404') ? "404" : "unknown";
}
</script>

<template>
    <Suspense timeout="5">
        <div>
            <ErrorCard v-if="err" :error="err"></ErrorCard>
            <PokemonDetails
                :name="$route.params.name"
                @not-found="handleNotFound"
            ></PokemonDetails>
        </div>

        <template #fallback>
            <LoadingSpinner active text="Loading..."></LoadingSpinner>
        </template>
    </Suspense>
</template>