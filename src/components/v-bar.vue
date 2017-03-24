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
                +cursor-pointer

                &:hover
                    opacity: 1

        &--vertical
            right: 0
            top: 0
            height: calc(100% - #{$pixel-proportion})
            width: $pixel-proportion
            margin-right: $pixel-proportion / 2
            margin-top: $pixel-proportion / 2
            margin-bottom: $pixel-proportion / 2

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
    #vbar(:class="propWrapperSize")
        .bar--container(ref="container",
            @wheel="scroll")

            .bar--vertical(v-show="bars.vertical.size",
                :style="barSizeVertical",
                :class="propBarVertical",
                @touchstart="startDragY",
                @mousedown="startDragY")

                .bar--vertical-internal(ref="verticalBar",
                    :style="barInternalVertical",
                    :class="propBarInternalVertical")

            .bar--horizontal(v-show="bars.horizontal.size",
                :style="barSizeHorizontal",
                :class="propBarHorizontal",
                @touchstart="startDragX",
                @mousedown="startDragX")

                .bar--horizontal-internal(ref="horizontalBar",
                    :style="barInternalHorizontal",
                    :class="propBarInternalHorizontal")

            .bar--wrapper(ref="wrapper",
                :style="validationScrolls")
                slot
</template>

<script>
// **************************************************************************************** //
// V-BAR - LUIGUI DELYER | FRONT-END DEV @ WEBRADAR - NEW PRODUCTS, RESEARCH AND INNOVATION //
// GITHUB = https://github.com/luiguild/v-bar.git                                           //
// **************************************************************************************** //

import { addResizeListener, removeResizeListener } from 'detect-resize'

export default {
    data: () => ({
        dragging: {
            enable: false,
            axis: ''
        },
        bars: {
            horizontal: {
                elm: '',
                size: 0
            },
            vertical: {
                elm: '',
                size: 0
            }
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
    destroyed () {
        removeResizeListener(this.$refs.container, this.resize)
        removeResizeListener(this.$refs.wrapper.children[0], this.resize)
    },
    mounted () {
        addResizeListener(this.$refs.container, this.resize)
        addResizeListener(this.$refs.wrapper.children[0], this.resize)

        document.addEventListener('mousemove', this.onDrag)
        document.addEventListener('touchmove', this.onDrag)
        document.addEventListener('mouseup', this.stopDrag)
        document.addEventListener('touchend', this.stopDrag)

        this.getSizes()
    },
    beforeDestroy () {
        document.removeEventListener('mousemove', this.onDrag)
        document.removeEventListener('touchmove', this.onDrag)
        document.removeEventListener('mouseup', this.stopDrag)
        document.removeEventListener('touchend', this.stopDrag)
    },
    computed: {
        propWrapperSize () {
            return this.wrapperClass ? this.wrapperClass : ''
        },
        propBarVertical () {
            return this.verticalBarClass ? this.verticalBarClass : ''
        },
        propBarInternalVertical () {
            return this.verticalBarInternalClass ? this.verticalBarInternalClass : ''
        },
        propBarHorizontal () {
            return this.horizontalBarClass ? this.horizontalBarClass : ''
        },
        propBarInternalHorizontal () {
            return this.horizontalBarInternalClass ? this.horizontalBarInternalClass : ''
        },
        barSizeVertical () {
            if (this.bars.horizontal.size && this.bars.vertical.size) {
                return {
                    height: 'calc(100% - 16px)'
                }
            }
        },
        barSizeHorizontal () {
            if (this.bars.horizontal.size && this.bars.vertical.size) {
                return {
                    width: 'calc(100% - 16px)'
                }
            }
        },
        barInternalVertical () {
            let barTop = this.getBarInternalSize('Y')

            return {
                height: this.bars.vertical.size + 'px',
                top: barTop + 'px'
            }
        },
        barInternalHorizontal () {
            let barLeft = this.getBarInternalSize('X')

            return {
                width: this.bars.horizontal.size + 'px',
                left: barLeft + 'px'
            }
        },
        validationScrolls () {
            if (!this.bars.horizontal.size) {
                return 'overflowX: hidden'
            }
            if (!this.bars.vertical.size) {
                return 'overflowY: hidden'
            }
        }
    },
    methods: {
        scroll () {
            this.getSizes()
        },
        resize () {
            this.getSizes()
        },
        getBarInternalSize (axis) {
            let internalSize,
                positionWrapper,
                sizeWrapper,
                sizeBar,
                sizeContainer

            if (axis === 'X') {
                positionWrapper = this.wrapper.scrollLeft
                sizeWrapper = this.wrapper.scrollWidth + 24
                sizeBar = this.bars.horizontal.size + 4
                sizeContainer = this.container.scrollWidth
            } else if (axis === 'Y') {
                positionWrapper = this.wrapper.scrollTop
                sizeWrapper = this.wrapper.scrollHeight + 24
                sizeBar = this.bars.vertical.size + 4
                sizeContainer = this.container.scrollHeight
            }
            internalSize = ((positionWrapper / (sizeWrapper - (sizeContainer))) * (sizeContainer - sizeBar))

            return internalSize
        },
        getCoordinates (e, axis) {
            let coordinate,
                sizeWrapper,
                sizeBar,
                sizeContainer,
                offsetContainer,
                clientDirection

            if (axis === 'X') {
                sizeWrapper = this.wrapper.scrollWidth + 24
                sizeBar = this.bars.horizontal.size + 4
                sizeContainer = this.container.scrollWidth
                offsetContainer = this.container.elm.offsetLeft
                clientDirection = e.clientX - sizeBar / 2
            } else if (axis === 'Y') {
                sizeWrapper = this.wrapper.scrollHeight + 24
                sizeBar = this.bars.vertical.size + 4
                sizeContainer = this.container.scrollHeight
                offsetContainer = this.container.elm.offsetTop
                clientDirection = e.clientY - sizeBar / 2
            }
            coordinate = ((sizeWrapper - sizeContainer) * (clientDirection - offsetContainer)) / (sizeContainer - sizeBar)

            return coordinate
        },
        startDragY (e) {
            e.preventDefault()
            e.stopPropagation()

            e = e.changedTouches ? e.changedTouches[0] : e

            this.dragging = {
                enable: true,
                axis: 'Y'
            }
        },
        startDragX (e) {
            e.preventDefault()
            e.stopPropagation()

            e = e.changedTouches ? e.changedTouches[0] : e

            this.dragging = {
                enable: true,
                axis: 'X'
            }
        },
        onDrag (e) {
            if (this.dragging.enable) {
                e.preventDefault()
                e.stopPropagation()

                e = e.changedTouches ? e.changedTouches[0] : e

                if (this.dragging.axis === 'X') {
                    this.$refs.wrapper.scrollLeft = this.getCoordinates(e, 'X')
                } else if (this.dragging.axis === 'Y') {
                    this.$refs.wrapper.scrollTop = this.getCoordinates(e, 'Y')
                }

                this.getSizes()
            }
        },
        stopDrag (e) {
            if (this.dragging.enable) {
                this.dragging = {
                    enable: false,
                    axis: ''
                }
            }
        },
        getSizes () {
            this.wrapper = {
                elm: this.$refs.wrapper,
                scrollHeight: this.$refs.wrapper.scrollHeight + 24,
                scrollWidth: this.$refs.wrapper.scrollWidth + 24,
                scrollLeft: this.$refs.wrapper.scrollLeft,
                scrollTop: this.$refs.wrapper.scrollTop
            }

            this.container = {
                elm: this.$refs.container,
                scrollHeight: this.$refs.container.scrollHeight,
                scrollWidth: this.$refs.container.scrollWidth
            }

            this.bars.horizontal.size = this.wrapper.scrollWidth - this.container.scrollWidth !== 24 &&
                this.wrapper.scrollWidth - this.container.scrollWidth !== 0
                ? ((this.container.scrollWidth / this.wrapper.scrollWidth) * this.container.scrollWidth)
                : 0

            this.bars.vertical.size = this.wrapper.scrollHeight - this.container.scrollHeight !== 24 &&
                this.wrapper.scrollHeight - this.container.scrollHeight !== 0
                ? ((this.container.scrollHeight / this.wrapper.scrollHeight) * this.container.scrollHeight)
                : 0
        }
    },
    props: ['wrapperClass', 'verticalBarClass', 'verticalBarInternalClass', 'horizontalBarClass', 'horizontalBarInternalClass']
}
</script>
