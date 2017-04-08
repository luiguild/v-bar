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
                padding-right: $pixel-proportion * 3 !important
                padding-bottom: $pixel-proportion * 3 !important

        &--vertical,
        &--horizontal
            position: absolute
            background-color: $black4
            z-index: 9
            border-radius: $pixel-proportion * 2
            overflow: hidden

            &-internal
                position: relative
                background-color: $black2
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
            // height: 100%
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
            // width: 100%
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

            .bar--wrapper(ref="wrapperRef",
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
        wrapperObj: {
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
        removeResizeListener(this.$refs.wrapperRef.children[0], this.resize)
    },
    mounted () {
        addResizeListener(this.$refs.container, this.resize)
        addResizeListener(this.$refs.wrapperRef.children[0], this.resize)

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
            return this.wrapper ? this.wrapper : ''
        },
        propBarVertical () {
            return this.vBar ? this.vBar : ''
        },
        propBarInternalVertical () {
            return this.vBarInternal ? this.vBarInternal : ''
        },
        propBarHorizontal () {
            return this.hBar ? this.hBar : ''
        },
        propBarInternalHorizontal () {
            return this.hBarInternal ? this.hBarInternal : ''
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
                sizeContainer,
                regulatorSize

            if (this.bars.horizontal.size && this.bars.vertical.size) {
                regulatorSize = 40
            } else {
                regulatorSize = 32
            }

            if (axis === 'X') {
                positionWrapper = this.wrapperObj.scrollLeft
                sizeWrapper = this.wrapperObj.scrollWidth
                sizeBar = this.bars.horizontal.size + regulatorSize
                sizeContainer = this.container.scrollWidth
            } else if (axis === 'Y') {
                positionWrapper = this.wrapperObj.scrollTop
                sizeWrapper = this.wrapperObj.scrollHeight
                sizeBar = this.bars.vertical.size + regulatorSize
                sizeContainer = this.container.scrollHeight
            }
            internalSize = (positionWrapper / (sizeWrapper - (sizeContainer))) * (sizeContainer - sizeBar)

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
                sizeWrapper = this.wrapperObj.scrollWidth
                sizeBar = this.bars.horizontal.size
                sizeContainer = this.container.scrollWidth
                offsetContainer = this.container.elm.offsetLeft
                clientDirection = e.clientX
            } else if (axis === 'Y') {
                sizeWrapper = this.wrapperObj.scrollHeight
                sizeBar = this.bars.vertical.size
                sizeContainer = this.container.scrollHeight
                offsetContainer = this.container.elm.offsetTop
                clientDirection = e.clientY
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
                    this.$refs.wrapperRef.scrollLeft = this.getCoordinates(e, 'X')
                } else if (this.dragging.axis === 'Y') {
                    this.$refs.wrapperRef.scrollTop = this.getCoordinates(e, 'Y')
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
            this.wrapperObj = {
                elm: this.$refs.wrapperRef,
                scrollHeight: this.$refs.wrapperRef.scrollHeight,
                scrollWidth: this.$refs.wrapperRef.scrollWidth,
                scrollLeft: this.$refs.wrapperRef.scrollLeft,
                scrollTop: this.$refs.wrapperRef.scrollTop
            }

            this.container = {
                elm: this.$refs.container,
                scrollHeight: this.$refs.container.scrollHeight,
                scrollWidth: this.$refs.container.scrollWidth
            }

            this.bars.horizontal.size = this.wrapperObj.scrollWidth - this.container.scrollWidth > 24 &&
                this.wrapperObj.scrollWidth - this.container.scrollWidth !== 0
                ? (this.container.scrollWidth / this.wrapperObj.scrollWidth) * this.container.scrollWidth
                : 0

            this.bars.vertical.size = this.wrapperObj.scrollHeight - this.container.scrollHeight > 24 &&
                this.wrapperObj.scrollHeight - this.container.scrollHeight !== 0
                ? (this.container.scrollHeight / this.wrapperObj.scrollHeight) * this.container.scrollHeight
                : 0
        }
    },
    props: ['wrapper', 'vBar', 'vBarInternal', 'hBar', 'hBarInternal']
}
</script>
