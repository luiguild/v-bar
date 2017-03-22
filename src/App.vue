<style lang="sass">
    @import sass/bar

    body,
    html
        font-family: 'Megrim', cursive
        height: 100%
        width: 100%
        margin: 0
        padding: 0

    .component
        height: 100%
        width: 100%
        +flex(column, n, flex-start, center)

        > .wrapper
            min-height: 300px
            max-height: 300px
            height: 300px
            min-width: 300px
            max-width: 300px
            width: 300px

            .verticalBarClass
                background-color: #0ff

            .verticalBarInternalClass
                background-color: #f00

            .horizontalBarClass
                background-color: #ff0

            .horizontalBarInternalClass
                background-color: #f0f

            .container
                position: relative
                width: 500px
                height: 500px

                > .item
                    height: 50px
                    width: 50px
                    float: left
                    background-color: #f0f
                    margin: $pixel-proportion
                    color: $transparent

                > .clearfix
                    clear: both
</style>

<template lang="pug">
    .component
        h1 VBar
        v-bar(wrapperClass="wrapper", verticalBarClass="verticalBarClass", verticalBarInternalClass="verticalBarInternalClass", horizontalBarClass="horizontalBarClass", horizontalBarInternalClass="horizontalBarInternalClass")
            - var n = 0
            .container
                while n < 200
                    .item= n++
                .clearfix
</template>

<script>
import VBar from './components/v-bar.vue'
export default {
    components: { VBar }
}
</script>
