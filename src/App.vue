<script setup>
import { RouterLink, RouterView } from 'vue-router'

function toggle_nav() {
  let t = document.getElementById('nav-toggle');
  let nav = document.getElementById('site-nav');

  if (t.classList.contains('active')) {
    // close the nav
    nav.classList.remove('show');
    t.classList.remove('active');
  } else {
    // open the nav
    nav.classList.add('show');
    t.classList.add('active');
  }
}
</script>

<template>
  <header id="site-header">
    <div>
      <h1>Pokedex</h1>
    </div>
    <div class="nav-wrapper">
      <nav id="site-nav">
        <RouterLink to="/">Homepage</RouterLink>
      </nav>
      <i class="hamburger" id="nav-toggle" @click="toggle_nav()"></i>
    </div>
  </header>

  <main id="site-container">
    <div class="filler"></div>
    <div class="filler right"></div>

    <div id="content-wrapper">
      <RouterView />
    </div>
  </main>

  <footer id="site-footer">
    <div>&copy; 2022 - Polytech Montpellier</div>
  </footer>
</template>
