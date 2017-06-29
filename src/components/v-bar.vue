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
            @wheel="scroll",
            @touchmove="scroll")

            .bar--vertical(ref="verticalBar", v-show="bars.vertical.size",
                :style="barSizeVertical",
                :class="propBarVertical",
                @touchstart="startDrag",
                @mousedown="startDrag",
                data-axis="Y",
                data-drag-source="bar")

                .bar--vertical-internal(ref="verticalInternalBar",
                    :style="barInternalVertical",
                    :class="propBarInternalVertical",
                    @touchstart="startDrag",
                    @mousedown="startDrag",
                    data-axis="Y",
                    data-drag-source="internal")

            .bar--horizontal(v-show="bars.horizontal.size",
                :style="barSizeHorizontal",
                :class="propBarHorizontal",
                @touchstart="startDrag",
                @mousedown="startDrag",
                data-axis="X",
                data-drag-source="bar")

                .bar--horizontal-internal(ref="horizontalBar",
                    :style="barInternalHorizontal",
                    :class="propBarInternalHorizontal",
                    @touchstart="startDrag",
                    @mousedown="startDrag",
                    data-axis="X",
                    data-drag-source="internal")

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
            axis: '',
            offset: ''
        },
        bars: {
            horizontal: {
                elm: '',
                parent: '',
                size: 0
            },
            vertical: {
                elm: '',
                parent: '',
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
        removeResizeListener(this.$refs.container, this.resize)
        removeResizeListener(this.$refs.wrapperRef.children[0], this.resize)

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
            let barTop = this.getBarInternal('Y')

            return {
                height: this.bars.vertical.size + 'px',
                top: barTop + 'px'
            }
        },
        barInternalHorizontal () {
            let barLeft = this.getBarInternal('X')

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
        scroll (e) {
            // console.log(e)
            // e.preventDefault()

            // console.log(e.touches[0].clientX,
            //     e.touches[0].pageX,
            //     e.touches[0].screenX)

            // console.log(e.layerY)

            const Y = 0,
                X = 0
            // let Y = e.layerX
            //     ? e.layerX
            //     : e.changedTouches
            //     ? e.changedTouches[0].clientX * -1
            //     : '',
            //     X = e.layerY
            //     ? e.layerY
            //     : e.changedTouches
            //     ? e.changedTouches[0].clientY * -1
            //     : ''

            this.getSizes(X, Y)
        },
        resize () {
            this.getSizes()
        },
        getBarInternal (axis) {
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
                clientDirection = e.clientX - this.dragging.offset
            } else if (axis === 'Y') {
                sizeWrapper = this.wrapperObj.scrollHeight
                sizeBar = this.bars.vertical.size
                sizeContainer = this.container.scrollHeight
                offsetContainer = this.container.elm.offsetTop - (this.bars.vertical.size * 1.4)
                clientDirection = e.clientY - this.dragging.offset
            }
            coordinate = ((sizeWrapper - sizeContainer) * (clientDirection - offsetContainer)) / (sizeContainer - sizeBar)

            return coordinate
        },
        startDrag (e) {
            e.preventDefault()
            e.stopPropagation()

            e = e.changedTouches ? e.changedTouches[0] : e

            const axis = e.target.getAttribute('data-axis'),
                dataDrag = e.target.getAttribute('data-drag-source')

            let offset,
                elementOffset

            if (axis === 'Y') {
                if (dataDrag === 'bar') {
                    elementOffset = e.explicitOriginalTarget.offsetTop + (this.bars.vertical.size * 1.4)
                } else if (dataDrag === 'internal') {
                    elementOffset = e.clientY - this.bars.vertical.elm.offsetTop
                }
            } else if (axis === 'Y') {
                if (dataDrag === 'bar') {
                    elementOffset = e.explicitOriginalTarget.offsetTop + (this.bars.horizontal.size * 1.4)
                } else if (dataDrag === 'internal') {
                    elementOffset = e.clientX - this.bars.horizontal.elm.offsetTop
                }
            }

            offset = elementOffset

            this.dragging = {
                enable: true,
                axis: axis,
                offset: offset
            }
        },
        onDrag (e) {
            if (this.dragging.enable) {
                e.preventDefault()
                e.stopPropagation()

                e = e.changedTouches ? e.changedTouches[0] : e

                const wrapper = this.$refs.wrapperRef

                if (this.dragging.axis === 'X') {
                    wrapper.scrollLeft = this.getCoordinates(e, 'X')
                } else if (this.dragging.axis === 'Y') {
                    wrapper.scrollTop = this.getCoordinates(e, 'Y')
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
        getSizes (X, Y) {
            const wrapperRef = this.$refs.wrapperRef,
                containerRef = this.$refs.container,
                verticalBarRef = this.$refs.verticalBar,
                verticalInternalBarRef = this.$refs.verticalInternalBar,
                horizontalBarRef = this.$refs.horizontalBar,
                horizontalInternalBarRef = this.$refs.horizontalInternalBar

            this.wrapperObj = {
                elm: wrapperRef,
                scrollHeight: wrapperRef.scrollHeight,
                scrollWidth: wrapperRef.scrollWidth,
                scrollLeft: wrapperRef.scrollLeft,
                scrollTop: wrapperRef.scrollTop
            }

            this.container = {
                elm: containerRef,
                scrollHeight: containerRef.scrollHeight,
                scrollWidth: containerRef.scrollWidth
            }

            this.bars.horizontal.elm = horizontalInternalBarRef
            this.bars.horizontal.parent = horizontalBarRef

            this.bars.horizontal.size = this.wrapperObj.scrollWidth - this.container.scrollWidth > 24 &&
                this.wrapperObj.scrollWidth - this.container.scrollWidth !== 0
                ? (this.container.scrollWidth / this.wrapperObj.scrollWidth) * this.container.scrollWidth
                : 0

            this.bars.vertical.elm = verticalInternalBarRef
            this.bars.vertical.parent = verticalBarRef

            this.bars.vertical.size = this.wrapperObj.scrollHeight - this.container.scrollHeight > 24 &&
                this.wrapperObj.scrollHeight - this.container.scrollHeight !== 0
                ? (this.container.scrollHeight / this.wrapperObj.scrollHeight) * this.container.scrollHeight
                : 0
        }
    },
    props: ['wrapper', 'vBar', 'vBarInternal', 'hBar', 'hBarInternal']
}
</script>
