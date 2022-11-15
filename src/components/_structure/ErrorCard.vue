<script setup>
defineProps({
    error: String,
    smaller: Boolean
})


function back() {
    window.history.go(-1)
}

function home(router) {
    router.push({path: '/'})
}
</script>

<template>
    <div :class="`${smaller ? 'smaller ' : ''} error-card`">
        <h1 id="error-title">Error: {{ error === '404' ? "Not Found" : "Unknown" }}</h1>
        <div class="center error-description">
            <p v-if="error === '404'">
                The requested pokemon could not be found.
            </p>
            <p v-else>
                An unknown error occured during processing of the page.
            </p>

            <p>
                You should either <button @click="back()">go back</button> or <button @click="home($router)">go to the homepage</button>
            </p>
        </div>
    </div>
</template>

<style scoped lang="sass">
.error-card
    display: flex
    flex-direction: column
    align-items: center

    .center
        text-align: center

    .error-description
        margin-top: 4em
        padding: 10px
        font-size: 1.1em

        @include for-desktop-and-up
            background: $bg-card
            border-radius: 10px
            box-shadow: 0px 1px 10px -1px rgba(0,0,0,0.75)

            width: 50vw

    #error-title
        text-align: center
        color: orange

    button
        cursor: pointer
        margin: 0 10px
        padding: 5px 10px
        background: transparent
        color: $color
        font-size: 0.8em
        border: 1px solid grey
        border-radius: 10px
        transition: background 0.2s ease

        &:hover
            background: $bg-accent
            transition: background 0.2s ease


.error-card.smaller
    #error-title
        margin: 0 0 20px 0 !important
    .error-description
            margin-top: 1em
</style>