<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PokemonList from '../components/PokemonList.vue';

const router = useRouter();
const route = useRoute();


let page = ref(0);
let nb_per_page = 50;

let search_page = ref(0);
let is_searching = ref(false);

// this one is updated manually so the child doesn't filter on every key input
let const_search_term = ref("");
let search_term = ref("");


// use the page number from the route if it exists
if (route.params.page && Number(route.params.page) >= 1) {
  page.value = Number(route.params.page)-1;
}


function handlePageChange(val) {
  // push the path so it is added to the web history
  page.value += val;
  router.push({ path: `/list/${page.value+1}` });
}

function goToFirstPage() {
  // replace the path so the user will not go back into the faulty page number
  page.value = 0;
  router.replace({ path: `/list/1` });
}

function search() {
  if (search_term.value.trim().length > 0) {
    search_page.value = 0;
    is_searching.value = true;
    const_search_term.value = search_term.value;
  } else {
    is_searching.value = false;
  }
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
      <PokemonList 
        @chg-page="handlePageChange"
        @out-of-bounds="goToFirstPage"
        :page="is_searching ? search_page : page"
        :nbPerPage="nb_per_page"
        :isSearch="is_searching"
        :searchTerm="const_search_term"
      ></PokemonList>

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