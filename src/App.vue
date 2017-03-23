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
            min-height: 250px
            max-height: 250px
            height: 250px
            min-width: 250px
            max-width: 250px
            width: 250px

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
                width: 2000px
                height: 2000px

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
                while n < 500
                    .item= n++
                .clearfix
</template>

<script>
import VBar from './components/v-bar.vue'
export default {
    components: { VBar }
}
</script>
