<template>
    <div id="app">
        <v-bar wrapperClass="wrapper">
            <img src="./assets/logo.png">
            <hello></hello>
        </v-bar>
    </div>
</template>

<script>
import Hello from './components/Hello'
import VBar from './components/v-bar.vue'

export default {
    name: 'app',
    components: {
        Hello,
        VBar
    }
}
</script>

<style lang="sass">
    @import sass/bar

    .wrapper
        height: 300px
        width: 100%
        background-color: #DDD

    html,
    body
        height: 100%
        margin: 0
        padding: 0

    #app
        font-family: 'Avenir', Helvetica, Arial, sans-serif
        -webkit-font-smoothing: antialiased
        -moz-osx-font-smoothing: grayscale
        text-align: center
        color: #2c3e50
        +flex(row, n, center, center)
        height: 100%
</style>
