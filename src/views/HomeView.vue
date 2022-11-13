<script setup>
import PokemonList from '../components/PokemonList.vue';

</script>

<template>
  <h1>Pokemons List</h1>
  <div id="site-content">
  
    <Suspense>
      <PokemonList></PokemonList>
      <template #fallback>
        Loading...
      </template>
    </Suspense>

  </div>
</template>
