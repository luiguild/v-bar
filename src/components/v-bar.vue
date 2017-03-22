<style scoped lang="sass">
    @import ../sass/bar

    .bar
        &--container
            position: relative
            height: 100%
            width: 100%
            overflow: hidden

        &--wrapper
            position: absolute
            height: calc(100% + #{$pixel-proportion * 3})
            width: calc(100% + #{$pixel-proportion * 3})
            top: 0
            overflow-y: scroll
            overflow-x: scroll

            > *
                position: relative
                padding-right: $pixel-proportion * 3
                padding-bottom: $pixel-proportion * 3

        &--vertical,
        &--horizontal
            position: absolute
            background-color: $black-4
            z-index: 9
            border-radius: $pixel-proportion * 2
            overflow: hidden

            &-internal
                position: relative
                background-color: $black-2
                opacity: 0.5
                border-radius: $pixel-proportion * 2
                transition-timing-function: ease-in-out
                transition-duration: .2s
                transition-property: opacity
                // +cursor-pointer

                &:hover
                    opacity: 1

        &--vertical
            right: 0
            top: 0
            height: calc(100% - #{$pixel-proportion})
            width: $pixel-proportion
            margin-right: $pixel-proportion / 2
            margin-top: $pixel-proportion / 2

            &-internal
                height: 0px
                width: 100%

        &--horizontal
            left: 0
            bottom: 0
            width: calc(100% - #{$pixel-proportion})
            height: $pixel-proportion
            margin-right: $pixel-proportion / 2
            margin-left: $pixel-proportion / 2
            margin-bottom: $pixel-proportion / 2

            &-internal
                height: 100%
                width: 0px

</style>

<template lang="pug">
    div(:class="( this.wrapperClass ? this.wrapperClass : '' )")
        div.bar--container(ref="container", @wheel="scroll")
            .bar--vertical(v-if="bars.vertical", :style="verticalDistanceBar", :class="( this.verticalBarClass ? this.verticalBarClass : '' )")
                .bar--vertical-internal(:style="verticalInternalBar", :class="( this.verticalBarInternalClass ? this.verticalBarInternalClass : '' )")
            .bar--horizontal(v-if="bars.horizontal", :style="horizontalDistanceBar", :class="( this.horizontalBarClass ? this.horizontalBarClass : '' )")
                .bar--horizontal-internal(:style="horizontalInternalBar", :class="( this.horizontalBarInternalClass ? this.horizontalBarInternalClass : '' )")

            .bar--wrapper(ref="wrapper", :style="validationScrolls")
                slot
</template>


<script>
export default {
    data: () => ({
        bars: {
            horizontal: 0,
            vertical: 0
        },
        wrapper: {
            elm: '',
            scrollHeight: '',
            scrollWidth: '',
            scrollLeft: '',
            scrollTop: ''
        },
        container: {
            elm: '',
            scrollHeight: '',
            scrollWidth: ''
        }
    }),
    mounted () {
        this.wrapper = {
            elm: this.$refs.wrapper,
            scrollHeight: this.$refs.wrapper.scrollHeight - 24,
            scrollWidth: this.$refs.wrapper.scrollWidth - 24,
            scrollLeft: this.$refs.wrapper.scrollLeft,
            scrollTop: this.$refs.wrapper.scrollTop
        }

        this.container = {
            elm: this.$refs.container,
            scrollHeight: this.$refs.container.scrollHeight - 24,
            scrollWidth: this.$refs.container.scrollWidth - 24
        }

        this.bars.horizontal = this.wrapper.scrollWidth - this.container.scrollWidth !== 24 &&
            this.wrapper.scrollWidth - this.container.scrollWidth !== 0
            ? ((this.container.scrollWidth / this.wrapper.scrollWidth) * this.container.scrollWidth) - 8
            : 0

        this.bars.vertical = this.wrapper.scrollHeight - this.container.scrollHeight !== 24 &&
            this.wrapper.scrollHeight - this.container.scrollHeight !== 0
            ? ((this.container.scrollHeight / this.wrapper.scrollHeight) * this.container.scrollHeight) - 8
            : 0
    },
    computed: {
        verticalDistanceBar () {
            if (this.bars.horizontal && this.bars.vertical) {
                return {
                    height: 'calc(100% - 16px)'
                }
            }
        },
        horizontalDistanceBar () {
            if (this.bars.horizontal && this.bars.vertical) {
                return {
                    width: 'calc(100% - 16px)'
                }
            }
        },
        verticalInternalBar () {
            let barTop = ((this.wrapper.scrollTop / (this.wrapper.scrollHeight - (this.container.scrollHeight - 24))) * (this.container.scrollHeight - this.bars.vertical))

            return {
                height: this.bars.vertical + 'px',
                top: barTop + 'px'
            }
        },
        horizontalInternalBar () {
            let barLeft = ((this.wrapper.scrollLeft / (this.wrapper.scrollWidth - (this.container.scrollWidth - 24))) * (this.container.scrollWidth - this.bars.horizontal))

            return {
                width: this.bars.horizontal + 'px',
                left: barLeft + 'px'
            }
        },
        validationScrolls () {
            if (!this.bars.horizontal) {
                return 'overflowX: hidden'
            }
            if (!this.bars.vertical) {
                return 'overflowY: hidden'
            }
        }
    },
    methods: {
        scroll () {
            this.wrapper = {
                elm: this.$refs.wrapper,
                scrollHeight: this.$refs.wrapper.scrollHeight - 24,
                scrollWidth: this.$refs.wrapper.scrollWidth - 24,
                scrollLeft: this.$refs.wrapper.scrollLeft,
                scrollTop: this.$refs.wrapper.scrollTop
            }
        }
    },
    props: ['wrapperClass', 'verticalBarClass', 'verticalBarInternalClass', 'horizontalBarClass', 'horizontalBarInternalClass']
}
</script>
