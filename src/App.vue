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
        <!-- Page title -->
        <h1>{{ $route.name }}</h1>
        <div id="site-content" class="pokemon-list">
          <!-- START of page content -->
          <RouterView />
          <!-- END of page content -->
        </div>
    </div>
  </main>

  <footer id="site-footer">
    <div>&copy; 2022 - Polytech Montpellier</div>
  </footer>
</template>

<style scoped lang="sass">
#site-header
  height: 10vh
  background-color: $bg-accent

  display: flex
  justify-content: space-between

  padding: 0 5vw


  h1
    line-height: $header-height
    margin: 0

  .nav-wrapper
    line-height: $header-height

    .hamburger
      @include for-desktop-and-up
        display: none

    nav
      @include for-up-to-tablet
        &.show
          transform: none
          transition: transform .45s ease-in-out

        display: flex
        flex-direction: column
        padding-left: 3em
        position: absolute

        transform: translateX(-110%)
        transition: transform .45s ease-in-out

        top: $header-height
        left: 0px
        width: 70vw
        height: calc(100vh - $header-height)

        background: $bg-card
        box-shadow: 10px 4px 16px -5px rgba(0,0,0,0.63)


      a:not(:last-of-type)
          margin-right: 1.5em

#site-footer
  height: $footer-height
  background-color: $bg-accent
  display: flex
  justify-content: center
  line-height: $footer-height


#site-container
  flex-grow: 1
  display: flex

  .filler
    @include for-tablet-and-up
      width: 10vw
      &.right
        order: 3

  #content-wrapper
    flex-grow: 1
    margin: 5vh 0
    max-width: 100vw

    @include for-phone-only
      margin-left: 8px
      margin-right: 8px

    h1
      text-align: center
      margin: 0 0 1em 0

    #site-content
      max-width: 100vw
</style>
