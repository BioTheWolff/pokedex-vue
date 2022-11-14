<script setup>
import { ref } from 'vue';
import PokemonList from '../components/PokemonList.vue';

let search_term = ref("");
function search() {
  
}
</script>

<template>
  <h1>Pokemons List</h1>
  <div id="site-content">

    <div class="search-wrapper">
      <div class="infotip">
        <h2>Search form</h2>
        <p>Search for every pokemon by their name or number!</p>
      </div>
      <form @submit.prevent="search()">
        <label for="search">Name or ID</label>
        <div>
          <input id="search" name="search" type="text" v-model.trim="search_term">
          <input type="submit" value="Search">
        </div>
      </form>
    </div>
  
    <Suspense>
      <PokemonList></PokemonList>
      <template #fallback>
        Loading...
      </template>
    </Suspense>

  </div>
</template>

<style scoped lang="sass">
.search-wrapper
    width: 100%
    margin-bottom: 3em

    display: flex
    gap: 2em
    justify-content: center

    @include for-up-to-tablet
        flex-direction: column

    .infotip
        @include for-up-to-tablet
            display: none

    & > div
        padding: .4em .8em
        border-radius: 10px
        background-color: #128c53
    
    form
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center

        label
            display: block
            margin-bottom: .5em

        input
            padding: .7em
            border-radius: 10px
            border: 3px solid grey

            &[type="text"]
                border-right: none
                border-top-right-radius: 0px
                border-bottom-right-radius: 0px
                margin-right: 0px
                width: 60%
            
            &[type="submit"]
                border-left: none
                border-top-left-radius: 0px
                border-bottom-left-radius: 0px
                margin-left: 0px
                background: $bg-card
                cursor: pointer
                color: $color
                font-weight: bold
</style>